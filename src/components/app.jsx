import Comment from "./comment";
import AddComment from "./addComment";
import DeleteModal from "./deleteModal";
import NewComment from "./newCommentObj";

import { useState, useEffect, Fragment } from "react";

const dataURL = "data.json";

const App = () => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [deletedComment, setDeletedComment] = useState({});
  const [nextId, setNextId] = useState(5);

  const getItems = async () => {
    const response = await fetch(dataURL);
    const data = await response.json();
    setComments(data.comments);
    setUser(data.currentUser);
  };

  useEffect(() => {
    getItems().catch((error) => console.log(error));
  }, []);

  const handleModal = (id, isReply) => {
    setShowModal(true);
    setDeletedComment({ id, isReply });
  };

  const handleConfirm = ({ id, isReply }) => {
    setShowModal(false);
    const arr = [...comments];
    for (let i = 0; i < arr.length; i++) {
      if (!isReply) {
        if (arr[i].id === id) {
          arr.splice(i, 1);
        }
      } else if (arr[i].replies.length !== 0) {
        let arrReplies = arr[i].replies;
        for (let j = 0; j < arrReplies.length; j++) {
          if (arrReplies[j].id === id) {
            arrReplies.splice(j, 1);
          }
        }
      }
    }
    setComments(arr);
  };

  const handleEdit = (id, comment, isReply) => {
    let arr = [...comments];
    for (let i = 0; i < arr.length; i++) {
      if (!isReply) {
        if (arr[i].id === id) {
          arr[i].content = comment;
        }
      } else if (arr[i].replies.length !== 0) {
        let arrReplies = arr[i].replies;
        for (let j = 0; j < arrReplies.length; j++) {
          if (arrReplies[j].id === id) {
            arrReplies[j].content = comment;
          }
        }
      }
    }
    setComments(arr);
  };

  const handleVote = (id, vote, isReply) => {
    let arr = [...comments];
    for (let i = 0; i < arr.length; i++) {
      if (!isReply) {
        if (arr[i].id === id) {
          arr[i].score = vote;
        }
      } else if (arr[i].replies.length !== 0) {
        let arrReplies = arr[i].replies;
        for (let j = 0; j < arrReplies.length; j++) {
          if (arrReplies[j].id === id) {
            arrReplies[j].score = vote;
          }
        }
      }
    }
    setComments(arr);
    if (!isReply) handleReorder();
  };

  const handleReorder = () => {
    let arr = [...comments];
    arr.sort((x, y) => {
      return x.score > y.score ? -1 : 1;
    });
    setComments(arr);
  };

  const handleReply = (
    id,
    name,
    reply,
    isReply,
    originalCommentId = undefined,
    isTagWrong
  ) => {
    const newComment = NewComment(nextId, reply, user, true, name, isTagWrong);
    const arr = [...comments];
    const originalId = !isReply ? id : originalCommentId;
    const commentIndx = arr.findIndex((obj) => obj.id === originalId);
    arr[commentIndx].replies.push(newComment);
    setComments(arr);
    setNextId(nextId + 1);
  };

  const handleSubmit = (comment) => {
    const newComment = NewComment(nextId, comment, user, false);
    const arr = [...comments];
    arr.push(newComment);
    setComments(arr);
    setNextId(nextId + 1);
  };

  return (
    <main className="page bg-light-blue py-5 position-relative">
      <div className="container d-flex flex-column align-items-center">
        <div className="width-fit">
          {comments.map((comment) => {
            return (
              <Fragment key={comment.id}>
                <Comment
                  id={comment.id}
                  name={comment.user.username}
                  pic={comment.user.image.png}
                  date={comment.createdAt}
                  votes={comment.score}
                  comment={comment.content}
                  currentUser={user}
                  onVote={handleVote}
                  onDelete={handleModal}
                  onReply={handleReply}
                  onEdit={handleEdit}
                />
                {comment.replies.length > 0 ? (
                  <div className="replies ms-md-auto width-fit">
                    {comment.replies.map((reply) => (
                      <Comment
                        key={reply.id}
                        id={reply.id}
                        name={reply.user.username}
                        pic={reply.user.image.png}
                        date={reply.createdAt}
                        votes={reply.score}
                        comment={reply.content}
                        currentUser={user}
                        isReply="true"
                        replyingTo={reply.replyingTo}
                        originalCommentId={comment.id}
                        tagStatus={reply.tagStatus}
                        onDelete={handleModal}
                        onEdit={handleEdit}
                        onVote={handleVote}
                        onReply={handleReply}
                      />
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </Fragment>
            );
          })}
          <AddComment
            className="width-fit"
            user={user}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      {showModal ? (
        <DeleteModal
          onConfirm={() => handleConfirm(deletedComment)}
          onCancel={() => setShowModal(false)}
        />
      ) : (
        ""
      )}
    </main>
  );
};

export default App;
