import { useEffect, useState } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productSlice";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

function HomePage() {
  // const [products, setProducts] = useState([]);
  // const products = useLoaderData();
  const { pageNumber, keyword } = useParams();
  console.log(keyword);
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });
  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      {keyword ? (
        <h2>Search Results for {keyword}</h2>
      ) : (
        <h2>Latest Products</h2>
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <Message variant="danger">{error.data.error}</Message>
      ) : (
        <>
          <Row>
            {data.products.map((item) => (
              <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
          <Paginate page={data.page} pages={data.pages} />
        </>
      )}
    </>
  );
}

export const loadData = async () => {
  let resp = await fetch("/api/v1/products");
  return await resp.json();
};

export default HomePage;
