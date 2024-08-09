import { Row, Col, Image, Button, ListGroup, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
} from "../slices/orderSlice";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { toast } from "react-toastify";

function OrderPage() {
  const { id } = useParams();
  const { data: order, isLoading, refetch, error } = useGetOrderByIdQuery(id);
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

  const deliverHandler = async (id) => {
    try {
      let resp = await deliverOrder(id).unwrap();
      refetch();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <Message variant="danger">{error.data.error}</Message>
  ) : (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>Shipping</h3>
            <p>
              Recipient: {order.shippingAddress.recipient} |{" "}
              {order.shippingAddress.phone}
              <br />
              Address: {order.shippingAddress.address} |{" "}
              {order.shippingAddress.city}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered at {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Payment</h3>
            <p>Mode: COD</p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.deliveredAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroup>
              {order.orderItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>
                        <strong>{item.name}</strong>
                      </Link>
                    </Col>
                    <Col>
                      <strong>
                        {item.qty} X {item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Item</Col>
                <Col>${order.itemPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingCharge}</Col>
              </Row>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {userInfo && userInfo.isAdmin && !order.isDelivered && (
                <Button
                  variant="dark"
                  onClick={() => deliverHandler(order._id)}
                >
                  Mark as Delivered
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default OrderPage;
