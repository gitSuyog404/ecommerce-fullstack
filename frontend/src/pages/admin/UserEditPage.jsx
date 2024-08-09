// import { useState, useEffect } from "react";
// import FormContainer from "../../components/FormContainer";
// import { Form, Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
// } from "../../slices/usersApiSlice";
// import { toast } from "react-toastify";

// const UserEditPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const navigate = useNavigate();

//   const { id } = useParams();
//   const { data: user, isLoading, error } = useGetUserByIdQuery(id);
//   const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setIsAdmin(user.isAdmin);
//     }
//   }, [user]);

//   const updateUserHandler = async (e) => {
//     e.preventDefault();
//     try {
//       let resp = await updateUser({
//         id: user._id,
//         name,
//         email,
//         isAdmin,
//       }).unwrap();
//       navigate("/admin/users");
//       toast.success(resp.message);
//     } catch (err) {
//       toast.error(err.data.error);
//     }
//   };

//   return (
//     <FormContainer>
//       <h2 className="mb-2">Edit User</h2>
//       <Form onSubmit={updateUserHandler}>
//         <Form.Group controlId="name" className="my-2">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="email" className="my-2">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="isadmin" className="my-2">
//           <Form.Check
//             type="checkbox"
//             label="Is Admin"
//             checked={isAdmin}
//             onChange={(e) => setIsAdmin(e.target.checked)}
//           />
//         </Form.Group>
//         <Button type="submit" variant="dark">
//           Update
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default UserEditPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import FormContainer from "../../components/FormContainer";

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id, name, email, isAdmin }).unwrap();
      toast.success("User updated successfully!");
      refetch(); // Refetch user data to see updates
      navigate("/admin/users"); // Navigate back to the users list page
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h2>Edit User</h2>
      {isLoading || updateLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error.message}</div>
      ) : (
        <Form onSubmit={updateUserHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="isAdmin" className="my-2">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </Form.Group>
          <Button type="submit" variant="dark" disabled={updateLoading}>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UserEditPage;
