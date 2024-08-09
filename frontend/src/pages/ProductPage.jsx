import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addItem } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from "../slices/productSlice";
import Message from "../components/Message";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

function ProductPage() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  // const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation();

  // useEffect(() => {
  //   axios
  //     .get("/api/v1/products/" + id)
  //     .then((resp) => setProduct(resp.data))
  //     .catch((err) => console.log(err.message));
  // }, []);

  const addToCartHandler = (item) => {
    dispatch(addItem(item));
    navigate("/cart");
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await addReview({
        _id: product._id,
        rating,
        comment,
      }).unwrap();
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt="product image" fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.category} - {product.brand}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <span>{product.description}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    variant="secondary"
                    disabled={product.countInStock == 0}
                    onClick={() =>
                      addToCartHandler({ ...product, qty: Number(qty) })
                    }
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="my-3">
            <Col md={6} className="reviews">
              <h2>Reviews</h2>
              {product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </>
                ))
              ) : (
                <Message>No Reviews Yet</Message>
              )}
              {userInfo ? (
                <>
                  <h2 className="my-3">Write Customer Review</h2>
                  <Form onSubmit={addReviewHandler}>
                    <Form.Group controlId="rating" className="my-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value={0}>Select Review...</option>
                        <option value={1}>1 - Poort</option>
                        <option value={2}>2 - Satisfactory</option>
                        <option value={3}>3 - Good</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={5}>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="my-3">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write Comment ..."
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                      Add
                    </Button>
                  </Form>
                </>
              ) : (
                <Message>
                  Please <Link to="/sigin">signin</Link> to add review
                </Message>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage;
