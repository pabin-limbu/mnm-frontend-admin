import { Form } from "react-bootstrap";
import React from "react";

const Input = (props) => {
  return (
    <div>
      <Form.Group controlId="">
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
      </Form.Group>
    </div>
  );
};

export default Input;
