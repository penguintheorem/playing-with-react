import { Task as TaskType } from 'src/types'
import { Trash2 as TrashIcon } from 'react-feather'
import './Task.css'
import { useContext, useState } from 'react'
import classNames from 'classnames'
import { EditableText } from '../EditableText/EditableText'
import { TaskContext } from '../../TaskContext'

type Props = {
  task: TaskType
}

export const Task = ({ task }: Props) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted)
  const { onDeleteTask, onUpdateTask } = useContext(TaskContext)

  return (
    <section data-testid="task" className={classNames('task', { 'task--is-active': isCompleted })}>
      <input
        data-testid="task-checkbox"
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
      <button className="task__delete-button" onClick={() => onDeleteTask(task.id)}>
        <TrashIcon />
      </button>
    </section>
  )
}
