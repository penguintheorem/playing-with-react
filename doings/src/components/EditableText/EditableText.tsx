import React, { useState } from 'react'

type Props = {
  defaultText?: string
  customStyles?: React.CSSProperties
  isEditable?: boolean
  onSetText: (text: string) => void
}

export const EditableText = ({
  defaultText = '',
  customStyles = {},
  isEditable = true,
  onSetText,
}: Props) => {
  const [text, setText] = useState(defaultText)

  return (
    <input
      disabled={!isEditable}
      type="text"
      value={text}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
      onBlur={() => onSetText(text)}
      style={customStyles}
    />
  )
}
