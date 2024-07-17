import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import React from "react";
import './TodoApp.css'
const formatDistanceToNow = require('date-fns/formatDistanceToNow')
const TodoApp = () => {
    const todoData = [
        {label: 'Active task', className: 'active', createDate: formatDistanceToNow.formatDistanceToNow(new Date()), id:'1'},
        {label: 'Editing task', className: 'editing', createDate: formatDistanceToNow.formatDistanceToNow(new Date()), id:'2'},
        {label: 'Completed task', className: 'completed', createDate: formatDistanceToNow.formatDistanceToNow(new Date()), id:'3'}];
    return (<section className="todoapp">
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm />
        </header>
        <section className="main">
            <TaskList todos={todoData} />
        </section>
        <Footer />
    </section>)
}
export default TodoApp;