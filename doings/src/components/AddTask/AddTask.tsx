import { useState } from 'react'
import { Plus } from 'react-feather'
import './AddTask.css'

type Props = {
  onAddTask: (taskName: string) => void
}

export const AddTask = ({ onAddTask }: Props) => {
  const [taskName, setTaskName] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value)
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && taskName) {
      console.debug(`Adding task: ${taskName}`)
      onAddTask(taskName)
      setTaskName('')
    }
  }

  return (
    <div data-testid="add-task" className="add-task">
      <Plus />
      <input
        data-testid="add-task-input"
        className="add-task__input"
        type="text"
        placeholder="Add a task"
        value={taskName}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </div>
  )
}
