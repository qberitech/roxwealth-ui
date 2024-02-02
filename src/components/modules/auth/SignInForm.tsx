import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Local Storage Template
// {
//   "appData":{
//       "session":{
//           "isLoggedIn":true,
//           "sessionToken":"1234567890",
//           "created_at":"2014-01-01 00:00:00",
//           "updated_at":"2014-01-01 00:00:00"
//       },
//       "terms":{
//           "accepted_terms":true,
//           "accepted_at":"2014-01-01 00:00:00"
//       },
//       "login":{
//           "remember_me":true,
//           "email":"sample@qberi.com"
//       }
//   }
// }

const SignInForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    document.title = 'Qberi | Sign In';
    const data = localStorage.getItem('appData');

    if (!data) {
      return;
    }

    const appData = JSON.parse(data);
    const session = appData.session;
    if (!session) {
      return;
    }

    if (session.isLoggedIn) {
      window.location.href = '/dashboard/ecommerce';
    }
  }, []);

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    const URL = 'https://engine.qberi.com/api/login';
    const data = {
      email: email,
      password: password
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
      responseType: 'text',
      // mode: 'no-cors',
      body: JSON.stringify(data)
    };

    const response = fetch(URL, options)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw new Error('Something went wrong');
      })
      .then(responseJson => {
        if (
          responseJson.status === 200 ||
          responseJson.status === 201 ||
          responseJson.status === 202
        ) {
          console.log('success login');

          // login success code
          setError('');

          // set local storage
          const date = new Date();
          const session = {
            sessionToken: 'demo',
            isLoggedIn: true,
            created_at: date.toISOString(),
            updated_at: date.toISOString()
          };

          console.log(session);
          const data = localStorage.getItem('appData');

          if (data) {
            const appData = JSON.parse(data);
            appData.session = session;
            localStorage.setItem('appData', JSON.stringify(appData));
          } else {
            const appData = {
              session: session
            };
            localStorage.setItem('appData', JSON.stringify(appData));
          }

          setSuccessMessage('Login Success! Redirecting to Dashboard...');
          setTimeout(() => {
            window.location.href = '/dashboard/ecommerce';
          }, 3000);
        } else {
          setError('Invalid Credentials, Please Try Again!');
        }
      })
      .catch(error => {
        console.log(error);
        setError('Invalid Credentials, Please Try Again!');
      });

    console.log(response);
  };

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-1000">Sign In</h3>
        <p className="text-700">Get access to your account</p>
      </div>
      <AuthSocialButtons title="Sign in" />
      <div className="position-relative">
        <hr className="bg-200 mt-5 mb-4" />
        <div className="divider-content-center">or use email</div>
      </div>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="email"
            type="email"
            className="form-icon-input"
            placeholder="name@example.com"
            onChange={changeEmail}
            value={email}
          />
          <FontAwesomeIcon icon={faUser} className="text-900 fs-9 form-icon" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="password">Password</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="password"
            type="password"
            className="form-icon-input"
            placeholder="Password"
            onChange={changePassword}
            value={password}
          />
          <FontAwesomeIcon icon={faKey} className="text-900 fs-9 form-icon" />
        </div>
      </Form.Group>
      <Row className="flex-between-center mb-7">
        <Col xs="auto">
          <Form.Check type="checkbox" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              defaultChecked
            />
            <Form.Check.Label htmlFor="remember-me" className="mb-0">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>
        <Col xs="auto">
          <Link
            to={`/pages/authentication/${layout}/forgot-password`}
            className="fs-9 fw-semi-bold"
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>
      <p className="text-danger">{error}</p>
      <p className="text-success text-3xl">{successMessage}</p>

      <Button variant="primary" className="w-100 mb-3" onClick={onClick}>
        Sign In
      </Button>
      <div className="text-center">
        <Link to={`/auth/sign-up`} className="fs-9 fw-bold">
          Create an account
        </Link>
      </div>
    </>
  );
};

export default SignInForm;
