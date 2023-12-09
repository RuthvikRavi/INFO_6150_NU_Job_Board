import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/login.css';
import loginImg from '../assets/images/2.svg';
import userIcon from '../assets/images/3.svg';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [emailValidation, setEmailValidation] = useState({
    isValid: true,
    message: '',
  });

  const [passwordValidation, setPasswordValidation] = useState({
    isValid: true,
    message: '',
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    // Validate input dynamically
    validateInput(id, value);
  };

  const validateInput = (id, value) => {
    switch (id) {
      case 'email':
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        const isEmailValid = emailRegex.test(value);
        setEmailValidation({
          isValid: isEmailValid,
          message: isEmailValid ? '' : 'Invalid email format.',
        });
        break;
      case 'password':
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const isPasswordValid = passwordRegex.test(value);
        setPasswordValidation({
          isValid: isPasswordValid,
          message: isPasswordValid
            ? ''
            : 'Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, and one number.',
        });
        break;
      default:
        break;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      if (!emailValidation.isValid || !passwordValidation.isValid) {
        // Handle validation error (show a message or prevent submission)
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        window.location.reload();
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      navigate('/home');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      navigate('/login');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div
                className="login__form"
                style={{
                  background: 'linear-gradient(#274060, #1b2845)',
                  color: '#fff',
                }}
              >
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                    {!emailValidation.isValid && (
                      <p className="validation-error">{emailValidation.message}</p>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                    {!passwordValidation.isValid && (
                      <p className="validation-error">{passwordValidation.message}</p>
                    )}
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                    disabled={!emailValidation.isValid || !passwordValidation.isValid}
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account?
                  <Link to="/register" style={{ color: '#fff' }}>
                    Create
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
