import { Task as TaskType } from '@root/types'
import { Trash2 as TrashIcon } from 'react-feather'
import './Task.css'
import { useState } from 'react'
import classNames from 'classnames'

type Props = {
  task: TaskType
  onToggleComplete: (isCompleted: boolean) => void
  onRemove?: () => void
}

export const Task = ({ task, onToggleComplete }: Props) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)

  return (
    <section className={classNames('task', { 'task--is-active': isCompleted })}>
      <input
        className="task__checkbox"
        type="checkbox"
        checked={isCompleted}
        onChange={() => {
          setIsCompleted(!isCompleted)
          onToggleComplete(!isCompleted)
        }}
      />
      <p className="task__name">{task.name}</p>
      <button className="task__delete-button">
        <TrashIcon />
      </button>
    </section>
  )
}
