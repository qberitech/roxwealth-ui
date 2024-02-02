import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthSocialButtons from 'components/common/AuthSocialButtons';

const SignUpForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    document.title = 'Qberi | Sign Up';
  }, []);

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessages([]);

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const confirmPassword = (
      document.getElementById('confirmPassword') as HTMLInputElement
    ).value;
    const termsService = (
      document.getElementById('termsService') as HTMLInputElement
    ).checked;

    const errors: string[] = [];

    if (!name) {
      errors.push('Name is required');
    }

    if (!email) {
      errors.push('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push('Email is invalid');
    }

    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (!confirmPassword) {
      errors.push('Confirm Password is required');
    } else if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    if (!termsService) {
      errors.push('Please accept the terms and conditions');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const URL = 'https://engine.qberi.com/api/register';
      const data = {
        name: name,
        email: email,
        password: password
      };

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
          Accept: '*/*'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      // const responseJson = await response.json();
      console.log(response);

      setSuccessMessage(
        'You have been registered successfully, Redirecting to Sign In page...'
      );
      // clear localStorage.appData.session
      localStorage.removeItem('appData');
      setTimeout(() => {
        window.location.href = '/auth/sign-in';
      }, 3000);
    } catch (error) {
      console.error(error);
      setErrorMessages(['Something went wrong, Please Try Again!']);
    }
  };

  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-1000">Sign Up</h3>
        <p className="text-700">Create your account today</p>
      </div>
      <AuthSocialButtons title="Sign up" />
      <div className="position-relative mt-4">
        <hr className="bg-200" />
        <div className="divider-content-center">or use email</div>
      </div>
      <Form>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control id="name" type="text" placeholder="Name" />
        </Form.Group>
        <Form.Group className="mb-3 text-start">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </Form.Group>
        <Row className="g-3 mb-3">
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="text"
                placeholder="Password ( minimum length 8 )"
              />
            </Form.Group>
          </Col>
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Form.Control
                id="confirmPassword"
                type="text"
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Check type="checkbox" className="mb-3">
          <Form.Check.Input
            type="checkbox"
            name="termsService"
            id="termsService"
            // make it required
            required
          />
          <Form.Check.Label htmlFor="termsService" className="fs-9 text-none">
            {/* I accept the <Link to="/terms-conditions">terms </Link>and{' '} */}
            I accept the{' '}
            <a href="/terms-conditions" target="_blank">
              terms
            </a>{' '}
            and{' '}
            {/* <Link to="/privacy-policy" target='_blank'>privacy policy</Link> */}
            <a href="/privacy-policy" target="_blank">
              privacy policy
            </a>
          </Form.Check.Label>
        </Form.Check>
        <div className="mb-3">
          <small className="text-danger">
            {errorMessages.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </small>
        </div>
        <div className="mb-3">
          <small className="text-success">{successMessage}</small>
        </div>
        <Button
          variant="primary"
          className="w-100 mb-3"
          onClick={e => signUp(e)}
        >
          Sign up
        </Button>
        <div className="text-center">
          <Link to={`/auth/sign-in`} className="fs-9 fw-bold">
            Sign in to an existing account
          </Link>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
