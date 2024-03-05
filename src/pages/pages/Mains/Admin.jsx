import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const admins = [
  'nitish2@qberi.com',
  'rohan2@qberi.com',
  'pranab@qberi.com',
  'jaco@qberi.com'
];

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    console.log(profile);
    if (profile) {
      setUser(profile);
      if (profile.role !== 'admin' && !admins.includes(profile.email)) {
        navigate('/dashboard/roxwealth');
      }
    }

    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      navigate('/auth/sign-in');
    }

    const sessionToken = session?.sessionToken;

    const URL = 'https://engine.qberi.com/api/allUsers/info';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken}`
    };

    axios.get(URL, { headers: headers }).then(response => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);
  return (
    <div>
      <h1>Admin</h1>
      <p>
        This is the Admin page. You can only see this if you're logged in as an
        admin.
      </p>
      <h2>User Data</h2>
      <p>
        <strong>Username:</strong> {user?.firstName} {user?.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.role}
      </p>
      <p>
        <strong>Mobile:</strong> {user?.mobile}
      </p>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.firstName} {user.lastName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
