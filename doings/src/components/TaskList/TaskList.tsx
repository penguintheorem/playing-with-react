import { Task as TaskType } from 'src/types'
import { Task } from './Task'

type Props = {
  tasks: TaskType[]
}

export const TaskList = ({ tasks }: Props) => (
  <section>
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  </section>
)
