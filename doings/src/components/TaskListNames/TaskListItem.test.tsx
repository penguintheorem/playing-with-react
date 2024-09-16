import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { TaskListItem } from './TaskListItem'

describe('TaskListItem', () => {
  test('Properly renders the TaskListItem component', async () => {
    render(
      <TaskListItem
        taskListName="Task list 1"
        isActive={false}
        undoneCount={1}
        onSelect={() => {}}
      />,
    )
    const taskListItem = await screen.findByTestId('task-list-item')
    expect(taskListItem).toBeInTheDocument()
  })

  test('Applies an "is-active" modifier class when isActive is true', async () => {
    render(
      <TaskListItem
        taskListName="Task list 1"
        isActive={true}
        undoneCount={1}
        onSelect={() => {}}
      />,
    )
    const taskListItem = await screen.findByTestId('task-list-item')
    expect(taskListItem).toHaveClass('task-list-item--is-active')
  })

  test('Does not apply an "is-active" modifier class when isActive is false', async () => {
    render(
      <TaskListItem
        taskListName="Task list 1"
        isActive={false}
        undoneCount={1}
        onSelect={() => {}}
      />,
    )
    const taskListItem = await screen.findByTestId('task-list-item')
    expect(taskListItem).not.toHaveClass('task-list-item--is-active')
  })

  test('Calls onSelect when the button is clicked', async () => {
    const onSelect = vi.fn()
    render(
      <TaskListItem
        taskListName="Task list 1"
        isActive={true}
        undoneCount={1}
        onSelect={onSelect}
      />,
    )
    const taskListItemButton = await screen.findByTestId('task-list-item-button')
    taskListItemButton.click()
    expect(onSelect).toHaveBeenCalled()
  })

  test('Displays the task list undone count', async () => {
    render(
      <TaskListItem
        taskListName="Task list 1"
        isActive={false}
        undoneCount={3}
        onSelect={() => {}}
      />,
    )

    const taskListUndoneCount = await screen.findByTestId('task-list-item-undone-count')

    expect(taskListUndoneCount).toHaveTextContent('3')
  })
})
