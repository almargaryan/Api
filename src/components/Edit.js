import React, { useState, useEffect } from 'react';

const Edit = ({ show, user, onUpdate, onClose }) => {
    const [data, setData] = useState({
        name: '',
        surname: '',
        avatar: '',
        phone: '',
        country: ''
    });
<<<<<<< HEAD
    const [errors, setErrors] = useState({});
=======
>>>>>>> github/master

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

<<<<<<< HEAD
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size <= 20 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setData(prevData => ({
                        ...prevData,
                        avatar: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                alert("Avatar size must not be more than 20MB.");
            }
=======
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
>>>>>>> github/master
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
<<<<<<< HEAD

        const nameRegex = /^[A-Z][a-z]{0,49}$/;
        const surnameRegex = /^[A-Z][a-z]{0,49}$/;
        const phoneRegex =  /\W{1}[0-9]{1,12}$/;

        let isValid = true;
        const errors = {};

        if (!nameRegex.test(data.name)) {
            errors.name = "Name must start with a capital letter and be less than 50 characters.";
            isValid = false;
        }

        if (!surnameRegex.test(data.surname)) {
            errors.surname = "Surname must start with a capital letter and be less than 50 characters.";
            isValid = false;
        }

        if (!phoneRegex.test(data.phone)) {
            errors.phone = "Phone number must be 10 digits long.";
            isValid = false;
        }

        setErrors(errors);

=======
>>>>>>> github/master
        const updatedUser = {
            ...user,
            ...data
        };
<<<<<<< HEAD

        if (isValid) {
            onUpdate(updatedUser);
            onClose();
        }
    };

    if (!show || !user) {
        return null;
    }

    return (
            <div className={"registration"}>
                <span onClick={onClose}>X</span>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit} className={"registration_form"}>
                    <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange}/>
                    {errors.name && <span className="error">{errors.name}</span>}
                    <input type="text" name="surname" placeholder="Surname" value={data.surname} onChange={handleChange}/>
                    {errors.surname && <span className="error">{errors.surname}</span>}
                    <input type="file" name="avatar" accept="image/png" onChange={handleFileChange}/>
                    <input type="text" name="phone" placeholder="Phone Number" value={data.phone} onChange={handleChange}/>
                    {errors.phone && <span className="error">{errors.phone}</span>}
                    <input type="text" name="country" placeholder="Country" value={data.country} onChange={handleChange}/>
                    <button type="submit">Update</button>
                </form>
            </div>
    );
};

export default Edit;
=======
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
>>>>>>> github/master
