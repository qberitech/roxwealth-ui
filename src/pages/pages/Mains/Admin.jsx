import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const appData = localStorage.getItem('appData');
    const data = JSON.parse(appData);
    if (!data) {
      return;
    }
    const userData = data.userData;
    if (!userData) {
      return;
    }
    if (userData.role !== 'admin') {
      navigate('/dashboard/roxwealth');
    }
    setUser(userData);
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
        <strong>Username:</strong> {user?.name}
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
    </div>
  );
};

export default Admin;
