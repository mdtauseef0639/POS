import React, { useState, useRef, useEffect } from "react";
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

  // const [listItem, setListItem] = useState(products);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [click, setClick] = useState({
    byTitle: null,
    byPrice: null,
    byCategory: null,
  });

  const [sort, setSort] = useState("");

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

  function Icon({ clicked }) {
    if (clicked === "null") {
      return <></>;
    } else if (clicked === true) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-sort-up"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
        </svg>
      );
    } else if (clicked === false) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-sort-down"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
        </svg>
      );
    }
  }

  function handleSortType(e) {
    const sort = e.target.name;
    
    // setSort(true);
    setClick((x) => {
      return { ...x, sort: true };
    });
    if (sort === "byTitle") {
      setSort("byTitle");
      setClick((x) => {
        return { byTitle: !x.byTitle, byPrice: null, byCategory: null };
      });
    } else if (sort === "byPrice") {
      setSort("byPrice");
      setClick((x) => {
        return { byTitle: null, byPrice: !x.byPrice, byCategory: null };
      });
    } else if (sort === "byCategory") {
      setSort("byCategory");
      setClick((x) => {
        return { byTitle: null, byPrice: null, byCategory: !x.byCategory };
      });
    } else if (sort === "clear") {
      setSort("");
      setClick((x) => {
        return { byTitle: null, byPrice: null, byCategory: null };
      });
    }
  }

  const stringCompare = (a,b)=>{
    return a.localeCompare(b)
  }

  const numberCompare = (a,b)=>{
    return a - b 
  }

  const handleSort=React.useCallback(()=>{
    if (sort === "byTitle") {
      if (click.byTitle === true) {
        setFilterItem(
          [...filterItem].sort((a, b) => stringCompare(b.title,a.title))
        );
      } else if (click.byTitle === false) {
        setFilterItem([...filterItem].sort((a, b) => stringCompare(a.title,b.title)));
      }
    } else if (sort === "byPrice") {
      if (click.byPrice === true) {
        setFilterItem([...filterItem].sort((a,b)=>numberCompare(b.price,a.price)));
      } else if (click.byPrice === false) {
        setFilterItem([...filterItem].sort((a, b) => numberCompare(a.price,b.price)));
      }
    } else if (sort === "byCategory") {
      if (click.byCategory === true) {
        setFilterItem([...filterItem].sort((a, b) => stringCompare(b.category,a.category))
        );
      } else if (click.byCategory === false) {
        setFilterItem([...filterItem].sort((a, b) => stringCompare(a.category,b.category))
        );
      }
    } else {
      setFilterItem([...filterItem].sort((a, b) => numberCompare(a.id,b.id)));
    }
},[sort,click,filterItem]) 
    
  

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

      if (items[itemIndex].qty > 1) {
        items[itemIndex] = {
          ...items[itemIndex],
          qty: items[itemIndex].qty - 1,
        };
      } else {
        items.splice(itemIndex);
      }
      return [...items];
    });
  }

  useEffect(()=>{
    handleSort()
  },[sort,click,handleSort])

   

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href="/">Apna Store</Navbar.Brand>
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
                onClick={handleSortType}
                name="byTitle"
              >
                By Title
                <Icon clicked={click.byTitle} />
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.2"
                onClick={handleSortType}
                name="byPrice"
              >
                By Price
                <Icon clicked={click.byPrice} />
              </NavDropdown.Item>
              <NavDropdown.Item
                href="#action/3.3"
                onClick={handleSortType}
                name="byCategory"
              >
                By Category
                <Icon clicked={click.byCategory} />
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#action/3.4"
                onClick={handleSortType}
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
              style={{ width: "300px" }}
              show={show}
              target={target}
              placement="bottom"
              container={ref}
              containerPadding={20}
            >
              <Popover id="popover-contained" style={{ width: "320px" }}>
                <Popover.Header as="h3">Cart</Popover.Header>
                <Popover.Body>
                  <Cart items={cartItems} onAdd={onAdd} onRemove={onRemove} />
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