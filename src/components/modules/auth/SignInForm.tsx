import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface SessionData {
  isLoggedIn: boolean;
  sessionToken: string;
  created_at: string;
  updated_at: string;
}

interface AppData {
  session?: SessionData;
  terms?: {
    accepted_terms: boolean;
    accepted_at: string;
  };
  login?: {
    remember_me: boolean;
    email: string;
  };
  userData?: {
    email: string;
  };
}

const admins = [
  'nitish2@qberi.com',
  'rohan2@qberi.com',
  'pranab@qberi.com',
  'jaco@qberi.com'
];

const updateUserData = async (email: string) => {
  const URL = 'https://engine.qberi.com/api/getProfile/' + email;
  let userData = {
    email: email,
    name: 'User Not Found',
    mobile: '0000000000',
    profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
    role: 'user'
  };

  try {
    const response = await axios.get(URL);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202
    ) {
      const res = response.data;
      userData = {
        email: res.email,
        name: res.name,
        mobile: res.mobile,
        profilePicture: res.profilePicture,
        role: admins.includes(res.email) ? 'admin' : 'user'
      };
    }
  } catch (error) {
    console.error(error);
  }
  const data = localStorage.getItem('appData');
  if (data) {
    const appData: AppData = JSON.parse(data);
    appData.userData = userData;
    localStorage.setItem('appData', JSON.stringify(appData));
  } else {
    const appData: AppData = {
      userData: userData
    };
    localStorage.setItem('appData', JSON.stringify(appData));
  }
};

const UpdateSession = (sessionToken: string) => {
  const date = new Date();
  const session: SessionData = {
    sessionToken: sessionToken,
    isLoggedIn: true,
    created_at: date.toISOString(),
    updated_at: date.toISOString()
  };

  const data = localStorage.getItem('appData');

  if (data) {
    const appData: AppData = JSON.parse(data);
    appData.session = session;
    localStorage.setItem('appData', JSON.stringify(appData));
  } else {
    const appData: AppData = {
      session: session
    };
    localStorage.setItem('appData', JSON.stringify(appData));
  }
};

const SignInForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    document.title = 'Qberi | Sign In';
    const data = localStorage.getItem('appData');

    if (data) {
      const appData: AppData = JSON.parse(data);
      const session = appData.session;
      if (session && session.isLoggedIn) {
        window.location.href = '/dashboard/roxwealth';
      }
    }
  }, []);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const URL = 'https://engine.qberi.com/api/login';
    // const URL = 'https://catfact.ninja/fact';

    const data = {
      email: email,
      password: password
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const response = await axios.post(URL, data, { headers: headers });
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 202
      ) {
        const responseData = response.data;
        console.log(responseData);

        const sessionToken = '1234567890 ';
        UpdateSession(sessionToken);
        console.log('Session updated');
        updateUserData(email);
        setError('');
        setSuccessMessage('Login successful, redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard/roxwealth';
        }, 1000);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
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

      <Button variant="primary" className="w-100 mb-3" onClick={handleLogin}>
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
