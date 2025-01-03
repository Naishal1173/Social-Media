import React from 'react';
import './Modal.css'; // Assuming you have some CSS for styling the modal

const Modal = ({ onClose, children }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
