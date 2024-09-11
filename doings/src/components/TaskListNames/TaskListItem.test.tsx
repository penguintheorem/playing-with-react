import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { TaskListItem } from './TaskListItem'

describe('TaskListItem', () => {
  test('Properly renders the TaskListItem component', async () => {
    render(<TaskListItem taskName="Task 1" isActive={false} onSelect={() => {}} />)

    const taskListItem = await screen.findByTestId('task-list-item')

    expect(taskListItem).toBeInTheDocument()
  })

  test('Applies an "is-active" modifier class when isActive is true', async () => {
    render(<TaskListItem taskName="Task 1" isActive={true} onSelect={() => {}} />)

    const taskListItem = await screen.findByTestId('task-list-item')

    expect(taskListItem).toHaveClass('task-list-item--is-active')
  })

  test('Does not apply an "is-active" modifier class when isActive is false', async () => {
    render(<TaskListItem taskName="Task 1" isActive={false} onSelect={() => {}} />)

    const taskListItem = await screen.findByTestId('task-list-item')

    expect(taskListItem).not.toHaveClass('task-list-item--is-active')
  })

  test('Calls onSelect when the button is clicked', async () => {
    const onSelect = vi.fn()
    render(<TaskListItem taskName="Task 1" isActive={true} onSelect={onSelect} />)

    const taskListItemButton = await screen.findByTestId('task-list-item-button')
    taskListItemButton.click()

    expect(onSelect).toHaveBeenCalled()
  })
})
