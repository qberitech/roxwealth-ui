import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { ColumnDef } from '@tanstack/react-table';

const URL = 'https://engine.qberi.com/api/allUsers/info';
const session = JSON.parse(localStorage.getItem('session') || '{}');
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${session?.sessionToken}`
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: string;
  sharePercentage: number;
};

const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name'
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row: { original } }) => {
      return <>{original.email || 'N/A'}</>;
    },
    meta: {
      headerProps: { style: { width: 200 } }
    }
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile',
    cell: ({ row: { original } }) => {
      return <>{original.mobile || 'N/A'}</>;
    },
    meta: {
      headerProps: { style: { width: 100 } }
    }
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row: { original } }) => {
      return <>{original.role === 'admin' ? 'Admin' : 'User'}</>;
    },
    meta: {
      headerProps: { style: { width: 100 } }
    }
  },
  {
    accessorKey: 'sharePercentage',
    header: 'Share Percentage',
    cell: ({ row: { original } }) => {
      return <>{original.sharePercentage || 0}</>;
    },
    meta: {
      headerProps: { style: { width: 100 } }
    }
  },
  {
    accessorKey: 'netShareValue',
    header: 'Net Share Value (in USD)',
    cell: ({ row: { original } }) => {
      return <>{(original.sharePercentage || 0 / 100) * 100}</>;
    },
    meta: {
      headerProps: { style: { width: 100 } }
    }
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: ({ row: { original } }) => {
      return (
        <Button variant="danger" onClick={() => onClickDelete(original.id)}>
          Delete
        </Button>
      );
    },
    meta: {
      headerProps: { style: { width: 100 } }
    }
  }
];

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
  const [, setTotalPortfolioValue] = useState(0);

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
          console.error('Error:', error);
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

  const table = useAdvanceTable({
    data: allUserData,
    columns: userTableColumns,
    pageSize: 10,
    pagination: true,
    selection: true,
    sortable: true
  });

  return (
    <>
      {/* <Table striped bordered hover>
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
              <Button variant="danger" onClick={() => onClickDelete(user.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody> */}
      {/* </Table> */}
      <AdvanceTableProvider {...table}>
        <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-white border-top border-bottom border-200 position-relative top-1">
          <AdvanceTable tableProps={{ className: 'phoenix-table fs-9' }} />
          <AdvanceTableFooter pagination />
        </div>
      </AdvanceTableProvider>
    </>
  );
};

export default UsersList;
