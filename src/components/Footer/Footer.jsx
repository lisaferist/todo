import TasksFilter from "../TasksFilter";
import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <ul className="filters">
                <TasksFilter label='All' className="selected" />
                <TasksFilter label='Active' />
                <TasksFilter label='Completed' />
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
}
export default Footer;