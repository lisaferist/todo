import React from "react";
import './TasksFilter.css'
const TasksFilter = (props) => {
    return (
        <li>
            <button className={props.className}>{props.label}</button>
        </li>
    )
}
export default TasksFilter;