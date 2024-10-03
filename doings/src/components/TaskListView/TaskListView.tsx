import { Task, TaskList as TaskListType } from 'src/types'
import { useModal } from 'src/hooks'
import { TaskList } from '../TaskList/TaskList'
import { AddTask } from '../AddTask/AddTask'
import { Trash2 as TrashIcon } from 'react-feather'
import ReactModal from 'react-modal'
import { Modal } from '../Modal/Modal'
import { EditableText } from '../EditableText/EditableText'
import { reactModalStyles } from 'src/styles/reactModalStyles'
import './TaskListView.css'

type Props = {
  list: TaskListType
  tasks: Task[]
  onCreateTask: (taskName: string) => void
  onUpdateTask: (taskId: string, taskData: Partial<Task>) => void
  onDeleteTask: (taskId: string) => void
  onDeleteList: (listId: string) => void
  onRenameList: (listId: string, newName: string) => void
}

export const TaskListView = ({
  list,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onDeleteList,
  onRenameList,
}: Props) => {
  const completedTasks = tasks.filter(({ isCompleted }) => isCompleted === true)
  const uncompletedTasks = tasks.filter(({ isCompleted }) => isCompleted === false)
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <div className="task-list-view">
      <div className="task-list-view__header">
        <div className="task-list-view__title">
          <EditableText
            key={list.id}
            defaultText={list.name}
            isEditable={true}
            onSetText={(newText: string) => onRenameList(list.id, newText)}
            customStyles={{
              paddingLeft: 0,
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          />
        </div>
        <button className="task-list__delete-button" onClick={openModal}>
          <TrashIcon />
        </button>
      </div>
      <ReactModal isOpen={isModalOpen} onRequestClose={closeModal} style={reactModalStyles}>
        <Modal
          text={`Do you really want to cancel the list ${list.name}?`}
          onConfirm={() => {
            onDeleteList(list.id)
            closeModal()
          }}
          onCancel={closeModal}
        />
      </ReactModal>
      {tasks.length ? (
        <>
          <h4 className="task-list-view__heading">Doings</h4>
          <TaskList
            tasks={uncompletedTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
          <h4 className="task-list-view__heading">Completed tasks</h4>
          <TaskList
            tasks={completedTasks}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        </>
      ) : (
        <p>List empty! You can add a new task from the input at the bottom.</p>
      )}
      <div className="task-list-view__add-task">
        <AddTask onAddTask={onCreateTask} />
      </div>
    </div>
  )
}
