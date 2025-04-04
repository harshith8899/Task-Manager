import React from 'react';
import { useTasks } from '../context/TaskContext';

const FilterControls = () => {
  const { setFilter, setCategoryFilter, getProgressStats } = useTasks();
  const { total, completed, pending, completionRate } = getProgressStats();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Filter by Status</label>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Filter by Category</label>
          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <h3 className="font-semibold mb-2">Task Progress</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-blue-600 font-bold">{total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-green-600 font-bold">{completed}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <div className="text-yellow-600 font-bold">{pending}</div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600 mt-1 text-right">
            {completionRate}% Complete
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;