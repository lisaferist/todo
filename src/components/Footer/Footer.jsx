import TasksFilter from "../TasksFilter";
import React from "react";
import "./Footer.css";

const Footer = (props) => {
    const {allFiltered, activeFiltered, completedFiltered, onFilterButton} = props.filteredFunctions
    const activeCount = props.activeCount;
    const labels = Object.keys(props.filters)
    const classNames = Object.values(props.filters)
    const elements = labels.map((label, i) => {
        let onFilteredFunc
        switch (label) {
            case 'All' :
                onFilteredFunc = allFiltered;
                break
            case 'Active' :
                onFilteredFunc = activeFiltered;
                break
            case 'Completed':
                onFilteredFunc = completedFiltered;
        }
        return <li key={i}><TasksFilter label={label} className={classNames[i]} filteredFunctions={onFilteredFunc} onFilterButton={onFilterButton}/>
        </li>
    })
    return (
        <footer className="footer">
            <span className="todo-count">{activeCount} items left</span>
            <ul className="filters">
                {elements}
            </ul>
            <button className="clear-completed" onClick={props.clearCompleted}>Clear completed</button>
        </footer>
    )
}
export default Footer;