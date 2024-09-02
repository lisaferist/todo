import './Timer.css'
import React from 'react'

export default function Timer({ timerFunctions, min, sec, isRunning }) {
  function timeToString(timeObject) {
    const hours = timeObject.hours >= 10 ? `${timeObject.hours}` : `0${timeObject.hours}`
    const minutes = timeObject.minutes >= 10 ? `${timeObject.minutes}` : `0${timeObject.minutes}`
    const seconds = timeObject.seconds >= 10 ? `${timeObject.seconds}` : `0${timeObject.seconds}`
    return timeObject.hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
  }

  const timeLabel = timeToString({ minutes: min, seconds: sec })
  const button = isRunning ? (
    <button className="icon icon-pause" onClick={timerFunctions.stopTimer} />
  ) : (
    <button className="icon icon-play" onClick={timerFunctions.startTimer} />
  )
  return (
    <div className="timer">
      <span className="description">
        {button}
        {timeLabel}
      </span>
    </div>
  )
}
