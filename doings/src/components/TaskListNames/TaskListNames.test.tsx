import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { TaskListNames } from './TaskListNames'

/**
 * TODO: Can we write over tests over here?
 * TODO: Are the components well thought?
 */
describe('TaskListNames', () => {
  test('Properly renders the TaskListNames component', async () => {
    render(<TaskListNames taskNames={['Task 1', 'Task 2', 'Task 3']} />)

    const taskListNames = await screen.findByTestId('task-list-names')

    expect(taskListNames).toBeInTheDocument()
  })

  test('Renders the ccorrect number of TaskListItem components', async () => {
    render(<TaskListNames taskNames={['Task 1', 'Task 2', 'Task 3']} />)

    const taskListItems = await screen.findAllByTestId('task-list-item-container')

    expect(taskListItems).toHaveLength(3)
  })
})
