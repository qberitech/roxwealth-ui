import AuthSimpleLayout from 'layouts/AuthSimpleLayout';
import SignOutForm from 'components/modules/auth/SignOutForm';
import React from 'react';
import { useEffect } from 'react';

const SignOut = () => {
  useEffect(() => {
    // Check if the user is logged in
    const appData = localStorage.getItem('appData');
    // clear appData.session json object
    if (appData) {
      const data = JSON.parse(appData);
      data.session = {};
      localStorage.setItem('appData', JSON.stringify(data));
    }
  }, []);

  return (
    <AuthSimpleLayout logo={false}>
      <SignOutForm layout="simple" />
    </AuthSimpleLayout>
  );
};

export default SignOut;
