import { Task } from '@root/types'

// TODO: Implement a custom hook that returns a list of tasks from API
const tasks: Task[] = [
  { id: '1', name: 'Task 1', isCompleted: true },
  { id: '2', name: 'Task 2', isCompleted: false },
  { id: '3', name: 'Task 3', isCompleted: false },
]

export const useTasks = () => {
  return tasks
}
