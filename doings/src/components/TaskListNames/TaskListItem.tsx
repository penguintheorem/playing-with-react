import classNames from 'classnames'
import { List as ListIcon } from 'react-feather'
import './TaskListItem.css'

type Props = {
  taskListName: string
  isActive: boolean
  undoneCount: number
  onSelect: () => void
}

export const TaskListItem = ({ taskListName, isActive, undoneCount, onSelect }: Props) => (
  <div
    className={classNames('task-list-item', { 'task-list-item--is-active': isActive })}
    data-testid="task-list-item"
  >
    <div className="task-list-item__button-container">
      <ListIcon />
      <button
        className="task-list-item__button"
        onClick={onSelect}
        data-testid="task-list-item-button"
      >
        {taskListName}
      </button>
    </div>
    <div className="task-list-item__undone-count" data-testid="task-list-item-undone-count">
      {undoneCount}
    </div>
  </div>
)
