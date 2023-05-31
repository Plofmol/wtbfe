import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '', email: '', countryOfOrigin: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        axios.get('http://localhost:5054/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
    }

    function createUser(newUser) {
        axios.post('http://localhost:5054/api/users', newUser)
            .then(response => {
                setUsers(prevUsers => [...prevUsers, response.data]);
            })
            .catch(error => console.log(error));
    }

    function updateUser(id, updatedUser) {
        axios.put(`http://localhost:5054/api/users/${id}`, updatedUser)
            .then(response => {
                setUsers(prevUsers => {
                    const updatedUsers = [...prevUsers];
                    const index = updatedUsers.findIndex(user => user.id === id);
                    if (index !== -1) {
                        updatedUsers[index] = response.data;
                    }
                    return updatedUsers;
                });
            })
            .catch(error => console.log(error));
    }

    function deleteUser(id) {
        axios.delete(`http://localhost:5054/api/users/${id}`)
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        ID: {user.id}<br />
                        Name: {user.name}<br />
                        Username: {user.username}<br />
                        Email: {user.email}<br />
                        Country of Origin: {user.countryOfOrigin}
                        <button onClick={() => updateUser(user.id, { name: 'Updated Name' })}>Update</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h3>Create User</h3>
            <form onSubmit={e => {
                e.preventDefault();
                createUser(newUser);
                setNewUser({ name: '', username: '', password: '', email: '', countryOfOrigin: '' });
            }}>
                {/* User input fields */}
            </form>
        </div>
    );
}

export default Users;
