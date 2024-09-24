import { Task } from '@root/types'
import { TaskList } from '../TaskList/TaskList'
import { AddTask } from '../AddTask/AddTask'
import './TaskListView.css'

type Props = {
  tasks: Task[]
  onCreateTask: (taskName: string) => void
  onUpdateTask: (taskId: string, taskData: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
}

export const TaskListView = ({ tasks, onCreateTask, onUpdateTask, onDeleteTask }: Props) => {
  const completedTasks = tasks.filter(({ isCompleted }) => isCompleted === true)
  const uncompletedTasks = tasks.filter(({ isCompleted }) => isCompleted === false)

  return (
    <div className="task-list-view">
      {tasks.length ? (
        <>
          <h4 className="task-list-view__heading">Doings</h4>
          <TaskList
            tasks={uncompletedTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
          <h4 className="task-list-view__heading">Completed tasks</h4>
          <TaskList
            tasks={completedTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        </>
      ) : (
        <p>List empty! You can add a new task from the input at the bottom.</p>
      )}
      <div className="task-list-view__add-task">
        <AddTask onAddTask={onCreateTask} />
      </div>
    </div>
  )
}
