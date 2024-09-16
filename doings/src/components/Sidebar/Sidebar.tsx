import { TaskList } from '@root/types'
import { TaskListHeadings } from '../TaskListNames/TaskListHeadings'
import { UserProfile } from '../UserProfile/UserProfile'
import './Sidebar.css'

type Props = {
  taskLists: TaskList[]
}

export const Sidebar = ({ taskLists }: Props) => (
  <section className="sidebar">
    <div className="sidebar__profile">
      <UserProfile />
    </div>
    <div className="sidebar__task-list-names">
      <TaskListHeadings taskLists={taskLists} />
    </div>
  </section>
)
