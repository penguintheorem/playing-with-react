import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { EditableText } from './EditableText'

describe('EditableText', () => {
  test('The default text is used to initialize the input value', () => {
    render(<EditableText defaultText="Default text" onSetText={() => {}} />)

    const input = screen.getByTestId('editable-text-input')

    expect(input).toHaveValue('Default text')
  })

  test('The input is disabled when `isEditable` is false', () => {
    render(<EditableText isEditable={false} onSetText={() => {}} />)

    const input = screen.getByTestId('editable-text-input')

    expect(input).toBeDisabled()
  })

  test('Custom styles are applied to the input', () => {
    render(<EditableText customStyles={{ margin: '1px' }} onSetText={() => {}} />)

    const input = screen.getByTestId('editable-text-input')

    expect(input).toHaveStyle('margin: 1px')
  })

  test('Calls onSetText when the input loses focus with the provided value', () => {
    const onSetText = vi.fn()
    render(<EditableText onSetText={onSetText} />)

    const input = screen.getByTestId('editable-text-input')
    fireEvent.change(input, { target: { value: 'New text' } })
    fireEvent.blur(input)

    expect(onSetText).toHaveBeenCalledWith('New text')
    expect(input).toHaveValue('New text')
  })
})
