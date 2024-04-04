import React, { useState, useEffect } from 'react';

const Edit = ({ show, user, onUpdate, onClose }) => {
    const [data, setData] = useState({
        name: '',
        surname: '',
        avatar: '',
        phone: '',
        country: ''
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                surname: user.surname || '',
                avatar: user.avatar || '',
                phone: user.phone || '',
                country: user.country || ''
            });
        }
    }, [user]);

    if (!show || !user) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'avatar' && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setData(prevData => ({
                    ...prevData,
                    avatar: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = {
            ...user,
            ...data
        };
        onUpdate(updatedUser);
        onClose();
    };

    return (
        <div>
            <div>
                <span onClick={onClose}>X</span>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={data.name} onChange={handleChange} />
                    <input type="text" name="surname" value={data.surname} onChange={handleChange} />
                    <input type="file" name="avatar" accept="image/png" onChange={handleChange} />
                    <input type="text" name="phoneNumber" value={data.phone} onChange={handleChange} />
                    <input type="text" name="country" value={data.country} onChange={handleChange} />
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
