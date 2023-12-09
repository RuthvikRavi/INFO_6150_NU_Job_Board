import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import registerImg from '../assets/images/2.svg';
import userIcon from '../assets/images/3.svg';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [usernameValidation, setUsernameValidation] = useState({
    isValid: true,
    message: '',
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
    let errorMessage = '';

    // Validation for username
    if (id === 'username') {
      if (value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long.';
      }
      setUsernameValidation({
        isValid: errorMessage === '',
        message: errorMessage,
      });
    }

    // Validation for email
    if (id === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorMessage = 'Invalid email address.';
      }
      setEmailValidation({
        isValid: errorMessage === '',
        message: errorMessage,
      });
    }

    // Validation for password
    if (id === 'password') {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) {
        errorMessage =
          'Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, and one number.';
      }
      setPasswordValidation({
        isValid: errorMessage === '',
        message: errorMessage,
      });
    }

    setCredentials((prev) => ({ ...prev, [id]: value }));

    e.target.setCustomValidity(errorMessage);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!usernameValidation.isValid || !emailValidation.isValid || !passwordValidation.isValid) {
        // Handle validation error (show a message or prevent submission)
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      if (!res.ok) alert(result.message);
      dispatch({ type: 'REGISTER_SUCCESS' });
      navigate('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt=""></img>
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
                <h2>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                    {!usernameValidation.isValid && (
                      <p className="validation-error">{usernameValidation.message}</p>
                    )}
                  </FormGroup>
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
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Create Account
                  </Button>
                </Form>
                <p>
                  Already have an account?<Link to="/login" style={{ color: '#fff' }}>
                    Login
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

export default Register;
