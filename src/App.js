import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './Users';
import StreamingServices from './StreamingServices';
import MovieList from './OMDB';

function App() {
    return (
        <div>
            <h1>User Management</h1>
            <Users />

            <h1>Streaming Services</h1>
            <StreamingServices />

            <h1>Top 10 Movies</h1>
            <MovieList />
        </div>
    );
}

export default App;