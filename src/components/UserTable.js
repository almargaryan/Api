import React from 'react';

const UserTable = ({ users, onEditUser, onSort }) => {
    return (
        <div className={"table"}>
            <div className={"buts_table"}>
                <button onClick={() => onSort('id')} style={{width:"65px", height:"35px" ,border:"2px solid #201734"}}>
                    Sort by ID
                </button>
                <button onClick={() => onSort('name')} style={{width:"140px",height:"35px", border:"2px solid #201734"}}>
                    Sort by Name
                </button>
            </div>
            <table border={"1px solid #201734"}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Avatar</th>
                    <th>Phone Number</th>
                    <th>Country</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td><img src={user.avatar} width={"124px"} height={"124px"} alt="avatar" /></td>
                        <td>{user.phone}</td>
                        <td>{user.country}</td>
                        <td>
                            <button onClick={() => onEditUser(user)} style={{margin:"auto"}}>Edit</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
