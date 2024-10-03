import ReactModal from 'react-modal'

export const reactModalStyles: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    overflow: 'auto',
    width: '600px',
    outline: 'none',
    maxHeight: '200px',
  },
}
