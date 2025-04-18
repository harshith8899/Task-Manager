import React from 'react';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';
import './TaskItem.css'; // Import external CSS

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, setTaskToEdit } = useTasks();

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const getCategoryClass = () => {
    switch (task.category) {
      case 'work': return 'category-work';
      case 'personal': return 'category-personal';
      case 'fitness': return 'category-fitness';
      case 'shopping': return 'category-shopping';
      default: return 'category-default';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'task-completed' : 'task-pending'} ${isOverdue ? 'task-overdue' : ''}`}>
      <div className="task-header">
        <div className="task-title">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className="task-checkbox"
          />
          <h3 className={`task-title-text ${task.completed ? 'completed-text' : 'active-text'}`}>
            {task.title}
          </h3>
        </div>
        <div className="task-actions">
          <button
            onClick={() => setTaskToEdit(task)}
            className="task-edit"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="task-delete"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className={`task-description ${task.completed ? 'completed-text' : ''}`}>
          {task.description}
        </p>
      )}

      <div className="task-tags">
        <span className={`task-priority ${getPriorityClass()}`}>
          {task.priority}
        </span>
        <span className={`task-category ${getCategoryClass()}`}>
          {task.category}
        </span>
        {task.dueDate && (
          <span className={`task-due-date ${isOverdue ? 'overdue-date' : 'default-date'}`}>
            {format(new Date(task.dueDate), 'MMM dd, yyyy h:mm a')}
            {isOverdue && ' (Overdue)'}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
