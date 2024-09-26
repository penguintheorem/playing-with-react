import { Task as TaskType } from 'src/types'
import { Task } from './Task'

type Props = {
  tasks: TaskType[]
  onUpdateTask: (taskId: string, taskData: Partial<TaskType>) => void
  onDeleteTask: (taskId: string) => void
}

export const TaskList = ({ tasks, onUpdateTask, onDeleteTask }: Props) => (
  <section>
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onUpdateTask={onUpdateTask} onRemove={onDeleteTask} />
      ))}
    </ul>
  </section>
)
