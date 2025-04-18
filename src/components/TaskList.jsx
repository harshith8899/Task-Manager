import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import './TaskList.css'; // Import external CSS

const TaskList = () => {
  const { tasks, getTasksByPriority } = useTasks();

  const highPriorityTasks = getTasksByPriority('high');
  const mediumPriorityTasks = getTasksByPriority('medium');
  const lowPriorityTasks = getTasksByPriority('low');

  return (
    <div className="task-list">
      {highPriorityTasks.length > 0 && (
        <div className="priority-group high-priority">
          <h3 className="priority-heading">High Priority</h3>
          {highPriorityTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {mediumPriorityTasks.length > 0 && (
        <div className="priority-group medium-priority">
          <h3 className="priority-heading">Medium Priority</h3>
          {mediumPriorityTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {lowPriorityTasks.length > 0 && (
        <div className="priority-group low-priority">
          <h3 className="priority-heading">Low Priority</h3>
          {lowPriorityTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="no-tasks">
          No tasks found. Add a new task to get started!
        </div>
      )}
    </div>
  );
};

export default TaskList;
