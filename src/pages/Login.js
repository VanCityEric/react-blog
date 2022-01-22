import React from 'react';
import { Button } from 'react-bootstrap';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Login.css';

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };

  return (
    <Card className="card">
      <h3 className="text-center signin-logo">BlogMe</h3>
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </Card>
  );
};

export default Login;
