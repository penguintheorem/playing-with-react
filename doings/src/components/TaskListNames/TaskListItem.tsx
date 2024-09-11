import classNames from 'classnames'
import './TaskListItem.css'

type Props = {
  taskName: string
  isActive: boolean
  onSelect: () => void
}

export const TaskListItem = ({ taskName, isActive, onSelect }: Props) => (
  <div
    className={classNames('task-list-item', { 'task-list-item--is-active': isActive })}
    data-testid="task-list-item"
  >
    <button onClick={onSelect} data-testid="task-list-item-button">
      {taskName}
    </button>
  </div>
)
