import React from 'react';

const ErrorPopup = ({ message, onClose }) => {
    return (
        <div className={"registration"}>
            <div>
                <span onClick={onClose}><i className="fa fa-times" aria-hidden="true"></i></span>
                <h2>Error</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorPopup;