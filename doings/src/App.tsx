import { Sidebar } from './components/Sidebar/Sidebar'
import { TaskList } from './components/TaskList/TaskList'
import './App.css'

export const App = () => {
  return (
    <section className="container">
      <div className="app">
        <div className="app__sidebar">
          <Sidebar />
        </div>
        <div className="app__task-list">
          <TaskList />
        </div>
      </div>
    </section>
  )
}
