import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../header/header";
import "./style.css";
function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} sm={12} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to={"/"}>
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to={"/products"}>products</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>category</NavLink>
                </li>
                <li>
                  <NavLink to={"/banner"}>Banner</NavLink>
                </li>
                <li>
                  <NavLink to={"/comments"}>Comments</NavLink>
                </li>
                <li>
                  <NavLink to={"/order"}>orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} sm={12}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}

export default Layout;
