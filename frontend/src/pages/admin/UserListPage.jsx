// import { Table, Row, Col, Button } from "react-bootstrap";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   useGetUsersQuery,
//   useDeleteUserMutation,
// } from "../../slices/usersApiSlice";
// import Message from "../../components/Message";

// const UserListPage = () => {
//   const { data: users, isLoading, error, refetch } = useGetUsersQuery();
//   const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

//   const deleteUserHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         const resp = await deleteUser(id).unwrap();
//         toast.success(resp.message);
//         refetch(); // Refetch users after deleting
//       } catch (err) {
//         toast.error(err?.data?.error || err.error);
//       }
//     }
//   };

//   return (
//     <>
//       <Row className="align-items-center">
//         <Col>
//           <h2>Users</h2>
//         </Col>
//       </Row>
//       {isLoading ? (
//         <h1>Loading...</h1>
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : (
//         <Table responsive hover striped className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>ADMIN</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>
//                   <a href={`mailto:${user.email}`}>{user.email}</a>
//                 </td>
//                 <td>
//                   {user.isAdmin ? <strong>Yes</strong> : <strong>No</strong>}
//                 </td>
//                 <td>
//                   <Button
//                     as={Link}
//                     to={`/admin/user/${user._id}/edit`}
//                     size="sm"
//                     variant="light"
//                   >
//                     <FaEdit />
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="danger"
//                     className="ms-2"
//                     onClick={() => deleteUserHandler(user._id)}
//                     disabled={deleteLoading}
//                   >
//                     <FaTrash style={{ color: "white" }} />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default UserListPage;

// import React, { useEffect } from "react";
// import { Table, Button, Row, Col, Spinner } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   useGetUsersQuery,
//   useDeleteUserMutation,
// } from "../../slices/usersApiSlice";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const UserListPage = () => {
//   const { data: users, isLoading, error, refetch } = useGetUsersQuery();
//   const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

//   const deleteUserHandler = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await deleteUser(id);
//         toast.success("User deleted successfully");
//         refetch(); // Refetch the users list after deletion
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <>
//       <Row className="align-items-center">
//         <Col>
//           <h1>Users</h1>
//         </Col>
//       </Row>
//       {loadingDelete && (
//         <div className="d-flex justify-content-center my-3">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       )}
//       {isLoading ? (
//         <div className="d-flex justify-content-center my-3">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : error ? (
//         <div className="alert alert-danger">{error}</div>
//       ) : (
//         <Table striped bordered hover responsive className="table-sm">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>EMAIL</th>
//               <th>ADMIN</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user._id}</td>
//                 <td>{user.name}</td>
//                 <td>
//                   <a href={`mailto:${user.email}`}>{user.email}</a>
//                 </td>
//                 <td>{user.isAdmin ? "Yes" : "No"}</td>
//                 <td>
//                   <LinkContainer to={`/admin/user/${user._id}/edit`}>
//                     <Button variant="light" className="btn-sm">
//                       <FaEdit />
//                     </Button>
//                   </LinkContainer>
//                   <Button
//                     variant="danger"
//                     className="btn-sm"
//                     onClick={() => deleteUserHandler(user._id)}
//                   >
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </>
//   );
// };

// export default UserListPage;

import React from "react";
import { Table, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import Paginate from "../../components/Paginate";
import { toast } from "react-toastify";

function UserListPage() {
  const { data, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteUserMutation();

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully!");
        refetch(); // Refetch the user list to see updates
      } catch (err) {
        toast.error(
          err.data?.message || deleteError?.data?.message || "An error occurred"
        );
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Users</h2>
        </Col>
        <Col className="text-end">
          <Button variant="dark" size="sm" as={Link} to="/admin/user/create">
            <FaEdit className="mb-1" /> Create User
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">{error.message || "An error occurred"}</Alert>
      ) : (
        <>
          <Table responsive hover striped className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <Button
                      as={Link}
                      size="sm"
                      variant="light"
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      className="ms-2"
                      onClick={() => deleteUserHandler(user._id)}
                      disabled={deleteLoading}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} admin={true} />
        </>
      )}
    </>
  );
}

export default UserListPage;
