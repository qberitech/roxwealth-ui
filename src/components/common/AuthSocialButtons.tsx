// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Button from 'components/base/Button';
// import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
const AuthSocialButtons = ({ title }: { title: string }) => {
  const onGoogleSuccess = (response: any) => {
    const credential = response.credential;
    console.log(credential);
    console.log(title);
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
