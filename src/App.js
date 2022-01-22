import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './App.css';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const App = (props) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const isLoggedOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/';
    });
  };

  return (
    <Router>
      <Navbar className="bg-light">
        <Container>
          <Navbar.Brand>BlogMe</Navbar.Brand>
          <Nav className="me-auto">
              <Link className="link-secondary" to="/">
                Dashboard
              </Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {isAuth && (
              <Link className="link-secondary" to="/createpost">
                <Button variant="outline-primary">Create New Post +</Button>
              </Link>
            )}

            {!isAuth ? (
              <>
              <p className="login-to-text">Log in to post</p>
              <Link className="link-secondary" to="/login">
                <Button variant="success" className="logout-btn">
                  Log In
                </Button>
              </Link>
              </>
            ) : (
              <Button
                onClick={isLoggedOut}
                variant="danger"
                className="logout-btn"
              >
                Log Out
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route
          path="/createpost"
          element={
            <Container className="d-flex justify-content-center">
              <div className="w-100" style={{ maxWidth: '800px' }}>
                <CreatePost isAuth={isAuth} />
              </div>
            </Container>
          }
        />
        <Route
          path="/login"
          element={
            <Container className="loginContainer d-flex justify-content-center">
              <Login setIsAuth={setIsAuth} />
            </Container>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
