import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import UserList from './components/UserList';
import { useEffect, useState } from 'react';
import cors from 'cors';

function App() {
  const [activeUserCode, setActiveUserCode] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://whatsapp-poc-api-function.azurewebsites.net/api/users', {
      mode: 'no-cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data);
        setUsers(data.id);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/news" element={<About />} />
            {/* Define other routes that you need*/}
          </Routes>
        </main>
        <div>
          <h1>Users</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id} onClick={(e) => setActiveUserCode(user.id)}>
                {user.display_name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Active User</h1>
          <p>{activeUserCode}</p>
        </div>
      </Router>
      <footer className="footer">
        <p>&copy; 2024</p>
      </footer>
    </>
  );
}

export default App;
