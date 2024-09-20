import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './TodoApp.css'

let maxId = 0
function TodoApp() {
  function createTask(label, min = 0, sec = 0, className = 'active', id = maxId) {
    if (id === maxId) {
      maxId++
    }
    return {
      label,
      className,
      createDate: Date.now(),
      id,
      timerTime: {
        minutes: min.length === 0 ? 0 : min,
        seconds: sec.length === 0 ? 0 : sec,
      },
    }
  }
  const toggleClassName = (firstClassName, secondClassName, oldObj) => {
    if (oldObj.className === firstClassName) {
      return {
        ...oldObj,
        className: secondClassName,
      }
    }
    if (oldObj.className === secondClassName) {
      return {
        ...oldObj,
        className: firstClassName,
      }
    }
  }
  const [todoData, setTodoData] = useState([
    createTask('Active', 0, 0, 'active', 0),
    createTask('Completed', 12, 25, 'completed', 2),
    createTask('Editing', 14, 12, 'editing', 3),
  ])
  const [filtersData, setFiltersData] = useState({
    All: 'selected',
    Active: '',
    Completed: '',
  })

  const filteredFunctions = {
    allFiltered: () => {
      setTodoData((td) =>
        td.map((task) => {
          const newTask = { ...task }
          if (newTask.className.includes('hidden')) {
            newTask.className = newTask.className.slice(0, -7)
          }
          return newTask
        })
      )
    },
    activeFiltered: () => {
      setTodoData((td) =>
        td.map((task) => {
          const newTask = { ...task }
          if (newTask.className.includes('completed') && !newTask.className.includes('hidden')) {
            newTask.className += ' hidden'
          }
          if (
            (newTask.className.includes('active') || newTask.className.includes('editing')) &&
            newTask.className.includes('hidden')
          ) {
            newTask.className = newTask.className.slice(0, -7)
          }
          return newTask
        })
      )
    },
    completedFiltered: () => {
      setTodoData((td) =>
        td.map((task) => {
          const newTask = { ...task }
          if (!newTask.className.includes('completed') && !newTask.className.includes('hidden')) {
            newTask.className += ' hidden'
          }
          if (newTask.className.includes('completed') && newTask.className.includes('hidden')) {
            newTask.className = newTask.className.slice(0, -7)
          }
          return newTask
        })
      )
    },
    onFilterButton: (e) => {
      const entriesFiltersMap = new Map([
        ['All', ''],
        ['Active', ''],
        ['Completed', ''],
      ])
      entriesFiltersMap.set(e.target.textContent, 'selected')
      setFiltersData(Object.fromEntries(entriesFiltersMap))
    },
  }

  const deleteTask = (id) => {
    setTodoData((td) =>
      td.toSpliced(
        td.findIndex((el) => el.id === id),
        1
      )
    )
  }

  const submitTaskForm = (e) => {
    e.preventDefault()
    const todoText = e.target[0].value
    if (todoText.length !== 0) {
      const minInput = e.target[1]
      const secInput = e.target[2]
      const min = minInput.value
      const sec = secInput.value
      const isMinCorrect = Number.isInteger(Number(min)) && min >= 0
      const isSecCorrect = Number.isInteger(Number(sec)) && sec < 60 && sec >= 0
      if (isMinCorrect || isSecCorrect) {
        if (isMinCorrect && minInput.className.includes('input-error')) {
          minInput.className = minInput.className.slice(0, -12)
        }
        if (isSecCorrect && secInput.className.includes('input-error')) {
          secInput.className = secInput.className.slice(0, -12)
        }
      }
      if (isMinCorrect && isSecCorrect) {
        e.target[0].value = ''
        minInput.value = ''
        secInput.value = ''
        setTodoData((td) => [...td, createTask(todoText, min, sec)])
      }
      if (!isMinCorrect) {
        minInput.className += ' input-error'
      }
      if (!isSecCorrect) {
        secInput.className += ' input-error'
      }
    }
  }

  const onToggleCompleted = (id) => {
    setTodoData((td) => {
      const tasksIndex = td.findIndex((el) => el.id === id)
      const oldTask = td[tasksIndex]
      let newTask
      if (filtersData.Completed === 'selected') {
        newTask = toggleClassName('active hidden', 'completed', oldTask)
      } else if (filtersData.Active === 'selected') {
        newTask = toggleClassName('active', 'completed hidden', oldTask)
      } else {
        newTask = toggleClassName('active', 'completed', oldTask)
      }
      return [...td.slice(0, tasksIndex), newTask, ...td.slice(tasksIndex + 1)]
    })
  }

  const editTask = (id) => {
    setTodoData((td) => {
      const tasksIndex = td.findIndex((el) => el.id === id)
      const oldTask = td[tasksIndex]
      if (oldTask.className === 'active') {
        const newTask = toggleClassName(oldTask.className, 'editing', oldTask)
        return [...td.slice(0, tasksIndex), newTask, ...td.slice(tasksIndex + 1)]
      }
    })
  }

  const onEdited = (id, text) => {
    setTodoData((td) => {
      const tasksIndex = td.findIndex((el) => el.id === id)
      const oldTask = td[tasksIndex]
      const newTask = { ...oldTask, className: 'active', label: text }
      return [...td.slice(0, tasksIndex), newTask, ...td.slice(tasksIndex + 1)]
    })
  }

  const clearCompleted = () => {
    setTodoData((td) => td.filter((task) => !task.className.includes('completed')))
  }

  const activeCount = todoData.filter((task) => !task.className.includes('completed')).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm submitTaskForm={submitTaskForm} />
      </header>
      <section className="main">
        <TaskList
          tasks={todoData}
          onDeleted={deleteTask}
          editTask={editTask}
          onEdited={onEdited}
          onToggleCompleted={onToggleCompleted}
        />
      </section>
      <Footer
        activeCount={activeCount}
        filters={filtersData}
        filteredFunctions={filteredFunctions}
        clearCompleted={clearCompleted}
      />
    </section>
  )
}

export default TodoApp
