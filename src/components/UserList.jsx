import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'; // Import Modal component
import './UserList.css'; // Import CSS file for styling
import SendMessage from './SendMessage'; // Import SendMessage component

function UserList({ users, messages, setMessages }) {
  // State for managing sorting
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  // State for managing search
  const [searchQuery, setSearchQuery] = useState('');
  // State for selected user messages
  const [selectedUser, setSelectedUser] = useState(null);
  // State for modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to handle sorting
  const handleSort = (key) => {
    if (sortBy === key) {
      // If already sorted by this key, reverse the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If sorting by a new key, set it as the new sort key
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to compare values for sorting
  const compareValues = (key, order = 'asc') => {
    return function (a, b) {
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

  // Function to handle row click
  const handleRowClick = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true); // Open modal
  };

  // Apply sorting and filtering to the user data
  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      typeof value === 'string'
        ? value.toLowerCase().includes(searchQuery.toLowerCase())
        : false,
    ),
  );
  const sortedUsers = sortBy
    ? [...filteredUsers].sort(compareValues(sortBy, sortOrder))
    : filteredUsers;

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '10px' }}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID{' '}
              {sortBy === 'id' &&
                (sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortUp} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} />
                ))}
            </th>
            <th onClick={() => handleSort('wa_id')}>
              WhatsApp ID{' '}
              {sortBy === 'wa_id' &&
                (sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortUp} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} />
                ))}
            </th>
            <th onClick={() => handleSort('display_name')}>
              Display Name{' '}
              {sortBy === 'display_name' &&
                (sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortUp} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} />
                ))}
            </th>
            <th onClick={() => handleSort('display_phone_number')}>
              Display Phone Number{' '}
              {sortBy === 'display_phone_number' &&
                (sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortUp} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} />
                ))}
            </th>
            <th onClick={() => handleSort('phone_number_id')}>
              Phone Number ID{' '}
              {sortBy === 'phone_number_id' &&
                (sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortUp} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} />
                ))}
            </th>
            <th onClick={() => handleSort('created_at')}>
              Created At{' '}
              {sortBy === 'created_at' &&
                (sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faSortUp} />
                ) : (
                  <FontAwesomeIcon icon={faSortDown} />
                ))}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)}>
              <td>{user.id}</td>
              <td>{user.wa_id}</td>
              <td>{user.display_name}</td>
              <td>{user.display_phone_number}</td>
              <td>{user.phone_number_id}</td>
              <td>{user.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="custom-modal-content"
        overlayClassName="custom-modal-overlay">
        {selectedUser && (
          <div className="modal-container">
            <div className="modal-header">
              <h2>{selectedUser?.display_name}'s Messages</h2>
              <button
                className="close-button"
                onClick={() => setModalIsOpen(false)}>
                Close
              </button>
            </div>
            <div className="modal-body">
              <SendMessage activeUserCode={selectedUser} />
              <div className="message-list">
                <table>
                  <tbody>
                    {messages
                      .filter((message) => message.user_id === selectedUser?.id)
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
        )}
      </Modal>
    </div>
  );
}

export default UserList;
