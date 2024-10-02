import { useState } from 'react'
import { Plus as PlusIcon } from 'react-feather'
import { v4 as uuid } from 'uuid'
import './App.css'
import { TaskListHeadings } from './components/TaskListNames/TaskListHeadings'
import { TaskListView } from './components/TaskListView/TaskListView'
import { UserProfile } from './components/UserProfile/UserProfile'
import { Task, TaskList as TaskListType, User } from './types'

/**
 * To be properly fetched from API
 */
const initialTaskLists: TaskListType[] = [
  {
    id: '1',
    name: 'Today',
    undoneCount: 3,
  },
  {
    id: '2',
    name: 'Tomorrow',
    undoneCount: 5,
  },
  {
    id: '3',
    name: 'Next week',
    undoneCount: 8,
  },
]
const initialAllTasks: { [listId: string]: Task[] } = {
  '1': [
    {
      id: '1',
      name: 'Buy groceries',
      isCompleted: false,
    },
    {
      id: '2',
      name: 'Walk the dog',
      isCompleted: false,
    },
    {
      id: '3',
      name: 'Go to the gym',
      isCompleted: false,
    },
  ],
  '2': [
    {
      id: '4',
      name: 'Buy tickets',
      isCompleted: false,
    },
    {
      id: '5',
      name: 'Study React',
      isCompleted: false,
    },
    {
      id: '6',
      name: 'Have English lessons',
      isCompleted: false,
    },
    {
      id: '7',
      name: 'Buy Pizzas',
      isCompleted: false,
    },
    {
      id: '8',
      name: 'Feed the dog',
      isCompleted: false,
    },
  ],
  '3': [
    {
      id: '9',
      name: 'Play with cats',
      isCompleted: false,
    },
    {
      id: '10',
      name: 'Bring Holly to the vetenerarian',
      isCompleted: false,
    },
  ],
}
const user: User = {
  id: '1',
  name: 'John Doe',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4xIzlTTRJKIQB1tq1Jbs5Rfj7hU6h1UtPg&s',
}

export const App = () => {
  const [allTasks, setAllTasks] = useState(initialAllTasks)
  const [currentTaskListIndex, setCurrentTaskListIndex] = useState(0)
  const [taskLists, setTaskLists] = useState(initialTaskLists)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const taskListId = taskLists[currentTaskListIndex]?.id
    return allTasks[taskListId] ?? []
  })

  const handleTaskListSelect = (taskListIndex: number) => {
    setCurrentTaskListIndex(taskListIndex)
    setTasks(allTasks[taskLists[taskListIndex].id] ?? [])
  }

  /**
   * State management
   */
  const handleCreate = (taskName: string) => {
    const newTask = {
      id: uuid(),
      name: taskName,
      isCompleted: false,
    }

    const newTasks = [...tasks, newTask]
    setTasks(newTasks)
    setAllTasks({
      ...allTasks,
      [taskLists[currentTaskListIndex].id]: newTasks,
    })

    addToListCount(currentTaskListIndex, 1)
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

  const handleUpdate = (taskId: string, taskData: Partial<Task>) => {
    // cloning
    const newTasks = [...tasks]
    const oldTaskIndex = newTasks.findIndex(({ id }) => taskId === id)
    // updating, in an immutable way
    const updatedTask = {
      ...newTasks[oldTaskIndex],
      ...taskData,
    }

    // replacing, in an immutable way
    newTasks[oldTaskIndex] = updatedTask

    setTasks(newTasks)
    setAllTasks({
      ...allTasks,
      [`${currentTaskListIndex + 1}`]: newTasks,
    })

    if (
      taskData.isCompleted !== undefined &&
      taskData.isCompleted !== tasks[oldTaskIndex].isCompleted
    ) {
      addToListCount(currentTaskListIndex, taskData.isCompleted ? -1 : 1)
    }
  }

  const handleDelete = (taskId: string) => {
    // cloning
    const newTasks = [...tasks]
    const oldTaskIndex = newTasks.findIndex(({ id }) => taskId === id)
    // delete, in an immutable way
    newTasks.splice(oldTaskIndex, 1)
    // replacing, in an immutable way
    setTasks(newTasks)
    setAllTasks({
      ...allTasks,
      [taskLists[currentTaskListIndex].id]: newTasks,
    })

    addToListCount(currentTaskListIndex, tasks[oldTaskIndex].isCompleted ? 0 : -1)
  }

  const handleAddTaskList = () => {
    const newTaskList: TaskListType = {
      id: uuid(),
      name: 'New task list',
      undoneCount: 0,
    }
    setTaskLists((currentTaskList) => [...currentTaskList, newTaskList])
    setAllTasks((currentTasks) => ({
      ...currentTasks,
      [newTaskList.id]: [],
    }))
  }

  const handleDeleteList = (listId: string) => {
    const newTaskLists = [...taskLists]
    const listIndex = newTaskLists.findIndex(({ id }) => listId === id)
    newTaskLists.splice(listIndex, 1)

    setTaskLists(newTaskLists)

    const newAllTasks: { [listId: string]: Task[] } = Object.keys(allTasks).reduce(
      (prevAllTasks, key) =>
        key !== listId ? { ...prevAllTasks, [key]: allTasks[key] } : prevAllTasks,
      {},
    )
    setAllTasks(newAllTasks)

    // select new tasks
    if (newTaskLists.length > 0) {
      setCurrentTaskListIndex(0)
      setTasks(newAllTasks[newTaskLists[0].id] ?? [])
    } else {
      setTasks([])
    }
  }

  const handleRenameList = (listId: string, newName: string) => {
    const newTaskLists = [...taskLists]
    const taskListIndex = newTaskLists.findIndex(({ id }) => listId === id)
    const newTaskList: TaskListType = {
      ...newTaskLists[taskListIndex],
      name: newName,
    }

    newTaskLists[taskListIndex] = newTaskList

    setTaskLists(newTaskLists)
  }

  return (
    <section className="container">
      <div className="app">
        <div className="app__sidebar-container">
          <section className="app__sidebar">
            <div className="app__profile">
              <UserProfile user={user} />
            </div>
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
          {taskLists.length === 0 ? (
            <p>No task lists available, please create a list</p>
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
