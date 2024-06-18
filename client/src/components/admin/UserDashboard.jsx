import React, { useEffect, useState } from 'react';
import { GetUser, DeleteUser } from '../function/User';
import './Dashboard.scss';

export const UserDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await GetUser();
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      await DeleteUser(userId);
      setUserData(userData.filter(user => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleSave = async () => {
    // Add logic to save the edited user details
    setIsEditing(false);
    setCurrentUser(null);
  };

  return (
    <>
      <div className='dashboard-table'>
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobilenumber</th>
              <th>isAdmin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData && userData.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobilenumber}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td className='action-button'>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          isEditing && currentUser && (
            <div className='user-edit'>
              <div>
                <label>isUseradmin</label>
                <select value={currentUser.isAdmin ? 'Yes' : 'No'}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};
