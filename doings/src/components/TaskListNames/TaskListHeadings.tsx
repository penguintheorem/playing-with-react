import { useState } from 'react'
import { TaskListItem } from './TaskListItem'
import { TaskList } from '@root/types'

type Props = {
  taskLists: TaskList[]
}

export const TaskListHeadings = ({ taskLists }: Props) => {
  const [currentActiveTaskIndex, setCurrentActiveTaskIndex] = useState(0)

  return (
    <section data-testid="task-list-names">
      <ul>
        {taskLists.map(({ id, name, undoneCount }, index) => (
          <li key={id} data-testid="task-list-item-container">
            <TaskListItem
              taskListName={name}
              isActive={index === currentActiveTaskIndex}
              undoneCount={undoneCount}
              onSelect={() => setCurrentActiveTaskIndex(index)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
