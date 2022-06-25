import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/layout";
import MyModal from "../../components/ui/modal/MyModal";
import { getOrder, packOrder } from "../../store/actions/order.actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

function Order() {
  const [showOrder, setShowOrder] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getOrder(startDate));
  }, [startDate]);

  useEffect(() => {
    setOrders(order.orders);
  }, [order]);

  const handleClose = () => {
    setShowOrder(false);
    setErrorMessage("");
  };
  const handleSearch = (orders, searchId) => {
    if (searchId === "") {
      return orders;
    }
    const result = orders.filter((order) => {
      if (order.orderId === parseInt(searchId)) return order;
    });

    return result;
  };

  const filterOrders = (orders, filterby) => {
    const filteredOrder = orders.filter((order) => {
      switch (filterby) {
        case "order":
          if (
            order.orderStatus[0].isCompleted == true &&
            order.orderStatus[1].isCompleted === false &&
            order.orderStatus[2].isCompleted === false
          ) {
            return order;
          }
          break;
        case "packed":
          if (
            order.orderStatus[0].isCompleted == true &&
            order.orderStatus[1].isCompleted === true &&
            order.orderStatus[2].isCompleted === false
          ) {
            return order;
          }
          break;

        case "delivered":
          if (
            order.orderStatus[0].isCompleted == true &&
            order.orderStatus[1].isCompleted === true &&
            order.orderStatus[2].isCompleted === true
          ) {
            return order;
          }
          break;
        default:
          return order;
      }
    });
    return filteredOrder;
  };

  const handlePackItem = (orderId) => {
    // If all item are checked then submit for packaging.
    let checkBoxes = document.querySelectorAll(
      'input[name="itemToPack"]:checked'
    );
    if (checkBoxes.length === currentOrder.items.length) {
      dispatch(packOrder(orderId));
      setShowOrder(false);
    } else {
      setErrorMessage("* Not all item are checked ! please check all item ");
    }
  };

  const renderOrders = (order) => {
    return (
      <Card
        onClick={() => {
          setCurrentOrder(order);
          setShowOrder(true);
        }}
      >
        <Card.Body>
          <Card.Text>
            {`ID: ${order.orderId} user: ${order.user} Phone: ${
              order.address.mobileNumber
            } date : ${new Date(order.createdAt).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}{" "}
          </Card.Text>
          <Card.Text>
            <div className="progressBar-container w-100">
              <ul className="progressBar">
                <li className="active">Ordered</li>
                <li>Packed</li>
                <li>Delivered</li>
              </ul>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Layout sidebar>
      <div className="order-container ">
        <div className="filter-container  w-100">
          <div className="filteroption-container ">
            <Form.Select
              className="form-control w-md-25  ml-2"
              aria-label="Default select example"
              size="lg"
              onChange={(e) => {
                if (e.target.value === "1") {
                  setOrders(filterOrders(order.orders, ""));
                }
                if (e.target.value === "2") {
                  setOrders(filterOrders(order.orders, "order"));
                }
                if (e.target.value === "3") {
                  setOrders(filterOrders(order.orders, "packed"));
                }
                if (e.target.value === "4") {
                  setOrders(filterOrders(order.orders, "delivered"));
                }
              }}
            >
              <option value="1">All</option>
              <option value="2">Order</option>
              <option value="3">Packed</option>
              <option value="4">Delivered</option>
            </Form.Select>
          </div>
          <div className="search-order-container mt-2">
            <Row>
              <Col xs={12}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="search..."
                    type="text"
                    value={searchId}
                    onChange={(e) => {
                      setSearchId(e.target.value);
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    id=""
                    onClick={() => {
                      const result = handleSearch(order.orders, searchId);
                      setOrders(result);
                    }}
                  >
                    O
                  </Button>
                </InputGroup>
              </Col>
              <Col xs={12} className="mb-2">
                <label>sort order by date :</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
        <ul>
          {orders &&
            orders.map((order, index) => {
              return <li key={index}>{renderOrders(order)}</li>;
            })}
        </ul>

        <MyModal
          show={showOrder}
          handleClose={handleClose}
          size={"lg"}
          backdrop="static"
          errormsg={errorMessage}
          modaltitle={`Id : ${currentOrder.orderId}  | ${new Date(
            currentOrder.createdAt
          ).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
          buttons={[
            {
              label: "Cancel",
              color: "primary",
              onClick: () => {
                handleClose();
              },
            },
            {
              label: "Pack items",
              color: "success",
              onClick: () => {
                handlePackItem(currentOrder._id);
              },
            },
          ]}
        >
          <Row>
            <Col xs={6}>
              <Form.Text>
                city: {currentOrder.address && currentOrder.address.address}
              </Form.Text>
            </Col>
            <Col xs={6}>
              <Form.Text>
                Locality:{" "}
                {currentOrder.address && currentOrder.address.locality}{" "}
              </Form.Text>
            </Col>
            <Col xs={6}>
              <Form.Text>
                District:{" "}
                {currentOrder.address && currentOrder.address.cityDistrictTown}{" "}
              </Form.Text>
            </Col>
            <Col xs={6}>
              <Form.Text>
                Landmark:{" "}
                {currentOrder.address && currentOrder.address.landmark}{" "}
              </Form.Text>
            </Col>
            <Col xs={6}>
              <Form.Text>
                Number:{" "}
                {currentOrder.address && currentOrder.address.mobileNumber}{" "}
              </Form.Text>
            </Col>
          </Row>

          <div className="fixed-table-container">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>qty</th>
                  <th>packed</th>
                </tr>
              </thead>

              <tbody>
                {currentOrder.items &&
                  currentOrder.items.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index}</td>
                        <td>{item.name}</td>

                        <td>{item.purchasedQty}</td>
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            name="itemToPack"
                            id=""
                            onChange={(e) => {}}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </MyModal>
      </div>
    </Layout>
  );
}

export default Order;
