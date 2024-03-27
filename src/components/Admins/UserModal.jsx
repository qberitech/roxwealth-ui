import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

ViewModal.propTypes = {
  user: PropTypes.object.isRequired
};

const ViewModal = ({ user }) => {
  const roles = user.roles || {};
  const hospitalMerchRoles = roles.HospitalMerch || [];
  const Qberi = roles.Qberi || [];
  const hroles = hospitalMerchRoles.join(', ');
  const qroles = Qberi.join(', ');
  return (
    <Modal.Body>
      <p>
        <strong>Name:</strong> {user.firstName + ' ' + user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.mobile}
      </p>
      <p>
        <strong>Share Percentage: </strong>
        {user.sharePercentage || 0}
      </p>
      <p>
        <strong>Hospital Merch Roles: </strong>
        {hroles}
      </p>
      <p>
        <strong>Qberi Roles: {''}</strong>
        {qroles}
      </p>
    </Modal.Body>
  );
};

// validate the props
UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired
};

const UserModal = ({ isOpen, handleClose, user, canEdit }) => {
  const roles = user.roles || {};
  const hospitalMerchRoles = roles.HospitalMerch || [];
  const QberiRoles = roles.Qberi || [];
  const [UserData, setUserData] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    let hRoles = UserData.hospitalMerchRoles || hospitalMerchRoles.join(', ');
    let qberiRoles = UserData.qberiRoles || QberiRoles.join(', ');
    hRoles = hRoles.split(',').map(role => role.trim());
    qberiRoles = qberiRoles.split(',').map(role => role.trim());
    const updatedUser = {
      ...UserData,
      userId: user.id,
      roles: {
        HospitalMerch: hRoles,
        Qberi: qberiRoles
      }
    };

    const URL = `https://engine.qberi.com/api/editUser`;
    const session = JSON.parse(localStorage.getItem('session')) || {};
    const token = session.sessionToken || '';

    if (!window.confirm('Are you sure you want to update this user?')) return;
    console.log(updatedUser);

    axios
      .post(URL, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        console.log(res);
        handleClose();
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{canEdit ? 'Edit' : 'View'} User Information</Modal.Title>
      </Modal.Header>
      {canEdit ? (
        <>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.firstName + ' ' + user.lastName}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={user.phone}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Share Percentage</Form.Label>
                <Form.Control
                  type="number"
                  name="sharePercentage"
                  value={user.sharePercentage}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Hospital Merch Roles</Form.Label>
                <Form.Control
                  type="text"
                  name="hospitalMerchRoles"
                  defaultValue={hospitalMerchRoles.join(', ')}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Qberi Roles</Form.Label>
                <Form.Control
                  type="text"
                  name="qberiRoles"
                  defaultValue={QberiRoles.join(', ')}
                  onChange={onChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <ViewModal user={user} />
      )}
    </Modal>
  );
};

export default UserModal;
