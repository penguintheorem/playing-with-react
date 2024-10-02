import { useEffect, useState } from 'react'
import { Plus as PlusIcon } from 'react-feather'
import { TaskListHeadings } from './components/TaskListNames/TaskListHeadings'
import { TaskListView } from './components/TaskListView/TaskListView'
import { UserProfile } from './components/UserProfile/UserProfile'
import { Task, TaskList as TaskListType, User } from './types'
import { get, httpDelete, patch, post } from './utils/api'
import './App.css'

type TaskResponse = {
  id: string
  text: string
  done: boolean
  listId: string
}

type TaskListResponse = {
  id: string
  name: string
  undone_count: number
}

const convertTaskResponseToTask = (taskResponse: TaskResponse): Task => ({
  id: taskResponse.id,
  name: taskResponse.text,
  isCompleted: taskResponse.done,
  listId: taskResponse.listId,
})

const convertTaskListResponseToTaskList = (taskListResponse: TaskListResponse): TaskListType => ({
  id: taskListResponse.id,
  name: taskListResponse.name,
  undoneCount: taskListResponse.undone_count,
})

export const App = () => {
  const [currentTaskListIndex, setCurrentTaskListIndex] = useState(-1)
  const [taskLists, setTaskLists] = useState<TaskListType[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    console.log(`App#useEffect Runs`)
    const fetchData = async () => {
      const taskLists = await get<TaskListResponse[]>('/lists')
      const user = await get<User>('/user')
      console.log(`Printing task lists: ${JSON.stringify(taskLists)}`)
      console.log(`Printing user: ${JSON.stringify(user)}`)

      setTaskLists(taskLists.map(convertTaskListResponseToTaskList))
      setUser(user)
    }

    fetchData()
  }, [])

  /**
   * State management: TaskList
   */

  const handleTaskListSelect = async (taskListIndex: number) => {
    const currentTaskList = taskLists[taskListIndex]
    console.log(`handleTaskListSelect: request tasks for ${currentTaskList?.id}`)
    const allTasks = await get<TaskResponse[]>(`/todos?listId=${currentTaskList.id}`)
    console.log(`handleTaskListSelect response: ${JSON.stringify(allTasks)}`)

    setCurrentTaskListIndex(taskListIndex)
    setTasks(allTasks.map(convertTaskResponseToTask))
  }

  const addToListCount = (listIndex: number, count: number) => {
    // cloning
    const newTaskLists = [...taskLists]
    // updating, in an immutable way
    const newTaskList: TaskListType = {
      ...newTaskLists[listIndex],
    }
    newTaskList.undoneCount += count
    // replacing, in an immutable way
    newTaskLists[listIndex] = newTaskList

    setTaskLists(newTaskLists)
  }

  const handleAddTaskList = async () => {
    const newTaskList = await post<TaskListResponse, { name: string }>('/lists', {
      name: 'New task list',
    })

    console.log(`handleAddTaskList, response: ${JSON.stringify(newTaskList)}`)
    setTaskLists((currentTaskList) => [
      ...currentTaskList,
      convertTaskListResponseToTaskList(newTaskList),
    ])
  }

  const handleDeleteList = async (listId: string) => {
    const response = await httpDelete<TaskListType>(`/lists/${listId}`)

    console.log(`handleDeleteList, response: ${JSON.stringify(response)}`)
    // TODO: catch errors

    const newTaskLists = [...taskLists]
    const listIndex = newTaskLists.findIndex(({ id }) => listId === id)
    newTaskLists.splice(listIndex, 1)

    setTaskLists(newTaskLists)

    setCurrentTaskListIndex(-1)
    // setTasks([])
  }

  const handleRenameList = async (listId: string, newName: string) => {
    const response = await patch<TaskListType, { name: string }>(`/lists/${listId}`, {
      name: newName,
    })

    console.log(`handleRenameList, response: ${JSON.stringify(response)}`)
    // TODO: catch errors

    const newTaskLists = [...taskLists]
    const taskListIndex = newTaskLists.findIndex(({ id }) => listId === id)
    const newTaskList: TaskListType = {
      ...newTaskLists[taskListIndex],
      name: newName,
    }

    newTaskLists[taskListIndex] = newTaskList

    setTaskLists(newTaskLists)
  }

  const handleCreate = async (taskName: string) => {
    const newTask = await post<TaskResponse, { listId: string; done: boolean; text: string }>(
      `/todos`,
      {
        listId: taskLists[currentTaskListIndex].id,
        done: false,
        text: taskName,
      },
    )

    console.log(`handleCreate, response: ${JSON.stringify(newTask)}`)
    // TODO: catch errors

    const newTasks: Task[] = [
      ...tasks,
      {
        id: newTask.id,
        name: newTask.text,
        isCompleted: newTask.done,
        listId: newTask.listId,
      },
    ]
    setTasks(newTasks)
    addToListCount(currentTaskListIndex, 1)
  }

  const handleUpdate = async (taskId: string, taskData: Partial<Task>) => {
    const updatedTask = await patch<TaskResponse, { done?: boolean; text?: string }>(
      `/todos/${taskId}`,
      {
        ...(taskData.isCompleted !== undefined ? { done: taskData.isCompleted } : {}),
        ...(taskData.name !== undefined ? { text: taskData.name } : {}),
      },
    )

    console.log(`handleUpdate, response: ${JSON.stringify(updatedTask)}`)
    // TODO: catch errors
    // cloning
    const newTasks = [...tasks]
    const oldTaskIndex = newTasks.findIndex(({ id }) => taskId === id)
    // replacing, in an immutable way
    newTasks[oldTaskIndex] = convertTaskResponseToTask(updatedTask)

    setTasks(newTasks)

    if (
      taskData.isCompleted !== undefined &&
      taskData.isCompleted !== tasks[oldTaskIndex].isCompleted
    ) {
      addToListCount(currentTaskListIndex, taskData.isCompleted ? -1 : 1)
    }
  }

  const handleDelete = async (taskId: string) => {
    const response = await httpDelete<TaskResponse>(`/todos/${taskId}`)

    console.log(`handleDelete, response: ${JSON.stringify(response)}`)

    const newTasks = [...tasks]
    const oldTaskIndex = newTasks.findIndex(({ id }) => taskId === id)
    // delete, in an immutable way
    newTasks.splice(oldTaskIndex, 1)
    // replacing, in an immutable way
    setTasks(newTasks)
    addToListCount(currentTaskListIndex, tasks[oldTaskIndex].isCompleted ? 0 : -1)
  }

  return (
    <section className="container">
      <div className="app">
        <div className="app__sidebar-container">
          <section className="app__sidebar">
            <div className="app__profile">{user && <UserProfile user={user} />}</div>
            <div className="app__task-list-names">
              {taskLists.length === 0 ? (
                <p>No task lists available</p>
              ) : (
                <TaskListHeadings
                  taskLists={taskLists}
                  activeTaskListIndex={currentTaskListIndex}
                  onTaskListSelect={handleTaskListSelect}
                />
              )}
            </div>
            <div className="app__add-task-list">
              <PlusIcon />
              <button className="app__add-task-list-button" onClick={handleAddTaskList}>
                New task list
              </button>
            </div>
          </section>
        </div>
        <div className="app__task-list">
          {taskLists.length === 0 || currentTaskListIndex < 0 ? (
            <p>No task lists available, please create or select a list</p>
          ) : (
            <TaskListView
              list={taskLists[currentTaskListIndex]}
              tasks={tasks}
              onCreateTask={handleCreate}
              onUpdateTask={handleUpdate}
              onDeleteTask={handleDelete}
              onDeleteList={handleDeleteList}
              onRenameList={handleRenameList}
            />
          )}
        </div>
      </div>
    </section>
  )
}
