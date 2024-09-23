import { Task } from '@root/types'
import { TaskList } from '../TaskList/TaskList'
import { AddTask } from '../AddTask/AddTask'
import './TaskListView.css'

type Props = {
  tasks: Task[]
  onCreateTask: (taskName: string) => void
  onUpdateTask: (taskId: string, taskData: Partial<Task>) => void
  onDeleteTask?: (taskId: string) => void
}

export const TaskListView = ({ tasks, onCreateTask, onUpdateTask, onDeleteTask }: Props) => (
  <div className="task-list-view">
    {tasks.length ? (
      <TaskList tasks={tasks} onToggleTaskComplete={onUpdateTask} />
    ) : (
      <p>List empty! You can add a new task from the input at the bottom.</p>
    )}
    <div className="task-list-view__add-task">
      <AddTask onAddTask={onCreateTask} />
    </div>
  </div>
)
