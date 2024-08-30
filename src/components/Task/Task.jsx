import React, { Component } from 'react'
import './Task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

import Timer from '../Timer'

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    editingLabel: this.props.label,
  }

  onLabelChange = (e) => {
    this.setState({
      editingLabel: e.target.value,
    })
  }

  render() {
    const { label, createDate, className, onDeleted, editTask, onEdited, onToggleCompleted, id } = this.props
    const { editingLabel } = this.state
    if (className === 'editing') {
      return (
        <li key={id} className={className}>
          <input
            type="text"
            className="edit"
            defaultValue={editingLabel}
            onChange={this.onLabelChange}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                onEdited(id, editingLabel)
              }
            }}
          />
        </li>
      )
    }
    return (
      <li key={id} className={className}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={className === 'completed'}
            onChange={onToggleCompleted}
          />
          <label onClick={onToggleCompleted}>
            <span className="description">{label}</span>
            <Timer />
            <span className="created">
              created{' '}
              {formatDistanceToNow(createDate, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={editTask} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}
