import { TaskListNames } from '../TaskListNames/TaskListNames'
import { UserProfile } from '../UserProfile/UserProfile'
import './Sidebar.css'

export const Sidebar = () => (
  <section className="sidebar">
    <div className="sidebar__profile">
      <UserProfile />
    </div>
    <div className="sidebar__task-list-names">
      <TaskListNames taskNames={['Home', 'Groceries', 'Work', 'Children']} />
    </div>
  </section>
)
