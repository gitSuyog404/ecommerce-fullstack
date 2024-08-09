import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productSlice";
import { toast } from "react-toastify";

function ProductEditPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: imageLoading }] =
    useUploadProductImageMutation();

  const uploadImageHandler = async (e) => {
    try {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      let resp = await uploadProductImage(formData).unwrap();
      setImage(resp.path);
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [product]);

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      let resp = await updateProduct({
        _id: product._id,
        name,
        brand,
        category,
        image,
        price,
        countInStock,
        description,
      }).unwrap();
      navigate("/admin/products");
      toast.success(resp.message);
    } catch (err) {
      toast.error(err.data.error);
    }
  };

  return (
    <>
      <FormContainer>
        <h2 className="mb-2">Edit Product</h2>
        <Form onSubmit={updateProductHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={uploadImageHandler} />
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ProductEditPage;
