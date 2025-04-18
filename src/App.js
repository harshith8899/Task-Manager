import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import ProgressChart from './components/ProgressChart';
import Alert from './components/Alert';
import './index.css';


function App() {
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <TaskProvider>
      <div className="task-manager-container">
        <div className="task-manager-wrapper">
          <h1 className="task-manager-title">Task Manager</h1>

          <div className="task-manager-grid">
            <div className="task-manager-left">
              <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
              <ProgressChart />
            </div>

            <div className="task-manager-right">
              <FilterControls />
              <TaskList />
            </div>
          </div>
        </div>

        <Alert />
      </div>
    </TaskProvider>
  );
}

export default App;