import React, {Component} from "react";
import './Task.css'
import {formatDistanceToNow} from "date-fns/formatDistanceToNow";

export default class Task extends Component {
    state = {
        editingLabel: this.props.label
    }
    onLabelChange = (e) => {
        this.setState({
            editingLabel: e.target.value
        })
    }

    render() {
        const {label, createDate, className, onDeleted, editTask, onEdited, onToggleCompleted, id} = this.props
        if (className === 'editing') {
            return (
                <li key={id} className={className}>
                    <input type="text" className="edit" defaultValue={this.state.editingLabel}
                           onChange={this.onLabelChange}
                           onKeyDown={(e) => {
                               if (e.code === 'Enter') {
                                   onEdited(id, this.state.editingLabel)
                               }
                           }}/>
                </li>
            )
        } else return (
            <li key={id} className={className}>
                <div className="view">
                    <input className="toggle" type='checkbox' checked={className === 'completed'}
                           onChange={onToggleCompleted}></input>
                    <label onClick={onToggleCompleted}>
                        <span className="description">{label}</span>
                        <span className="created">{formatDistanceToNow(createDate)}</span>
                    </label>
                    <button className="icon icon-edit" onClick={editTask}></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
            </li>
        )
    }
}
