import React from 'react';

const Modal = ({ isOpen, onClose, title, message, onConfirm, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
         {message}
        </div>
        <div className="modal-footer">
          <button className="modal-btn cancel-btn" onClick={onClose}>
            {cancelText || 'Cancel'}
          </button>
          <button className="modal-btn confirm-btn" onClick={onConfirm}>
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
