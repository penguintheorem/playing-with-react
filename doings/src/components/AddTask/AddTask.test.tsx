import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { AddTask } from './AddTask'

describe('AddTask', () => {
  test('Skip setting an empty task name', () => {
    const onAddTask = vi.fn()
    render(<AddTask onAddTask={onAddTask} />)

    const input = screen.getByTestId('add-task-input')
    fireEvent.keyUp(input, { key: 'Enter' })

    expect(onAddTask).not.toHaveBeenCalled()
    expect(input).toHaveValue('')
  })

  test('Set the task name and call the callback when pressing Enter (valid task name)', () => {
    const onAddTask = vi.fn()
    render(<AddTask onAddTask={onAddTask} />)

    const input = screen.getByTestId('add-task-input')
    fireEvent.change(input, { target: { value: 'Task name' } })
    fireEvent.keyUp(input, { key: 'Enter' })

    expect(onAddTask).toHaveBeenCalledWith('Task name')
    expect(input).toHaveValue('')
  })
})
