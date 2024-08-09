import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useUserLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [userLogout, { isLoading }] = useUserLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      let resp = await userLogout().unwrap();
      dispatch(logout());
      toast.success(resp.message);
      navigate("/signin");
    } catch (err) {
      toast.error(err.data.error);
    }
  };
  return (
    <header>
      <Navbar variant="dark" bg="dark" expand="md" collapseOnSelect>
        <Container>
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="logo" />
            Broadway
          </NavLink>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <SearchBox />
              <NavLink to="/cart" className="nav-link">
                <FaShoppingCart /> Cart{" "}
                {cartItems.length > 0 && (
                  <Badge pill bg="success">
                    {cartItems.length}
                  </Badge>
                )}
              </NavLink>
              {!userInfo ? (
                <NavLink to="/signin" className="nav-link">
                  <FaUser /> Signin
                </NavLink>
              ) : (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="admin">
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
