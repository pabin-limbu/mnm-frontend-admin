import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getComment, addComment, deleteComment } from "../../store/actions";
import Layout from "../../components/layout/layout";
import Input from "../../components/ui/input/input";
import MyModal from "../../components/ui/modal/MyModal";
function UserComments() {
  const [commenter, setCommenter] = useState("");
  const [comment, setComment] = useState("");
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const dispatch = useDispatch();

  //store redux
  const commentList = useSelector((state) => state.userComment);

  //hooks
  useEffect(() => {
    dispatch(getComment());
  }, []);

  const handleModalClose = () => {
    setShowAddCommentModal(false);
    setComment("");
    setCommenter("");
  };
  const handleCommentSave = () => {
    const data = { commenter, comment };
    dispatch(addComment(data));
    console.log("save comments");
  };

  const handleDeleteUserComment = (id) => {
    dispatch(deleteComment(id));
  };

  const rennderAddCommentModal = () => {
    return (
      <MyModal
        show={showAddCommentModal}
        handleClose={handleModalClose}
        modalTitle={"Add comments"}
        size="lg"
        buttons={[
          {
            label: "Cancel",
            color: "primary",
            onClick: (e) => {
              handleModalClose();
            },
          },
          {
            label: "Save Changes",
            color: "danger",
            onClick: () => {
              handleCommentSave();
            },
          },
        ]}
      >
        <Input
          label={"commenter"}
          placeholder={"commenter name"}
          value={commenter}
          onChange={(e) => {
            setCommenter(e.target.value);
          }}
        ></Input>
        <Input
          type={"textArea"}
          label={"commentttt"}
          placeholder={"commentttt"}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></Input>
      </MyModal>
    );
  };

  const renderComments = (commentList) => {
    return (
      <div>
        <Table
          responsive="sm"
          style={{ fontSize: "12px" }}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>SN</th>
              <th>commenter</th>
              <th>Comment</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {commentList.comments.length > 0
              ? commentList.comments.map((comment, index) => {
                  return (
                    <tr
                      onClick={() => {
                        // setBannerDetailsModalShow(true);
                        // setbannerDetails(banner);
                      }}
                      key={comment._id}
                    >
                      <td>{index}</td>
                      <td>{comment.commenter}</td>
                      <td>{comment.comment}</td>

                      <td>
                        <button
                          onClick={(event) => {
                            handleDeleteUserComment(comment._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    );
  };

  //logs
  // console.log(commentList.comments);
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col className="d-flex" xs={12}>
            {" "}
            <h3>Add Comments</h3>
            <button
              onClick={() => {
                setShowAddCommentModal(true);
              }}
            >
              add Comments
            </button>
          </Col>
          <Col>{renderComments(commentList)}</Col>
        </Row>

        {rennderAddCommentModal()}
      </Container>
    </Layout>
  );
}

export default UserComments;
