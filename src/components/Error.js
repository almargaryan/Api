import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <div>
            <div>
                <span onClick={onClose}>X</span >
                <h2>Error</h2>
                <p>{message}</p>
            </div >
        </div >
    );
};

export default ErrorPopup;