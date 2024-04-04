import React, {useState} from 'react';
import ReactPaginate from "react-paginate";

const UserTable = ({ users, onEditUser }) => {

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(users.length / 5);
    const startIndex = currentPage * 5;
    const endIndex = Math.min(startIndex + 5, users.length);
    const currentUsers = users.slice(startIndex, endIndex);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    if (!users || users.length === 0) {
        return <div>No users found</div>;
    }

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Avatar</th>
                    <th>Phone Number</th>
                    <th>Country</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {currentUsers.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td><img src={user.avatar} width={"124px"} height={"124px"}/></td>
                        <td>{user.phone}</td>
                        <td>{user.country}</td>
                        <td>
                            <button onClick={() => onEditUser(user)}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UserTable;