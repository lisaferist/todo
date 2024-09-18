/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react'
import './Task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

import Timer from '../Timer'

function Task({ label, createDate, className, onDeleted, editTask, onEdited, onToggleCompleted, id, timerTime }) {
  const [editingLabel, setEditingLabel] = useState(label)
  const [taskInterval, setTaskInterval] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(timerTime.seconds)
  const [minutes, setMinutes] = useState(timerTime.minutes)

  const timerFunctions = {
    startTimer: () => {
      if (!isRunning && !taskInterval && className !== 'completed') {
        let sec = seconds
        let min = minutes
        setIsRunning(true)
        const interval = setInterval(() => {
          if (sec >= 59) {
            sec = 0
            min++
          } else sec++
          setSeconds(sec)
          setMinutes(min)
          setTaskInterval(interval)
        }, 1000)
      }
    },
    stopTimer: () => {
      if (taskInterval && isRunning) {
        clearInterval(taskInterval)
        setTaskInterval(null)
        setIsRunning(false)
      }
    },
  }

  useEffect(() => {
    if (className === 'completed' && isRunning) {
      timerFunctions.stopTimer()
    }
  }, [className])

  useEffect(
    () => () => {
      timerFunctions.stopTimer()
    },
    []
  )

  const onLabelChange = (e) => {
    setEditingLabel(e.target.value)
  }

  if (className === 'editing') {
    return (
      <li key={id} className={className}>
        <input
          type="text"
          className="edit"
          defaultValue={editingLabel}
          onChange={onLabelChange}
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
          <Timer timerFunctions={timerFunctions} sec={seconds} min={minutes} isRunning={isRunning} />
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

export default Task
