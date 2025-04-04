import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls';
import ProgressChart from './components/ProgressChart';
import Alert from './components/Alert';
import './App.css';
import styled from 'styled-components';

function App() {
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Task Manager</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
              <ProgressChart />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
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