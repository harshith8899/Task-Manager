import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [alert, setAlert] = useState(null);

  // Set alert timeout
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Check for deadlines
  useEffect(() => {
    const now = new Date();
    const overdueTasks = tasks.filter(
      task => !task.completed && new Date(task.dueDate) < now
    );
    
    if (overdueTasks.length > 0) {
      setAlert({
        type: 'warning',
        message: `You have ${overdueTasks.length} overdue task(s)!`
      });
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
    setAlert({
      type: 'success',
      message: 'Task added successfully!'
    });
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    setAlert({
      type: 'success',
      message: 'Task updated successfully!'
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setAlert({
      type: 'success',
      message: 'Task deleted successfully!'
    });
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'all' || 
      (filter === 'completed' && task.completed) || 
      (filter === 'pending' && !task.completed);
    
    const matchesCategory = categoryFilter === 'all' || 
      task.category === categoryFilter;
    
    return matchesStatus && matchesCategory;
  });

  const getTasksByPriority = (priority) => 
    filteredTasks.filter(task => task.priority === priority);

  const getProgressStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    return {
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  };

  return (
    <TaskContext.Provider value={{
      tasks: filteredTasks,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      setFilter,
      setCategoryFilter,
      getTasksByPriority,
      getProgressStats,
      alert,
      setAlert
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);