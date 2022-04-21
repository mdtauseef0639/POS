import React, { useEffect, useState, useRef } from "react";
import {
  ToastContainer,
  Toast,
  Navbar,
  Container,
  Row,
  Col,
  Nav,
  NavDropdown,
  Overlay,
  Popover,
  Badge,
} from "react-bootstrap";
import ProductList from "./ProductList";
import Cart from "./Cart";
import products from "../products";

let notifyNo = 0;

function App() {
  const ref = useRef(null);
  const [cartItems, setCartItems] = React.useState([]);

  const [notification, setNotification] = React.useState([]);

  const [filterItem, setFilterItem] = useState(products);



  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [click, setClick] = useState({
    byTitle: 0,
    byPrice: 0,
    byCategory: 0,
  });

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  function handleFilter(e) {
    const category = e.target.name;
    if (category === "all") {
      setFilterItem(products);
    } else if (category === "fruits") {
      setFilterItem(
        products.filter((x) => {
          return x.category === "fruit";
        })
      );
    } else if (category === "vegetables") {
      setFilterItem(
        products.filter((x) => {
          return x.category === "vegetables";
        })
      );
    } else if (category === "seeds") {
      setFilterItem(
        products.filter((x) => {
          return x.category === "seeds";
        })
      );
    }
  }

  function handleSort(e) {
    const sort = e.target.name;

    
    if (sort === "byTitle") {
      setFilterItem(filterItem.sort((a, b) => a.title.localeCompare(b.title)));
    } else if (sort === "byPrice") {
      setFilterItem(filterItem.sort((a, b) => { return a.price - b.price}));
    } else if (sort === "byCategory") {
      setFilterItem(
        filterItem.sort((a, b) => a.category.localeCompare(b.category))
      );
    } else if (sort === "clear") {
      setFilterItem(filterItem.sort((a, b) => a.id - b.id));
    }
  }

  function handleAddToCart(product) {
    setNotification((notification) => [
      ...notification,
      { id: notifyNo++, title: `${product.title}` },
    ]);

    setCartItems((items) => {
      const itemIndex = items.findIndex(
        (item) => item.product.id === product.id
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

  function onAdd(id) {
    setCartItems((items) => {
      const itemIndex = items.findIndex((item) => item.product.id === id);
      if (itemIndex > -1) {
        items[itemIndex] = {
          ...items[itemIndex],
          qty: items[itemIndex].qty + 1,
        };
      }

      return [...items];
    });
  }

  function onRemove(id) {
    setCartItems((items) => {
      const itemIndex = items.findIndex((item) => item.product.id === id);

      if (items[itemIndex].qty >= 1) {
        items[itemIndex] = {
          ...items[itemIndex],
          qty: items[itemIndex].qty - 1,
        };
      } else if(items[itemIndex].qty===0) {
        items.splice(itemIndex);
      }
      return [...items];
    });
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href="/">Axelor POS</Navbar.Brand>
          <Nav className="me-auto navbar navbar-expand-lg">
            <Nav.Link href="#home" onClick={handleFilter} name="all">
              All
            </Nav.Link>
            <Nav.Link href="#" onClick={handleFilter} name="fruits">
              Fruits
            </Nav.Link>
            <Nav.Link href="#" onClick={handleFilter} name="vegetables">
              Vegetables
            </Nav.Link>
            <Nav.Link href="#" onClick={handleFilter} name="seeds">
              Seeds
            </Nav.Link>
            <NavDropdown title="Sort" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="#action/3.1"
                onClick={handleSort}
                name="byTitle"
              >
                By Title{click ? "" : ""}
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={handleSort}
                name="byPrice"
              >
                By Price
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                onClick={handleSort}
                name="byCategory"
              >
                By Category
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.4"
                onClick={handleSort}
                name="clear"
              >
                Clear
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav ref={ref}>
            <Nav.Link onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
              <sup>
                <Badge pill bg="danger">
                  {cartItems.length}
                </Badge>
              </sup>
            </Nav.Link>
            <Overlay
              show={show}
              target={target}
              placement="bottom"
              container={ref}
              containerPadding={20}
            >
              <Popover id="popover-contained">
                <Popover.Header as="h3">Cart</Popover.Header>
                <Popover.Body>
                  <Cart items={cartItems} onAdd={onAdd} />
                </Popover.Body>
              </Popover>
            </Overlay>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={8}>
            <ProductList products={filterItem} onAddToCart={handleAddToCart} />
          </Col>
          <Col md={4}>
            <Cart items={cartItems} onAdd={onAdd} onRemove={onRemove} />
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-end">
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
