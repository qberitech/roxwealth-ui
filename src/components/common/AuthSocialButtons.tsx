// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from 'components/base/Button';
// import React from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
const AuthSocialButtons = ({ title }: { title: string }) => {
  const onGoogleSuccess = (response: any) => {
    const credential = response.credential;
    console.log(credential);
    const URL = 'https://engine.qberi.com/api/googleLogin';
    const data = {
      id: credential
    };
    axios
      .post(URL, data)
      .then(response => {
        console.log('Google login response: in', title, response);
      })
      .catch(error => {
        console.error('Error fetching profile data: ', error);
      });
  };

  return (
    <>
      {/* <Button
        variant="phoenix-secondary"
        className="w-100 mb-3"
        startIcon={
          <FontAwesomeIcon icon={faGoogle} className="text-danger me-2 fs-9" />
        }
      >
        {title} with google
      </Button> */}
      <GoogleLogin
        theme="filled_blue"
        onSuccess={onGoogleSuccess}
        onError={() => console.log('Login Failed')}
        size="large"
        text="continue_with"
      />
      {/* <Button
        variant="phoenix-secondary"
        className="w-100"
        startIcon={
          <FontAwesomeIcon
            icon={faFacebook}
            className="text-primary me-2 fs-9"
          />
        }
      >
        {title} with facebook
      </Button> */}
    </>
  );
};

export default AuthSocialButtons;
