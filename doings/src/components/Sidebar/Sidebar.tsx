import { TaskListNames } from '../TaskListNames/TaskListNames'
import { UserProfile } from '../UserProfile/UserProfile'

export const Sidebar = () => (
  <section>
    <div>
      <UserProfile />
    </div>
    <div>
      <TaskListNames />
    </div>
  </section>
)
