import { Form } from "react-bootstrap";
import React from "react";

const Input = (props) => {
  let input = null;
  switch (props.type) {
    case "select":
      input = (
        <Form.Group controlId="">
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <select
            className="form-control form-control-sm"
            name=""
            id=""
            value={props.value}
            onChange={props.onChange}
          >
            <option
              value={
                props.currentProduct ? props.currentProduct.category._id : ""
              }
            >
              {props.currentProduct
                ? props.currentProduct.category.name
                : props.placeholder}
            </option>
            {props.options.length > 0
              ? props.options.map((option, index) => (
                  <option key={index} value={option._id}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </Form.Group>
      );
      break;
    case "text":
      break;
    case "check":
      input = (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={props.label}
            checked={props.value}
            onChange={props.onChange}
          />
        </Form.Group>
      );
      break;

    default:
      input = (
        <Form.Group controlId="">
          {props.label && <Form.Label>{props.label}</Form.Label>}

          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
        </Form.Group>
      );
      break;
  }

  // return (
  //   <div>
  //     <Form.Group controlId="">
  //       {props.label && <Form.Label>{props.label}</Form.Label>}

  //       <Form.Control
  //         type={props.type}
  //         placeholder={props.placeholder}
  //         value={props.value}
  //         onChange={props.onChange}
  //         {...props}
  //       />
  //       <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
  //     </Form.Group>
  //   </div>
  // );
  return input;
};

export default Input;
