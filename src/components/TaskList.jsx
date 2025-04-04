import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, getTasksByPriority } = useTasks();

  const highPriorityTasks = getTasksByPriority('high');
  const mediumPriorityTasks = getTasksByPriority('medium');
  const lowPriorityTasks = getTasksByPriority('low');

  return (
    <div className="space-y-6">
      {highPriorityTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-600">High Priority</h3>
          {highPriorityTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {mediumPriorityTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-yellow-600">Medium Priority</h3>
          {mediumPriorityTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {lowPriorityTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">Low Priority</h3>
          {lowPriorityTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Add a new task to get started!
        </div>
      )}
    </div>
  );
};

export default TaskList;