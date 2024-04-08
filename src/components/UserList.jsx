import React, { useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
        { id: 3, name: 'James Doe' },
    ]);
    
    return (
        <div>
        <h1>Users</h1>
        <ul>
            {users.map((user) => (
            <li key={user.id} onClick={(e) => console.log(e.value)}>{user.name}</li>
            ))}
        </ul>
        </div>
    );
    };

export default UserList;
