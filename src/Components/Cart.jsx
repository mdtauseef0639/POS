import React from "react";
import {
  Alert,
  ListGroup,
  Badge,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export default function Cart({ items ,onAdd,onRemove}) {
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
                    {item.product.title}/₹ {item.product.price}
                  </div>
                  <InputGroup className="btn-group btn-group-sm">
                    <Button variant="danger" size="sm" onClick={()=>{
                      onRemove(item.product.id)
                    }}>-</Button>
                    <Button variant="light" size="sm" >{item.qty}</Button>
                    <Button variant="success" size="sm" onClick={()=>{
                      onAdd(item.product.id)
                    }}>+</Button>
                  </InputGroup>
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
