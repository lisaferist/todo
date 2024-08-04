import React from 'react'

import TasksFilter from '../TasksFilter'
import './Footer.css'

function Footer(props) {
  const { filteredFunctions, activeCount, filters, clearCompleted } = props
  const { allFiltered, activeFiltered, completedFiltered, onFilterButton } = filteredFunctions
  const labels = Object.keys(filters)
  const classNames = Object.values(filters)
  const elements = labels.map((label, i) => {
    let onFilteredFunc
    if (label === 'All') {
      onFilteredFunc = allFiltered
    } else if (label === 'Active') {
      onFilteredFunc = activeFiltered
    } else if (label === 'Completed') {
      onFilteredFunc = completedFiltered
    }
    return (
      <li key={label}>
        <TasksFilter
          label={label}
          className={classNames[i]}
          filteredFunctions={onFilteredFunc}
          onFilterButton={onFilterButton}
        />
      </li>
    )
  })
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <ul className="filters">{elements}</ul>
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
