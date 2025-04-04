import React from 'react';
import { useTasks } from '../context/TaskContext';

const ProgressChart = () => {
  const { getProgressStats } = useTasks();
  const { completionRate } = getProgressStats();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold mb-4">Completion Progress</h3>
      <div className="relative w-full h-6 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-6 bg-blue-500 rounded-full flex items-center justify-center"
          style={{ width: `${completionRate}%` }}
        >
          <span className="text-xs font-bold text-white">
            {completionRate}%
          </span>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProgressChart;