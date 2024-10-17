import { TaskList } from 'src/types'
import { TaskListItem } from './TaskListItem'

type Props = {
  activeTaskListIndex: number
  taskLists: TaskList[]
  onTaskListSelect: (taskListIndex: number) => void
}

export const TaskListHeadings = ({ taskLists, activeTaskListIndex, onTaskListSelect }: Props) => (
  <section data-testid="task-list-names">
    <ul>
      {taskLists.map(({ id, name, undoneCount }, index) => (
        <li key={id} data-testid="task-list-item-container">
          <TaskListItem
            taskListName={name}
            isActive={index === activeTaskListIndex}
            undoneCount={undoneCount}
            onSelect={() => onTaskListSelect(index)}
          />
        </li>
      ))}
    </ul>
  </section>
)
