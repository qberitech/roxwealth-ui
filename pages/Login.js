import React, { useState } from 'react';
import Modal from 'react-modal';

const Login = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here, for now, let's just print the username and close the modal
    console.log(`Logging in as ${username}`);
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Login</button>
      <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Login Popup"
      className="login-popup"
      overlayClassName="modal-overlay"
    >
      <div className="form-container">
        <h2>Login</h2>
        <label className="form-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </label>
        <button type="button" onClick={handleLogin} className="form-button">
          Login
        </button>
        <button type="button" onClick={closeModal} className="form-button">
          Close
        </button>
      </div>
    </Modal>
    </div>
  );
};

export default Login;
