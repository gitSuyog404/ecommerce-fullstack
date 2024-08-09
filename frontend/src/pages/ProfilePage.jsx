import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetOrdersQuery } from "../slices/orderSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUserProfile, { isLoading: updateLoading }] =
    useUpdateUserProfileMutation();
  const { data: orders, isLoading: orderLoading, error } = useGetOrdersQuery();
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        toast.error("Password not matched");
      } else {
        let resp = await updateUserProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(resp.user));
        toast.success(resp.message);
      }
    } catch (err) {
      toast.error(err.data.error);
    }
  };
  return (
    <Row>
      <Col md={4}>
        <h3>Profile</h3>
        <Form onSubmit={updateProfileHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Control
              type="password"
              placeholder="Confrim Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h3>My Orders</h3>
        {orderLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <Message variant="danger">{error.data.error}</Message>
        ) : (
          <Table responsive hover striped className="table-sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/order/${order._id}`}
                      size="sm"
                      variant="light"
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
