import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
// import AdvanceTableProvider from "providers/AdvanceTableProvider";
// import AdvanceTable from "components/base/AdvanceTable";

const URL = 'https://engine.qberi.com/api/allUsers/info';
const session = JSON.parse(localStorage.getItem('session') || '{}');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${session?.sessionToken}`
};

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  sharePercentage: number;
}

const DeleteUser = (id: string) => {
  const session = JSON.parse(localStorage.getItem('session') || '{}');
  const sessionToken = session?.sessionToken;

  const URL = `https://engine.qberi.com/api/deleteUser/${id}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionToken}`
  };

  axios.delete(URL, { headers: headers }).then(response => {
    console.log(response.data);
  });
};

const onClickDelete = (id: string) => {
  console.log('Delete', id);

  // Make a prompt to confirm the delete
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this user?'
  );
  if (confirmDelete) {
    DeleteUser(id);
    window.location.reload();
  }
};

const UsersList = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  const fetchTotalPortfolioValue = useCallback(() => {
    axios
      .get('https://engine.qberi.com/api/totalPortfolioValue/portfolioValue', {
        headers: headers
      })
      .then(response => {
        setTotalPortfolioValue(response.data.amountInUsd);
        // console.log('Response:', response.data.amountInUsd);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          window.location.href = '/auth/sign-out';
        } else {
          console.error('Error:', error);
        }
      });
  }, []);

  const fetchData = useCallback(() => {
    axios
      .get(URL, { headers: headers })
      .then(response => {
        setAllUserData(response.data);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
    fetchTotalPortfolioValue();
  }, [fetchData]);

  return (
    <Table striped bordered hover>
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
        {allUserData.map((user: User, index: number) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
            <td>{user.role === 'admin' ? 'Admin' : 'User'}</td>
            <td>{user.sharePercentage || 0}</td>
            <td>{(user.sharePercentage || 0 / 100) * totalPortfolioValue}</td>
            <td>
              {/* <Button variant="primary">Edit</Button> */}
              <Button variant="danger" onClick={() => onClickDelete(user.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersList;
