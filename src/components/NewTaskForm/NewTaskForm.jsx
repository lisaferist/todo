import React from 'react'
import './NewTaskForm.css'

function NewTaskForm({ onAddTask }) {
  return <input className="new-todo" placeholder="What needs to be done?" onKeyDown={onAddTask} />
}

export default NewTaskForm
