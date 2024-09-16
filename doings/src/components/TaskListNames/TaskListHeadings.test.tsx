import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { TaskListHeadings } from './TaskListHeadings'

/**
 * TODO: Can we write over tests over here?
 * TODO: Are the components well thought?
 * TODO: fix these
 */
describe('TaskListNames', () => {
  test('Properly renders the TaskListNames component', async () => {
    render(
      <TaskListHeadings
        taskLists={[
          { id: '1', name: 'Home', undoneCount: 1 },
          { id: '2', name: 'Groceries', undoneCount: 2 },
          { id: '3', name: 'Work', undoneCount: 3 },
        ]}
      />,
    )

    const taskListNames = await screen.findByTestId('task-list-names')

    expect(taskListNames).toBeInTheDocument()
  })

  test('Renders the ccorrect number of TaskListItem components', async () => {
    render(
      <TaskListHeadings
        taskLists={[
          { id: '1', name: 'Home', undoneCount: 1 },
          { id: '2', name: 'Groceries', undoneCount: 2 },
          { id: '3', name: 'Work', undoneCount: 3 },
        ]}
      />,
    )

    const taskListItems = await screen.findAllByTestId('task-list-item-container')

    expect(taskListItems).toHaveLength(3)
  })
})
