import React, { useState } from 'react';

const Registration = ({ show, onClose, onSubmit }) => {
    const [data, setData] = useState({
        name: '',
        surname: '',
        avatar: '',
        phone: '',
        country: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setData(prevData => ({
                ...prevData,
                avatar: reader.result
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(data);
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div>
            <div>
                <span onClick={onClose}>X</span>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange}/>
                    <input type="text" name="surname" placeholder="Surname" value={data.surname} onChange={handleChange}/>
                    <input type="file" name="avatar" accept="image/png" onChange={handleFileChange}/>
                    <input type="text" name="phone" placeholder="Phone Number" value={data.phone} onChange={handleChange}/>
                    <input type="text" name="country" placeholder="Country" value={data.country} onChange={handleChange}/>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
