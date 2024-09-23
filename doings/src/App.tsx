import { useState } from 'react'
import { TaskListHeadings } from './components/TaskListNames/TaskListHeadings'
import { TaskListView } from './components/TaskListView/TaskListView'
import { UserProfile } from './components/UserProfile/UserProfile'
import { Task, TaskList as TaskListType, User } from './types'
import { v4 as uuid } from 'uuid'
import './App.css'

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
    console.log(`App#addToListCount invoked with listIndex: ${listIndex} and count: ${count}`)

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
    console.log(
      `App#handleUpdate invoked with taskId: ${taskId} and taskData: ${JSON.stringify(taskData)}`,
    )

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

    addToListCount(currentTaskListIndex, newTasks[oldTaskIndex].isCompleted ? 0 : -1)
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
              <TaskListHeadings
                taskLists={taskLists}
                activeTaskListIndex={currentTaskListIndex}
                onTaskListSelect={handleTaskListSelect}
              />
            </div>
          </section>
        </div>
        <div className="app__task-list">
          <TaskListView
            tasks={tasks}
            onCreateTask={handleCreate}
            onUpdateTask={handleUpdate}
            onDeleteTask={handleDelete}
          />
        </div>
      </div>
    </section>
  )
}
