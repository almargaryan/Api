import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import Registration from './components/Registration';
import Edit from './components/Edit';
import Loading from './components/Loading';
import Error from './components/Error';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.surname.toLowerCase().includes(search.toLowerCase()) ||
                user.phone.toLowerCase().includes(search.toLowerCase()) ||
                user.country.toLowerCase().includes(search.toLowerCase())
            ));
        }
    }, [search, users]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://almargaryan.github.io/Json/data.json');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleRegistration = (formData) => {
        const newId = users.length + 1;
        const newUser = { id: newId, ...formData };
        setUsers(prevUsers => [...prevUsers, newUser]);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEdit(true);
    };

    const handleUpdate = (updatedUserData) => {
        setUsers(users.map(user => (user.id === updatedUserData.id ? updatedUserData : user)));
        setShowEdit(false);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleCloseErrorPopup = () => {
        setError(null);
    };

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <input
                    type="text"
                    placeholder="Search by name or surname"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="button">Search</button>
            </form>
            <button onClick={() => setShowRegistration(true)}>Add User</button>
            <UserTable
                users={filteredUsers}
                onEditUser={handleEdit}
            />
            <Registration
                show={showRegistration}
                onClose={() => setShowRegistration(false)}
                onSubmit={handleRegistration}
            />
            <Edit
                show={showEdit}
                onClose={() => setShowEdit(false)}
                user={selectedUser}
                onUpdate={handleUpdate}
            />
            <Loading loading={loading} />
            {error && <Error message={error} onClose={handleCloseErrorPopup} />}
        </div>
    );
}

export default App;
