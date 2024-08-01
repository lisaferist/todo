import React, {Component} from "react";
import './TasksFilter.css'

export default class TasksFilter extends Component {
    render() {
        const onFilterButton = (e) => {
            this.props.onFilterButton(e);
            this.props.filteredFunctions();
        }
        return (
            <button onClick={onFilterButton} className={this.props.className}>{this.props.label}</button>
        )
    }
}