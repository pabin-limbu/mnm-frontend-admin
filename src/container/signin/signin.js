import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/layout/layout";
import Input from "../../components/ui/input/input";

import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth.actons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Signin = (props) => {
  /**link form value with state */
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); //fetch state.auth as auth from store.

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };

  /**if user authenticated redirect to dashboard */
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "60px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="Email"
                  onChange={(e) => {
                    setemail(e.target.value);
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
};

export default Signin;
