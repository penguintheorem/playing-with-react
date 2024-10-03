import './Modal.css'

type Props = {
  text: string
  onConfirm: () => void
  onCancel?: () => void
}

export const Modal = ({ text, onConfirm, onCancel }: Props) => {
  return (
    <div className="modal">
      <div>{text}</div>
      <div className="modal__actions">
        <button className="modal__button modal__button--is-danger" onClick={onConfirm}>
          Confirm
        </button>
        {onCancel && (
          <button className="modal__button modal__button--is-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
