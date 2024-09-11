import { useState } from 'react'
import { TaskListItem } from './TaskListItem'

type Props = {
  taskNames: string[]
}

export const TaskListNames = ({ taskNames }: Props) => {
  const [currentActiveTaskIndex, setCurrentActiveTaskIndex] = useState(0)

  return (
    <section data-testid="task-list-names">
      <ul>
        {taskNames.map((taskName, index) => (
          <li key={`${taskName}-${index}`} data-testid="task-list-item-container">
            <TaskListItem
              taskName={taskName}
              isActive={index === currentActiveTaskIndex}
              onSelect={() => setCurrentActiveTaskIndex(index)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
