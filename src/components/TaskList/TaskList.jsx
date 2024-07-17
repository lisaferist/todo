import Task from "../Task/Task";
import React from "react";
import './TaskList.css'
const TaskList = ({ todos }) => {
    const elements = todos.map((todo) => {
        return (
            <li key={todo.id} className={todo.className}><Task label={todo.label} createDate={todo.createDate} category = {todo.className}/></li>
        )
    })
    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
}
export default TaskList;