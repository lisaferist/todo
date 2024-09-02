import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './TodoApp.css'

export default class TodoApp extends Component {
  static toggleClassName = (firstClassName, secondClassName, oldObj) => {
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

  maxId = 0

  state = {
    todoData: [
      this.createTask('Active'),
      this.createTask('Completed', 12, 25, 'completed'),
      this.createTask('Editing', 14, 12, 'editing'),
    ],
    filtersData: {
      All: 'selected',
      Active: '',
      Completed: '',
    },
  }

  filteredFunctions = {
    allFiltered: () => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) => {
          const newTask = { ...task }
          if (newTask.className.includes('hidden')) {
            newTask.className = newTask.className.slice(0, -7)
          }
          return newTask
        }),
      }))
    },
    activeFiltered: () => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) => {
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
        }),
      }))
    },
    completedFiltered: () => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) => {
          const newTask = { ...task }
          if (!newTask.className.includes('completed') && !newTask.className.includes('hidden')) {
            newTask.className += ' hidden'
          }
          if (newTask.className.includes('completed') && newTask.className.includes('hidden')) {
            newTask.className = newTask.className.slice(0, -7)
          }
          return newTask
        }),
      }))
    },
    onFilterButton: (e) => {
      this.setState(() => {
        const entriesFiltersMap = new Map([
          ['All', ''],
          ['Active', ''],
          ['Completed', ''],
        ])
        entriesFiltersMap.set(e.target.textContent, 'selected')
        return {
          filtersData: Object.fromEntries(entriesFiltersMap),
        }
      })
    },
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.toSpliced(
        todoData.findIndex((el) => el.id === id),
        1
      ),
    }))
  }

  submitTaskForm = (e) => {
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
        this.setState(({ todoData }) => ({ todoData: [...todoData, this.createTask(todoText, min, sec)] }))
      }
      if (!isMinCorrect) {
        minInput.className += ' input-error'
      }
      if (!isSecCorrect) {
        secInput.className += ' input-error'
      }
    }
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const tasksIndex = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[tasksIndex]
      const { filtersData } = this.state
      let newTask
      if (filtersData.Completed === 'selected') {
        newTask = TodoApp.toggleClassName('active hidden', 'completed', oldTask)
      } else if (filtersData.Active === 'selected') {
        newTask = TodoApp.toggleClassName('active', 'completed hidden', oldTask)
      } else {
        newTask = TodoApp.toggleClassName('active', 'completed', oldTask)
      }
      return {
        todoData: [...todoData.slice(0, tasksIndex), newTask, ...todoData.slice(tasksIndex + 1)],
      }
    })
  }

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const tasksIndex = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[tasksIndex]
      if (oldTask.className === 'active') {
        const newTask = TodoApp.toggleClassName(oldTask.className, 'editing', oldTask)
        return {
          todoData: [...todoData.slice(0, tasksIndex), newTask, ...todoData.slice(tasksIndex + 1)],
        }
      }
    })
  }

  onEdited = (id, text) => {
    this.setState(({ todoData }) => {
      const tasksIndex = todoData.findIndex((el) => el.id === id)
      const oldTask = todoData[tasksIndex]
      const newTask = { ...oldTask, className: 'active', label: text }
      return {
        todoData: [...todoData.slice(0, tasksIndex), newTask, ...todoData.slice(tasksIndex + 1)],
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((task) => !task.className.includes('completed')),
    }))
  }

  createTask(label, min = 0, sec = 0, className = 'active') {
    return {
      label,
      className,
      createDate: Date.now(),
      id: this.maxId++,
      timerTime: {
        minutes: min.length === 0 ? 0 : min,
        seconds: sec.length === 0 ? 0 : sec,
      },
    }
  }

  render() {
    const { todoData, filtersData } = this.state
    const activeCount = todoData.filter((task) => !task.className.includes('completed')).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm submitTaskForm={this.submitTaskForm} />
        </header>
        <section className="main">
          <TaskList
            tasks={todoData}
            onDeleted={this.deleteTask}
            editTask={this.editTask}
            onEdited={this.onEdited}
            onToggleCompleted={this.onToggleCompleted}
          />
        </section>
        <Footer
          activeCount={activeCount}
          filters={filtersData}
          filteredFunctions={this.filteredFunctions}
          clearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}
