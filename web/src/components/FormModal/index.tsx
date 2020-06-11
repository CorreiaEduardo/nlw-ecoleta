import React from 'react'
import { FiX } from 'react-icons/fi'
import './styles.css'

interface Props {
  isVisible: boolean;
  title: string;
  handleCloseButtonClicked: () => void;
  onFormSubmit: () => void;
  action: string;
}

const InfoModal: React.FC<Props> = ({ isVisible, title, children, handleCloseButtonClicked, action, onFormSubmit }) => {

  if (!isVisible)
    return null

  return (
    <div id="form-modal">
      <FiX className="closebtn" size={48} onClick={() => handleCloseButtonClicked()}/>
      <div className='overlay-content'>
        <form action={action} onSubmit={onFormSubmit}>
          <h2 className='modal-title'>{title}</h2>
          {children}
        </form>
      </div>
    </div>
  )
}

export default InfoModal;