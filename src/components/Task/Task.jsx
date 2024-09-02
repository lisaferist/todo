/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import './Task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

import Timer from '../Timer'

export default class Task extends Component {
  state = {
    editingLabel: this.props.label,
    interval: null,
    isRunning: false,
    seconds: this.props.timerTime.seconds,
    minutes: this.props.timerTime.minutes,
  }

  timerFunctions = {
    startTimer: () => {
      let { seconds, minutes, interval } = this.state
      const { isRunning } = this.state
      if (!isRunning && !interval && this.props.className !== 'completed') {
        this.setState({ isRunning: true })
        interval = setInterval(() => {
          if (seconds >= 59) {
            seconds = 0
            minutes++
          } else seconds++
          this.setState({ interval, seconds, minutes })
        }, 1000)
      }
    },
    stopTimer: () => {
      const { seconds, minutes, interval, isRunning } = this.state
      if (interval && isRunning) {
        clearInterval(interval)
        this.setState({ interval: null, seconds, minutes, isRunning: false })
      }
    },
  }

  componentDidUpdate() {
    if (this.props.className === 'completed' && this.state.isRunning) {
      this.timerFunctions.stopTimer()
    }
  }

  componentWillUnmount() {
    this.timerFunctions.stopTimer()
  }

  onLabelChange = (e) => {
    this.setState({
      editingLabel: e.target.value,
    })
  }

  /* eslint-enable react/destructuring-assignment */
  render() {
    const { label, createDate, className, onDeleted, editTask, onEdited, onToggleCompleted, id } = this.props
    const { editingLabel, seconds, minutes, isRunning } = this.state
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
          <label>
            <span className="title">{label}</span>
            <Timer timerFunctions={this.timerFunctions} sec={seconds} min={minutes} isRunning={isRunning} />
            <span className="description">
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
