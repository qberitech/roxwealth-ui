import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const admins = [
  'nitish2@qberi.com',
  'rohan2@qberi.com',
  'pranab@qberi.com',
  'jaco@qberi.com'
];

const getUsers = () => {
  const session = JSON.parse(localStorage.getItem('session'));
  const sessionToken = session?.sessionToken;

  const URL = 'https://engine.qberi.com/api/allUsers/info';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionToken}`
  };

  axios.get(URL, { headers: headers }).then(response => {
    console.log(response.data);
    return response.data;
  });
};

const Admin = () => {
  const [, setUser] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalNetWorth, setTotalNetWorth] = useState(0);

  const usersData = useMemo(() => getUsers(), []);

  const deleteUsers = id => {
    console.log(id);
  };

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

    const URL2 =
      'https://engine.qberi.com/api/totalPortfolioValue/portfolioValue';
    axios.get(URL2, { headers: headers }).then(response => {
      console.log(response.data);
      setTotalNetWorth(response.data.amountInUsd);
    });
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <p>
        This is the Admin page. You can only see this if you're logged in as an
        admin.
      </p>
      <h2>All Users</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Share Percentage</th>
            <th>Net Share Value (in USD)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.role === 'admin' ? 'Admin' : 'User'}</td>
              <td>{user.sharePercentage || 0}</td>
              <td>
                {user.sharePercentage
                  ? (user.sharePercentage * totalNetWorth) / 100
                  : 0}
              </td>
              {/* Delete Button */}
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteUsers(user._id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Net Worth</h2>
      <p>
        <strong>Total Net Worth:</strong> {totalNetWorth}
      </p>
    </div>
  );
};

export default Admin;
