import { Task as TaskType } from '@root/types'
import { Task } from './Task'

type Props = {
  tasks: TaskType[]
  onToggleTaskComplete: (taskId: string, taskData: Partial<TaskType>) => void
}

export const TaskList = ({ tasks, onToggleTaskComplete }: Props) => (
  <section>
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={(isCompleted: boolean) =>
            onToggleTaskComplete(task.id, { isCompleted })
          }
        />
      ))}
    </ul>
  </section>
)
