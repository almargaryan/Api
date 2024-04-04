import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './components/UserTable';
import Registration from './components/Registration';
import Edit from './components/Edit';
import Loading from './components/Loading';
import Error from './components/Error';
import ReactPaginate from 'react-paginate';
import Chart from './components/Chart';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [sort, search]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://almargaryan.github.io/Api/src/data/data.json');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleRegistration = (data) => {
        try {
            setLoading(true);
            const newId = users.length + 1;
            const newUser = { id: newId, ...data };
            setUsers(prevUsers => [...prevUsers, newUser]);
            setLoading(false);
            setCurrentPage(Math.ceil((users.length + 1) / itemsPerPage) - 1);
        } catch (error) {
            setError("Failed to register user");
        }
    };

    const handleEdit = (user) => {
        try {
            console.log("Editing user:", user);
            setShowEdit(true);
            setSelectedUser(user);
        } catch (error) {
            setError("Failed to edit user");
        }
    };

    const handleUpdate = (updatedUserData) => {
        try {
            console.log("Updated user data:", updatedUserData);
            setUsers(users.map(user => (user.id === updatedUserData.id ? updatedUserData : user)));
            setShowEdit(false);
        } catch (error) {
            setError("Failed to update user");
        }
    };


    const handleSearch = (event) => {
        try {
            setLoading(true);
            setSearch(event.target.value);
            setLoading(false);
        } catch (error) {
            setError("Failed to search user");
        }
    };

    const handleSort = (key) => {
        try {
            setLoading(true);
            let direction = 'asc';
            if (sort.key === key && sort.direction === 'asc') {
                direction = 'desc';
            }
            setSort({ key, direction });
            setLoading(false);
        } catch (error) {
            setError("Failed to search user");
        }
    };

    const sortedUsers = users.slice().sort((a, b) => {
        if (sort.key === 'id') {
            return sort.direction === 'asc' ? a.id - b.id : b.id - a.id;
        } else if (sort.key === 'name') {
            return sort.direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
    });

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.surname.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase()) ||
        user.country.toLowerCase().includes(search.toLowerCase())
    );

    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredUsers.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className={"app"}>
            <h1>
                Users List
                <button onClick={() => setShowRegistration(true)}>Add User <i className="fa fa-plus" aria-hidden="true"></i></button>
            </h1>
            <Chart users={users} />
            <form className={"search"} onSubmit={(e) => { e.preventDefault(); }}>
                <input
                    type="text"
                    placeholder="Search Users"
                    value={search}
                    onChange={handleSearch}
                />
                <button type="button" onClick={() => setCurrentPage(0)}>Search</button>
            </form>
            <UserTable
                users={currentPageData}
                onEditUser={handleEdit}
                onSort={handleSort}
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
            {error && <Error message={error} onClose={() => setError(null)} />}
            <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                className={"pages"}
            />
        </div>
    );
}

export default App;
