import './App.css'
import { Sidebar } from './components/Sidebar/Sidebar'
import { TaskList } from './components/TaskList/TaskList'
import { useTaskLists } from './hooks/useTaskLists'
import { useTasks } from './hooks/useTasks'

export const App = () => {
  const tasks = useTasks()
  const taskLists = useTaskLists()

  return (
    <section className="container">
      <div className="app">
        <div className="app__sidebar">
          <Sidebar taskLists={taskLists} />
        </div>
        <div className="app__task-list">
          <TaskList tasks={tasks} />
        </div>
      </div>
    </section>
  )
}
