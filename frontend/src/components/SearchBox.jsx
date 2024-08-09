import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchBox() {
  const params = useParams();
  const [keyword, setKeyword] = useState(params.keyword || "");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
    // setKeyword("");
  };
  useEffect(() => setKeyword(params.keyword || ""), [params]);
  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        placeholder="Search Products"
        className="mx-2"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline-light" className="mx-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
