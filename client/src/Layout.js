import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
      <Nav variant="pills" defaultActiveKey="/users">
      <Nav.Item>
        <Nav.Link href="/">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item >
        <Nav.Link href="/products" eventKey="/products">Products</Nav.Link>
      </Nav.Item>
    </Nav>
      </Navbar>
      <Outlet />
    </>
  )
};

export default Layout;
