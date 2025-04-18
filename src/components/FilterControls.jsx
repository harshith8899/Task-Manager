import React from 'react';
import { useTasks } from '../context/TaskContext';
import './FilterControls.css'; // Import external CSS

const FilterControls = () => {
  const { setFilter, setCategoryFilter, getProgressStats } = useTasks();
  const { total, completed, pending, completionRate } = getProgressStats();

  return (
    <div className="filter-container">
      <div className="filter-grid">
        <div>
          <label className="filter-label">Filter by Status</label>
          <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="filter-label">Filter by Category</label>
          <select onChange={(e) => setCategoryFilter(e.target.value)} className="filter-select">
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="progress-box">
        <h3 className="progress-title">Task Progress</h3>
        <div className="progress-stats">
          <div className="progress-card total">
            <div className="progress-number">{total}</div>
            <div className="progress-label">Total</div>
          </div>
          <div className="progress-card completed">
            <div className="progress-number">{completed}</div>
            <div className="progress-label">Completed</div>
          </div>
          <div className="progress-card pending">
            <div className="progress-number">{pending}</div>
            <div className="progress-label">Pending</div>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${completionRate}%` }}></div>
          </div>
          <div className="progress-percentage">{completionRate}% Complete</div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
