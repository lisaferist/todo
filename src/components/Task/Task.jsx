import React from "react";
import './Task.css'
const Task = (props) => {
    if (props.category === 'editing') {
        return (
            <div>
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>
                        <span className="description">{props.label}</span>
                        <span className="created">{props.createDate}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                <input type="text" className="edit" value={props.label}/>
            </div>
        )
    }else return (
        <div className="view">
            <input className="toggle" type='checkbox'></input>
            <label>
                <span className="description">{props.label}</span>
                <span className="created">{props.createDate}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
            </div>
    )
}
export default Task;