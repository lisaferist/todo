import './TasksFilter.css'

function TasksFilter({ onFilterButton, filteredFunctions, label, className }) {
  const onClickFilterButton = (e) => {
    onFilterButton(e)
    filteredFunctions()
  }
  return (
    <button onClick={onClickFilterButton} className={className}>
      {label}
    </button>
  )
}
export default TasksFilter
