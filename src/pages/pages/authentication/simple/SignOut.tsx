import AuthSimpleLayout from 'layouts/AuthSimpleLayout';
import SignOutForm from 'components/modules/auth/SignOutForm';
import React from 'react';
import { useEffect } from 'react';

const SignOut = () => {
  useEffect(() => {
    // Check if the user is logged in
    localStorage.removeItem('session');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('profile');
  }, []);

  return (
    <AuthSimpleLayout logo={false}>
      <SignOutForm layout="simple" />
    </AuthSimpleLayout>
  );
};

export default SignOut;
