import { createContext } from 'react'
import { Task } from './types'

type TaskContextType = {
  onUpdateTask: (taskId: string, taskData: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
}

export const TaskContext = createContext<TaskContextType>({
  onUpdateTask: () => {},
  onDeleteTask: () => {},
})
