import React, { useState } from 'react'

type Props = {
  name?: string
  isEditable?: boolean
  onSetTaskName: (taskName: string) => void
}

export const TaskName = ({ name = '', isEditable = true, onSetTaskName }: Props) => {
  const [taskName, setTaskName] = useState(name)

  return (
    <input
      disabled={!isEditable}
      type="text"
      value={taskName}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTaskName(event.target.value)}
      onBlur={() => onSetTaskName(taskName)}
    />
  )
}
