import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StreamingServices() {
    const [streamingServices, setStreamingServices] = useState([]);
    const [newStreamingService, setNewStreamingService] = useState({ userId: 0, netflix: false, amazonPrime: false, disneyPlus: false, hbo: false });

    useEffect(() => {
        fetchStreamingServices();
    }, []);

    function fetchStreamingServices() {
        axios.get('http://localhost:5054/api/streamingservices')
            .then(response => setStreamingServices(response.data))
            .catch(error => console.log(error));
    }

    function createStreamingService(newService) {
        axios.post('http://localhost:5054/api/streamingservices', newService)
            .then(response => {
                setStreamingServices(prevServices => [...prevServices, response.data]);
            })
            .catch(error => console.log(error));
    }

    function updateStreamingService(id, updatedService) {
        axios.put(`http://localhost:5054/api/streamingservices/${id}`, updatedService)
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
        axios.delete(`http://localhost:5054/api/streamingservices/${id}`)
            .then(() => {
                setStreamingServices(prevServices => prevServices.filter(service => service.id !== id));
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h2>Streaming Services</h2>
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

            <h3>Create Streaming Service</h3>
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

export default StreamingServices;
