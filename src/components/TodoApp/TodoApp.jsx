import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import React, {Component} from "react";
import './TodoApp.css'

export default class TodoApp extends Component {
    maxId = 0;
    state = {
        todoData: [
            this.createTask('Active task'),
            this.createTask('Completed task', 'completed'),
            this.createTask('Editing task', 'editing')],
        filtersData: {
            All: 'selected',
            Active: '',
            Completed: ''
        },
    }

    createTask(label, className = 'active') {
        return {
            label,
            className,
            createDate: Date.now(),
            id: this.maxId++
        }
    }

    toggleClassName = (firstClassName, secondClassName, oldObj) => {
        if (oldObj.className === firstClassName) {
            return {
                ...oldObj,
                className: secondClassName,
            }
        } else if (oldObj.className === secondClassName) {
            return {
                ...oldObj,
                className: firstClassName,
            }
        }
    }
    deleteTask = (id) => {
        this.setState(({todoData}) => {
            return {todoData: todoData.toSpliced(todoData.findIndex((el) => el.id === id), 1)}
        })
    }
    addTask = (e) => {
        if (e.target.value && e.code === 'Enter') {
            const newTask = this.createTask(e.target.value);
            e.target.value = '';
            this.setState(({todoData}) => {
                return {todoData: [...todoData, newTask]}
            })
        }
    }
    onToggleCompleted = (id) => {
        this.setState(({todoData}) => {
            const tasksIndex = todoData.findIndex((el) => el.id === id);
            const oldTask = todoData[tasksIndex];
            let newTask
            if (this.state.filtersData.Completed === 'selected') {
                newTask = this.toggleClassName('active hidden', 'completed', oldTask)
            } else if (this.state.filtersData.Active === 'selected') {
                newTask = this.toggleClassName('active', 'completed hidden', oldTask)
            } else {
                newTask = this.toggleClassName('active', 'completed', oldTask)
            }
            return {
                todoData: [
                    ...todoData.slice(0, tasksIndex),
                    newTask,
                    ...todoData.slice(tasksIndex + 1)
                ]
            }
        })
    }
    editTask = (id) => {
        this.setState(({todoData}) => {
            const tasksIndex = todoData.findIndex((el) => el.id === id);
            const oldTask = todoData[tasksIndex];
            if (oldTask.className === 'active') {
                const newTask = this.toggleClassName(oldTask.className, 'editing', oldTask);
                return {
                    todoData: [
                        ...todoData.slice(0, tasksIndex),
                        newTask,
                        ...todoData.slice(tasksIndex + 1)
                    ]
                }
            }
        })
    }
    onEdited = (id, text) => {
        this.setState(({todoData}) => {
            const tasksIndex = todoData.findIndex((el) => el.id === id);
            const oldTask = todoData[tasksIndex];
            const newTask = {...oldTask, className: 'active', label: text};
            return {
                todoData: [
                    ...todoData.slice(0, tasksIndex),
                    newTask,
                    ...todoData.slice(tasksIndex + 1)
                ]
            }
        })
    }
    filteredFunctions = {
        allFiltered: () => {
            this.setState(({todoData}) => {
                return {
                    todoData: todoData.map((task) => {
                        if (task.className.includes('hidden')) {
                            task.className = task.className.slice(0, -7);
                        }
                        return task
                    })
                }
            })
        },
        activeFiltered: () => {
            this.setState(({todoData}) => {
                return {
                    todoData: todoData.map((task) => {
                        if (task.className.includes('completed') && !task.className.includes('hidden')) {
                            task.className += ' hidden';
                        }
                        if ((task.className.includes('active') || task.className.includes('editing')) && task.className.includes('hidden')) {
                            task.className = task.className.slice(0, -7);
                        }
                        return task
                    })
                }
            })
        },
        completedFiltered: () => {
            this.setState(({todoData}) => {
                return {
                    todoData: todoData.map((task) => {
                        if (!task.className.includes('completed') && !task.className.includes('hidden')) {
                            task.className += ' hidden';
                        }
                        if (task.className.includes('completed') && task.className.includes('hidden')) {
                            task.className = task.className.slice(0, -7);
                        }
                        return task
                    })
                }
            })
        },
        onFilterButton: (e) => {
            this.setState(({filtersData}) => {
                let entriesFiltersMap = new Map([['All', ''], ['Active', ''], ['Completed', '']]);
                entriesFiltersMap.set(e.target.textContent, 'selected');
                return {
                    filtersData: Object.fromEntries(entriesFiltersMap)
                }
            })
        }
    }
    clearCompleted = () => {
        this.setState(({todoData}) => {
            return {
                todoData: todoData.filter((task) => !task.className.includes('completed'))
            }
        })
    }

    render() {
        const activeCount = this.state.todoData.filter((task) => !task.className.includes('completed')).length
        return (<section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm onAddTask={this.addTask}/>
            </header>
            <section className="main">
                <TaskList tasks={this.state.todoData}
                          onDeleted={this.deleteTask}
                          editTask={this.editTask}
                          onEdited={this.onEdited}
                          onToggleCompleted={this.onToggleCompleted}/>
            </section>
            <Footer activeCount={activeCount}
                    filters={this.state.filtersData}
                    filteredFunctions={this.filteredFunctions}
                    clearCompleted={this.clearCompleted}/>
        </section>)
    }
}
