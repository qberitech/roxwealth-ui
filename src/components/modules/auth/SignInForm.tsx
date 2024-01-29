import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/base/Button";
import AuthSocialButtons from "components/common/AuthSocialButtons";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const credentials = {
  email: "sample@qberi.com",
  password: "password",
};

const SignInForm = ({ layout }: { layout: "simple" | "card" | "split" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Qberi | Sign In";
    const data = localStorage.getItem("appData");
    if (data) {
      const appData = JSON.parse(data);
      console.log(data);
      if (appData.isLoggedIn) {
        window.location.href = "/dashboard/ecommerce";
      }
    }
  }, []);

  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    if (email === credentials.email && password === credentials.password) {
      const data = {
        isLoggedIn: true,
        user: {
          name: "John Doe",
          email: "support@qberi.com",
          role: "admin",
        },
      };
      localStorage.setItem("appData", JSON.stringify(data));
      window.location.href = "/dashboard/ecommerce";
    } else {
      setError("Invalid credentials");
      console.log(email, password);
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

      <Button variant="primary" className="w-100 mb-3" onClick={onClick}>
        Sign In
      </Button>
      <div className="text-center">
        <Link
          to={`/pages/authentication/${layout}/sign-up`}
          className="fs-9 fw-bold"
        >
          Create an account
        </Link>
      </div>
    </>
  );
};

export default SignInForm;
