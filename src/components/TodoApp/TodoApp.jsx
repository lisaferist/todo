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
      this.createTask('Active task'),
      this.createTask('Completed task', 'completed'),
      this.createTask('Editing task', 'editing'),
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

  addTask = (e) => {
    if (e.target.value && e.code === 'Enter') {
      const newTask = this.createTask(e.target.value)
      e.target.value = ''
      this.setState(({ todoData }) => ({ todoData: [...todoData, newTask] }))
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

  createTask(label, className = 'active') {
    return {
      label,
      className,
      createDate: Date.now(),
      id: this.maxId++,
    }
  }

  render() {
    const { todoData, filtersData } = this.state
    const activeCount = todoData.filter((task) => !task.className.includes('completed')).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.addTask} />
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
