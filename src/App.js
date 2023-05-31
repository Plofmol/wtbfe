import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '', email: '', countryOfOrigin: '' });

    const [streamingServices, setStreamingServices] = useState([]);
    const [newStreamingService, setNewStreamingService] = useState({ userId: 0, netflix: false, amazonPrime: false, disneyPlus: false, hbo: false });

    useEffect(() => {
        fetchUsers();
        fetchStreamingServices();
    }, []);

    // User Functions

    function fetchUsers() {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
    }

    function createUser(newUser) {
        axios.post('http://localhost:5000/api/users', newUser)
            .then(response => {
                setUsers(prevUsers => [...prevUsers, response.data]);
            })
            .catch(error => console.log(error));
    }

    function updateUser(id, updatedUser) {
        axios.put(`http://localhost:5000/api/users/${id}`, updatedUser)
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
        axios.delete(`http://localhost:5000/api/users/${id}`)
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            })
            .catch(error => console.log(error));
    }

    // Streaming Service Functions

    function fetchStreamingServices() {
        axios.get('http://localhost:5000/api/streamingservices')
            .then(response => setStreamingServices(response.data))
            .catch(error => console.log(error));
    }

    function createStreamingService(newStreamingService) {
        axios.post('http://localhost:5000/api/streamingservices', newStreamingService)
            .then(response => {
                setStreamingServices(prevServices => [...prevServices, response.data]);
            })
            .catch(error => console.log(error));
    }

    function updateStreamingService(id, updatedService) {
        axios.put(`http://localhost:5000/api/streamingservices/${id}`, updatedService)
            .then(response => {
                setStreamingServices(prevServices => {
                    const updatedServices = [...prevServices];
                    const index = updatedServices.findIndex(service => service.id === id);
                    if (index !== -1) {
                        updatedServices[index] = response.data;
                    }
                    return updatedServices;
                });
            })
            .catch(error => console.log(error));
    }

    function deleteStreamingService(id) {
        axios.delete(`http://localhost:5000/api/streamingservices/${id}`)
            .then(() => {
                setStreamingServices(prevServices => prevServices.filter(service => service.id !== id));
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                        <button onClick={() => updateUser(user.id, { name: 'Updated Name' })}>Update</button>
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Create User</h2>
            <form onSubmit={e => {
                e.preventDefault();
                createUser(newUser);
                setNewUser({ name: '', username: '', password: '', email: '', countryOfOrigin: '' });
            }}>
                {/* User input fields */}
            </form>

            <h1>Streaming Services</h1>
            <ul>
                {streamingServices.map(service => (
                    <li key={service.id}>
                        User ID: {service.userId}<br />
                        Netflix: {service.netflix ? 'Yes' : 'No'}<br />
                        Amazon Prime: {service.amazonPrime ? 'Yes' : 'No'}<br />
                        Disney Plus: {service.disneyPlus ? 'Yes' : 'No'}<br />
                        HBO: {service.hbo ? 'Yes' : 'No'}
                        <button onClick={() => updateStreamingService(service.id, { userId: service.userId, netflix: !service.netflix, amazonPrime: service.amazonPrime, disneyPlus: service.disneyPlus, hbo: service.hbo })}>Toggle Netflix</button>
                        <button onClick={() => deleteStreamingService(service.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Create Streaming Service</h2>
            <form onSubmit={e => {
                e.preventDefault();
                createStreamingService(newStreamingService);
                setNewStreamingService({ userId: 0, netflix: false, amazonPrime: false, disneyPlus: false, hbo: false });
            }}>
                {/* Streaming service input fields */}
            </form>
        </div>
    );
}

export default App;
