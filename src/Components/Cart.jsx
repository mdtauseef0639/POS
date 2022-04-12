import React from "react";
import { Alert, ListGroup, Badge } from "react-bootstrap";

export default function Cart({ items = [] }) {
  let total = 0;
  return (
    <div>
      {items.length > 0 ? (
        <ListGroup as="ol" numbered>
          {items.map((item, index) => {
            const totalItem = Math.round(item.product.price * item.qty);
            total += totalItem;
            return (
              <ListGroup.Item
              key={index}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {item.product.title}
                  </div>₹ {''}
                  {item.product.price} x {item.qty}
                </div>
                <Badge variant="primary" pill>
                  {totalItem.toFixed(2)}
                </Badge>
              </ListGroup.Item>
            );
          })}
          <ListGroup.Item className="d-flex justify-content-between align-items-start">
            <div className="fw-bold">Net Total</div>
            <Badge bg="primary" pill>
              {total.toFixed(2)}
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <Alert variant={"warning"}>Cart is Empty</Alert>
      )}
    </div>
  );
}
