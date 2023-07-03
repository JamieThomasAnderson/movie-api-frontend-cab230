import { useState, useEffect } from "react";

import { LinkContainer } from 'react-router-bootstrap'
import { NavItem } from 'reactstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function LoginControl() {
  const [username, setUsername] = useState("Account");
  const [loginState, setLoginState] = useState("Login")
  const [linkLogin, setLinkLogin] = useState("/login");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setLoginState("Logout");
      setLinkLogin("/logout");
    }
  }, []);

  return (
    <Nav>
      <NavDropdown title={username} id="collasible-nav-dropdown">
        <LinkContainer to={linkLogin}><NavDropdown.Item>{loginState}</NavDropdown.Item></LinkContainer>
        <NavDropdown.Divider />
        <LinkContainer to="/register"><NavDropdown.Item>Register</NavDropdown.Item></LinkContainer>
      </NavDropdown>
    </Nav>
  );
}


function Header() {


  return (
    <div className='navigationbar'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/"><Navbar.Brand>FilmDB</Navbar.Brand></LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="me-auto" navbar>
              <NavItem>
                <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              </NavItem>

              <NavItem>
                <LinkContainer to="/search"><Nav.Link>Search</Nav.Link></LinkContainer>
              </NavItem>
            </Nav>

            <LoginControl />

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;