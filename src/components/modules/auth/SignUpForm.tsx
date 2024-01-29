import Button from 'components/base/Button';
import AuthSocialButtons from 'components/common/AuthSocialButtons';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SignUpForm = ({ layout }: { layout: 'simple' | 'card' | 'split' }) => {
  useEffect(() => {
    // Set Title as Qberi | Sign Up
    document.title = 'Qberi | Sign Up';
  }, []);
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
          />
        </Form.Group>
        <Row className="g-3 mb-3">
          <Col sm={layout === 'card' ? 12 : 6} lg={6}>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control id="password" type="text" placeholder="Password" />
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
        <Button variant="primary" className="w-100 mb-3">
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
