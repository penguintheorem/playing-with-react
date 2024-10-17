import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Task } from './Task'

describe('Task', () => {
  test('Renders the Task component', async () => {
    render(
      <Task task={{ id: 'task-id', name: 'task-name', isCompleted: false, listId: 'list-id' }} />,
    )

    const task = await screen.findByTestId('task')
    expect(task).toBeInTheDocument()
  })

  test('Renders properly an uncompleted task', async () => {
    render(
      <Task task={{ id: 'task-id', name: 'task-name', isCompleted: false, listId: 'list-id' }} />,
    )

    const task = await screen.findByTestId('task')
    const checkbox = await screen.findByTestId('task-checkbox')

    expect(task).not.toHaveClass('task--is-active')
    expect(checkbox).not.toBeChecked()
  })

  test('Renders properly a completed task', async () => {
    render(
      <Task task={{ id: 'task-id', name: 'task-name', isCompleted: true, listId: 'list-id' }} />,
    )

    const task = await screen.findByTestId('task')
    const checkbox = await screen.findByTestId('task-checkbox')

    expect(task).toHaveClass('task--is-active')
    expect(checkbox).toBeChecked()
  })

  test('Marks the task as completed when pressing on the checkbox', async () => {
    render(
      <Task task={{ id: 'task-id', name: 'task-name', isCompleted: false, listId: 'list-id' }} />,
    )

    const checkbox = await screen.findByTestId('task-checkbox')
    fireEvent.click(checkbox)

    const task = await screen.findByTestId('task')
    expect(task).toHaveClass('task--is-active')
  })
})
