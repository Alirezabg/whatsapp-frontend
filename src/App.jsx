import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserList from './components/UserList';
export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `https://whatsapp-poc-api-function.azurewebsites.net/api/users`,
      { withCredentials: true },
    );
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
      const response = await fetchMessages(activeUserCode.id);
      const messagesData = response.data;
      setMessages(messagesData);
    };

    fetchMessagesData();
  }, [messages.length, activeUserCode]);

  return (
    <div>
      <Router>
        <Navbar />
        <main className="main-content">
          <div className="container">
            <div>
              <UserList
                users={users}
                messages={messages}
                setMessages={setMessages}
              />
            </div>
          </div>
        </main>
      </Router>
      <footer className="footer">
        <p>&copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
