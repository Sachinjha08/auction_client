import React from "react";
import "./FilterPannel.css";

const FilterPanel = ({ onFilter }) => {
  const handleChange = (e) => {
    onFilter(e.target.value);
  };
  return (
    <div className="filter-panel">
      <label>Status: </label>
      <select onChange={handleChange}>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="ended">Ended</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
};

export default FilterPanel;
