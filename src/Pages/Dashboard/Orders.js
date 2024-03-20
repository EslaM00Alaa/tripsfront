import React, { useState, useEffect } from "react";
import api from "../../components/db/api";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
// import Footer from '../../components/Footer/Footer'
import { Form, Button, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../components/Footer/Footer";

function Orders() {

const [orders, setOrders] = useState([]);

useEffect(() => {
  try {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      };
    api
      .get("/orders", config)
      .then((response) => {
        setOrders(response.data.data); 
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Order:", error);
      });
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
  }
}, []);

const deleteOrder = (orderId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        token: `${token}`,
      },
    };
    api
      .delete(`/orders/${orderId}`, config)
      .then((response) => {
        console.log("Order deleted successfully");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.order_id !== orderId)
        );
      })
      .catch((error) => {
        console.error("Error deleting Order:", error);
      });
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
  }
};

  return (
    <>
      <Header />
      <SideBar />
      <Container>
      <div className="pt-3 pb-2 mb-3 ">
  <h2 className="text-center">Orders </h2>

  <Form>
    {orders.map((order) => (
      <Row key={order.order_id} className="mb-3 p-3">
        <Form.Group
          as={Col}
          lg="2"
          controlId={`name_${order.order_id}`}
          className="mt-2"
        >
          <Form.Label className="text-order">Name :</Form.Label>
          <Form.Control type="text" value={order.name} readOnly />
        </Form.Group>
        <Form.Group
          as={Col}
          lg="2"
          controlId={`number_of_person_${order.order_id}`}
          className="mt-2 fs-5"
        >
          <Form.Label className="text-order">Number person : </Form.Label>
          <Form.Control
            type="text"
            value={order.number_of_person}
            readOnly
          />
        </Form.Group>

        <Form.Group
          as={Col}
          lg="2"
          controlId={`arrivaldate_${order.order_id}`}
          className="mt-2 fs-5"
        >
          <Form.Label className="text-order">Arrival Date : </Form.Label>
          <Form.Control
            type="text"
            value={order.arrivaldate}
            readOnly
          />
        </Form.Group>

        <Form.Group
          as={Col}
          lg="2"
          controlId={`departuredate_${order.order_id}`}
          className="mt-2 fs-5"
        >
          <Form.Label className="text-order">Departur Date : </Form.Label>
          <Form.Control
            type="text"
            value={order.departuredate}
            readOnly
          />
        </Form.Group>
        <Form.Group
          as={Col}
          lg="2"
          controlId={`flight_number_${order.order_id}`}
          className="mt-2 fs-5"
        >
          <Form.Label className="text-order">Flight Number : </Form.Label>
          <Form.Control
            type="text"
            value={order.flight_number}
            readOnly
          />
        </Form.Group>

        <Form.Group
          as={Col}
          lg="2"
          controlId={`hotel_name_${order.order_id}`}
          className="mt-2 fs-5"
        >
          <Form.Label className="text-order">Hotel Name : </Form.Label>
          <Form.Control type="text" value={order.hotel_name} readOnly />
        </Form.Group>

        <Form.Group
          as={Col}
          lg="2"
          controlId={`room_name_${order.order_id}`}
          className="mt-2 fs-5"
        >
          <Form.Label className="text-order">Room Name : </Form.Label>
          <Form.Control type="text" value={order.room_num} readOnly />
        </Form.Group>
        {/* Add more Form.Group components for other order details */}
        <Form.Group
          as={Col}
        
          lg="2"
        
          controlId={`delete_${order.order_id}`}
          className="mt-2 fs-5"
        >

<Form.Label className="text-order">Order Id : </Form.Label>
          <Form.Control type="text" value={order.o_id} readOnly />
        </Form.Group>
        {/* Add more Form.Group components for other order details */}
        <Form.Group
          as={Col}
        
          lg="2"
        
          controlId={`delete_${order.order_id}`}
          className="mt-2 fs-5"
        >

<Form.Label className="text-order">Paid : </Form.Label>
          <Form.Control type="text" value={order.paid} readOnly />
        </Form.Group>

        <Form.Group
          as={Col}
        
          lg="2"
        
          controlId={`delete_${order.order_id}`}
          className="mt-2 fs-5"
        >
        <div className="btn btn-danger delete-order" onClick={() => deleteOrder(order.order_id)}>
Delete
</div>

        </Form.Group>
        <hr className="mt-4" />
      </Row>
    ))}
  </Form>
</div>

      </Container>

      <Footer />
    </>
  );
}

export default Orders;
