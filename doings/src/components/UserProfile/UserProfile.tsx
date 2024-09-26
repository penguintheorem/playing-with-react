import { User } from 'src/types'
import './UserProfile.css'

type Props = {
  user: User
}

export const UserProfile = ({ user }: Props) => (
  <section className="user-profile">
    <img className="user-profile__avatar" src={user.image} alt="avatar" />
    <div className="user-profile__name">{user.name}</div>
  </section>
)
