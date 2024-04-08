import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserList from './components/UserList';
import axios from 'axios';
import { useEffect, useState } from 'react';
export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `https://whatsapp-poc-api-function.azurewebsites.net/api/users`,
      { withCredentials: true },
    );
    console.log('response', response);
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const fetchMessages = async (userId) => {
  try {
    const response = await axios.get(
      `https://whatsapp-poc-api-function.azurewebsites.net/api/Messages?UserId=${userId}`,
      { withCredentials: true },
    );
    console.log('response', response);
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error('Error fetching users:', error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await fetchUsers();
    return response.data;
  } catch (error) {
    // Handle error...
    console.error('Error fetching users:', error);
    return [];
  }
};

function App() {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeUserCode, setActiveUserCode] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchUsersData();
  }, []);
  useEffect(() => {
    const fetchMessagesData = async () => {
      const response = await fetchMessages(activeUserCode);
      const messagesData = response.data;
      setMessages(messagesData);
      console.log('messagesData', messagesData);
    };

    fetchMessagesData();
  }, []);
  const handleSort = (key) => {
    if (sortBy === key) {
      // If already sorted by the same key, toggle the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a different key, set the new key and default to ascending order
      setSortBy(key);
      setSortOrder('asc');
    }
  };
  const compareValues = (key, order = 'asc') => {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // Property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  };
  return (
    <>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* <Route path="/" element={<About />} />
            <Route path="/news" element={<About />} /> */}
            {/* Define other routes that you need*/}
          </Routes>
          <div className="container">
            <div className="left">
              <div>
                <h1>Users</h1>
                <ul>
                  {users.map((user) => (
                    <li
                      key={user.id}
                      onClick={(e) => setActiveUserCode(user.id)}>
                      {user.display_name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right">
              <div>
                <h1>Active User</h1>
                <h2>active user : {activeUserCode}</h2>
                <table>
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('timestamp')}>
                        Timestamp{' '}
                        {sortBy === 'timestamp' &&
                          (sortOrder === 'asc' ? '▲' : '▼')}
                      </th>
                      <th onClick={() => handleSort('message_body')}>
                        Message{' '}
                        {sortBy === 'message_body' &&
                          (sortOrder === 'asc' ? '▲' : '▼')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages
                      .filter((message) => message.user_id === activeUserCode)
                      .sort(compareValues(sortBy, sortOrder))
                      .map((message) => (
                        <tr key={message.id}>
                          <td>
                            {new Date(message.timestamp).toLocaleString()}
                          </td>
                          <td>{message.message_body}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </Router>
      <footer className="footer">
        <p>&copy; 2024</p>
      </footer>
    </>
  );
}

export default App;
