import React, { useState, useEffect } from 'react'; 
import { useTasks } from '../context/TaskContext';
import './TaskForm.css'; // Import the external CSS file

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
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="task-form__header">
        {taskToEdit ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <div className="task-form__input-group">
        <label className="task-form__label" htmlFor="title">
          Title*
        </label>
        <input
          id="title"
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="task-form__input"
          required
        />
      </div>

      <div className="task-form__input-group">
        <label className="task-form__label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="task-form__input"
          rows="3"
        />
      </div>

      <div className="task-form__grid">
        <div>
          <label className="task-form__label" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="task-form__input"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="task-form__label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
            className="task-form__input"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="task-form__label" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            type="datetime-local"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="task-form__input"
          />
        </div>
      </div>

      <button
        type="submit"
        className="task-form__button"
      >
        {taskToEdit ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
