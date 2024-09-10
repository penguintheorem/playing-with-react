import './UserProfile.css'

export const UserProfile = () => (
  <section className="user-profile">
    <img
      className="user-profile__avatar"
      src="https://www.gravatar.com/avatar/0?d=mp"
      alt="avatar"
    />
    <div className="user-profile__name">John Doe</div>
  </section>
)
