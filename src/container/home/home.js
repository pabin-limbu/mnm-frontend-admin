import React from "react";
import Layout from "../../components/layout/layout";
import { Jumbotron } from "react-bootstrap";

const home = () => {
  return (
    <div>
      <Layout>
        <Jumbotron
          style={{ margin: "5rem", background: "#fff" }}
          className="text-center"
        >
          <h1>Welcome to admin dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a eaque
            voluptatem excepturi explicabo magni?
          </p>
        </Jumbotron>
      </Layout>
    </div>
  );
};

export default home;
