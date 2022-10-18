import { useState, useEffect } from "react";

const AddComment = ({ user, reply, onReply, replyingTo, onSubmit }) => {
  const [comment, setComment] = useState(
    replyingTo !== undefined ? `@${replyingTo} ` : ""
  );
  const [img, setImg] = useState("");

  useEffect(() => {
    if (user.image === undefined) return;
    setImg(user.image.png);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply) {
      let editedComment = comment.split(replyingTo)[1];
      if (editedComment === undefined) {
        editedComment = comment;
        onReply(editedComment, true);
      } else {
        onReply(editedComment, false);
      }
    } else {
      onSubmit(comment);
    }
    setComment("");
  };

  return (
    <form
      className="d-flex align-items-center align-items-md-start gap-3 flex-wrap flex-md-nowrap mx-0 bg-white p-3 p-md-4 rounded-3"
      onSubmit={handleSubmit}
    >
      <div className="px-0 pic-holder">
        <img src={img} alt="user" className="user-pic" />
      </div>
      <div className="form-check p-0 mb-0">
        <textarea
          name="comment"
          id="comment"
          placeholder="Add a comment..."
          value={comment}
          className="w-100 rounded-3 px-3 py-2"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit" className="main-btn btn submit-btn">
        {reply ? "reply" : "send"}
      </button>
    </form>
  );
};

export default AddComment;
