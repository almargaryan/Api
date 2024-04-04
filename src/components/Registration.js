import React, { useState } from 'react';

const Registration = ({ show, onClose, onSubmit }) => {
    const [data, setData] = useState({
        name: '',
        surname: '',
        avatar: '',
        phone: '',
        country: ''
    });
    const [errors, setErrors] = useState({});

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
                    setData(prevState => ({
                        ...prevState,
                        avatar: reader.result
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                alert("Avatar size must not be more than 20MB.");
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nameRegex = /^[A-Z][a-z]{0,49}$/;
        const surnameRegex = /^[A-Z][a-z]{0,49}$/;
        const phoneRegex = /^\d{10}$/;

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

        if (isValid) {
            onSubmit(data);
            onClose();
        }
    };

    if (!show) {
        return null;
    }

    return (
            <div className={"registration"}>
                <span onClick={onClose} ><i className="fa fa-times" aria-hidden="true"></i></span>
                <h2>Registration</h2>
                <form onSubmit={handleSubmit} className={"registration_form"}>
                    <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange}/>
                    {errors.name && <span>{errors.name}</span>}
                    <input type="text" name="surname" placeholder="Surname" value={data.surname} onChange={handleChange}/>
                    {errors.surname && <span>{errors.surname}</span>}
                    <input type="file" name="avatar" accept="image/png" onChange={handleFileChange}/>
                    <input type="text" name="phone" placeholder="Phone Number" value={data.phone} onChange={handleChange}/>
                    {errors.phone && <span>{errors.phone}</span>}
                    <input type="text" name="country" placeholder="Country" value={data.country} onChange={handleChange}/>
                    <button type="submit">Register</button>
                </form>
            </div>
    );
};

export default Registration;