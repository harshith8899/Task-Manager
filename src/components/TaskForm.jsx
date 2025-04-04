import React, { useState, useEffect } from 'react'; // Add useEffect here
import { useTasks } from '../context/TaskContext';

const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
  const { addTask, updateTask } = useTasks();
  const [task, setTask] = useState(
    taskToEdit || {
      id: '',
      title: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: '',
      completed: false
    }
  );

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!task.title.trim()) return;

    const newTask = {
      ...task,
      id: taskToEdit ? task.id : Date.now().toString()
    };

    if (taskToEdit) {
      updateTask(task.id, newTask);
      setTaskToEdit(null);
    } else {
      addTask(newTask);
    }

    setTask({
      id: '',
      title: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: '',
      completed: false
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {taskToEdit ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Title*
        </label>
        <input
          id="title"
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;