import { Task as TaskType } from '@root/types'
import { Trash2 as TrashIcon } from 'react-feather'
import './Task.css'

type Props = {
  task: TaskType
}

export const Task = ({ task }: Props) => (
  <section className="task">
    <input className="task__checkbox" type="checkbox" checked={task.isCompleted} />
    <p className="task__name">{task.name}</p>
    <button className="task__delete-button">
      <TrashIcon />
    </button>
  </section>
)
