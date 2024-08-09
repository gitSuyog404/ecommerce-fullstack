import React from "react";
import { Row, Col, ListGroup, Button, Image, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

const CartPage = () => {
  const { cartItems, itemPrice, shippingCharge, totalPrice } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const updateItemQty = (item, qty) => {
    dispatch(addItem({ ...item, qty }));
  };
  const removeItemFromCart = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <Message variant="danger">
          Your cart is empty. <Link to="/">Visit Products</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col md={2}>
                      <h5>${(item.price * item.qty).toFixed(2)}</h5>
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          updateItemQty(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        onClick={() => removeItemFromCart(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h4>Total ({cartItems.length}) Products</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Net Total</Col>
                  <Col>${itemPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Charge</Col>
                  <Col>${shippingCharge}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total Price</strong>
                  </Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link
                  className="btn btn-secondary"
                  to="/signin?redirect=/shipping"
                >
                  Checkout
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartPage;
