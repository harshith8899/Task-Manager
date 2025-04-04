import React from 'react';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, setTaskToEdit } = useTasks();

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = () => {
    switch (task.category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'fitness': return 'bg-green-100 text-green-800';
      case 'shopping': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`border rounded-lg p-4 mb-4 ${task.completed ? 'bg-gray-50' : 'bg-white'} ${isOverdue ? 'border-red-300' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
          />
          <h3 className={`ml-2 text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setTaskToEdit(task)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {task.description && (
        <p className={`mb-3 text-gray-600 ${task.completed ? 'line-through' : ''}`}>
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor()}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor()}`}>
          {task.category}
        </span>
        {task.dueDate && (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isOverdue ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
            {format(new Date(task.dueDate), 'MMM dd, yyyy h:mm a')}
            {isOverdue && ' (Overdue)'}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;