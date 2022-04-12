import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function Product({ data, onAdd }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={12}>
            <Card.Img
              style={{
                backgroundImage: `url('${process.env.PUBLIC_URL + data.url}')` ,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: 150,
              }}
            />
          </Col>

          <Col md={12}>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              <b>₹{data.price}</b>
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                onAdd && onAdd(data);
              }}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function ProductList({ products = [], onAddToCart }) {
  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} md={2}>
          <Product data={product} onAdd={onAddToCart} />
        </Col>
      ))}
    </Row>
  );
}
