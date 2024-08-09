import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productSlice";
import { Link } from "react-router-dom";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <></>
  ) : error ? (
    <Message variant="danger">{error.data.error}</Message>
  ) : (
    <Carousel className="mb-4 bg-dark" pause="hover">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} fluid />
          </Link>
          <Carousel.Caption className="carousel-caption">
            {product.name} - (${product.price})
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
