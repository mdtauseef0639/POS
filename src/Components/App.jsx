import React from "react";
import {
  ToastContainer,
  Toast,
  Navbar,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ProductList from "./ProductList";
import Cart from "./Cart";
import products from "../products";

let notifyNo = 0;

function App() {
  const [cartItems, setCartItems] = React.useState([]);

  const [notification, setNotification] = React.useState([]);


  function handleAddToCart(product) {
    setNotification((notification) => [
      ...notification,
      { id: notifyNo++, title: `${product.title}` },
    ]);

    setCartItems(items => {
      const itemIndex = items.findIndex(
        item => item.product.id === product.id
      );
      if (itemIndex > -1) {
        items[itemIndex] = {
          ...items[itemIndex],
          qty: items[itemIndex].qty + 1,
        };
      } else {
        items.push({
          product,
          qty: 1,
        });
      }
      return [...items];
    });
  }
  function closeNotification(id) {
    setNotification((notification) =>
      notification.filter((notify) => notify.id !== id)
    );
  }

  return (
    <div className="App">
      <Navbar bg="light">
        <Container fluid>
          <Navbar.Brand href="#home">Axelor POS</Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={8}>
            <ProductList products={products} onAddToCart={handleAddToCart} />
          </Col>
          <Col md={4}>
            <Cart items={cartItems} />
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-end">
        {notification.map((notify, index) => (
          <Toast
            id={index}
            delay={3000}
            autohide
            show
            onClose={() => closeNotification(notify.id)}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{notify.title}</strong>
              <small className="text-muted">Just Now</small>
            </Toast.Header>
            <Toast.Body>Added successfully</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
}

export default App;
