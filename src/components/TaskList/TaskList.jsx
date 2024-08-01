import Task from "../Task/Task";
import React from "react";
import './TaskList.css'
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TaskList = ({tasks, onDeleted, onToggleCompleted, editTask, onEdited}) => {
    const elements = tasks.map((task) => {
        const {id, ...taskProps} = task
        return (
            <Task {...taskProps} id={id} key={id}
                  editTask={() => {
                      editTask(id)
                  }}
                  onEdited={onEdited}
                  onDeleted={() => {
                      onDeleted(id)
                  }}
                  onToggleCompleted={() => {
                      onToggleCompleted(id)
                  }}/>
        )
    })
    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
}
export default TaskList;