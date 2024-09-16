import { Task, TaskList } from '@root/types'

// TODO: Implement a custom hook that returns the following data from API
const taskLists: TaskList[] = [
  { id: '1', name: 'Home', undoneCount: 1 },
  { id: '2', name: 'Groceries', undoneCount: 2 },
  { id: '3', name: 'Work', undoneCount: 3 },
]

export const useTaskLists = () => {
  return taskLists
}
