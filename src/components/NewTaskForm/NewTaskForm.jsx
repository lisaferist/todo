import React from 'react'
import './NewTaskForm.css'

function NewTaskForm({ submitTaskForm }) {
  return (
    <form className="new-todo-form" onSubmit={submitTaskForm}>
      <input className="new-todo" placeholder="What needs to be done?" />
      <input className="new-todo-form__timer" placeholder="Min" />
      <input className="new-todo-form__timer" placeholder="Sec" />
      <button className="new-todo__submit-button" type="submit" />
    </form>
  )
}

export default NewTaskForm
