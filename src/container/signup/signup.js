import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/layout/layout";
import Input from "../../components/ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/actions/user.actions";
import { Redirect } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth); //fetch state.auth as state from store.
  const user = useSelector((state) => state.user); //this user is a reducer name in root reducer.

  const dispatch = useDispatch();
  const userSignUp = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    dispatch(signup(user));
  };

  if (user.loading) {
    return <p>loading...</p>;
  }
  //if user is loged in redirect to dashboard
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "60px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignUp}>
                <Row>
                  <Col md={6}>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      value={firstName}
                      type="text"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      value={lastName}
                      type="text"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Input
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <Input
                  label="Password"
                  placeholder="Password"
                  value={password}
                  type="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default Signup;
