import { Task as TaskType } from 'src/types'
import { Trash2 as TrashIcon } from 'react-feather'
import './Task.css'
import { useState } from 'react'
import classNames from 'classnames'
import { EditableText } from '../EditableText/EditableText'

type Props = {
  task: TaskType
  onUpdateTask: (taskId: string, taskData: Partial<TaskType>) => void
  onRemove: (taskId: string) => void
}

export const Task = ({ task, onUpdateTask, onRemove }: Props) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)

  return (
    <section className={classNames('task', { 'task--is-active': isCompleted })}>
      <input
        className="task__checkbox"
        type="checkbox"
        checked={isCompleted}
        onChange={() => {
          setIsCompleted(!isCompleted)
          onUpdateTask(task.id, { isCompleted: !isCompleted })
        }}
      />
      <div className="task__name">
        <EditableText
          defaultText={task.name}
          isEditable={!task.isCompleted}
          onSetText={(newTaskName: string) => onUpdateTask(task.id, { name: newTaskName })}
        />
      </div>
      <button className="task__delete-button" onClick={() => onRemove(task.id)}>
        <TrashIcon />
      </button>
    </section>
  )
}
