import React from 'react';
import { useTasks } from '../context/TaskContext';
import './ProgressChart.css'; // 👈 Import the external CSS

const ProgressChart = () => {
  const { getProgressStats } = useTasks();
  const { completionRate } = getProgressStats();

  return (
    <div className="progress-container">
      <h3 className="progress-title">Completion Progress</h3>
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${completionRate}%` }}
        >
          <span className="progress-label">{completionRate}%</span>
        </div>
      </div>
      <div className="progress-markers">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressChart;
