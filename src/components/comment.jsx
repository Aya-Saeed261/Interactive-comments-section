import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import replyIcon from "../images/icon-reply.svg";
import { Fragment, useState } from "react";
import AddComment from "./addComment";

const Comment = ({
  id,
  name,
  pic,
  date,
  votes,
  comment,
  currentUser,
  isReply = false,
  replyingTo,
  originalCommentId,
  tagStatus,
  onDelete,
  onEdit,
  onVote,
  onReply,
}) => {
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [vote, setVote] = useState(votes);
  const [isTagWrong, setTagStatus] = useState(tagStatus);
  const [currentComment, setCurrentComment] = useState(
    isReply ? `@${replyingTo} ${comment}` : comment
  );

  return (
    <div className="mb-3">
      <div className="width-fit d-flex flex-column-reverse flex-md-row gap-4 bg-white p-3 p-md-4 rounded-3 mb-2 position-relative">
        <div className="votes-holder bg-light-blue d-flex d-md-block align-self-start py-1 rounded-3">
          <button
            type="button"
            aria-label="upvote"
            className={`control-votes btn bold p-0 blue-gray ${
              isUpvoted ? "voted" : ""
            }`}
            onClick={() => {
              if (isUpvoted) {
                onVote(id, vote - 1, isReply);
                setVote(vote - 1);
                setIsUpvoted(false);
                return;
              }
              if (isDownvoted) {
                onVote(id, vote + 2, isReply);
                setVote(vote + 2);
                setIsDownvoted(false);
              } else {
                onVote(id, vote + 1, isReply);
                setVote(vote + 1);
              }
              setIsUpvoted(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <span className="votes d-block blue text-center bold my-md-2">
            {vote}
          </span>
          <button
            type="button"
            aria-label="downvote"
            className={`control-votes btn bold p-0 blue-gray ${
              isDownvoted ? "voted" : ""
            }`}
            onClick={() => {
              if (vote === 0) return;
              if (isDownvoted) {
                onVote(id, vote + 1, isReply);
                setVote(vote + 1);
                setIsDownvoted(false);
                return;
              }
              if (isUpvoted) {
                onVote(id, vote - 2 >= 0 ? vote - 2 : 0, isReply);
                setVote(vote - 2 >= 0 ? vote - 2 : 0);
                setIsUpvoted(false);
                if (vote - 2 < 0) return;
              } else {
                onVote(id, vote - 1, isReply);
                setVote(vote - 1);
              }
              setIsDownvoted(true);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <img src={pic} alt="user avatar" className="user-avatar" />
              <p className="mb-0 bolder">
                {name}
                {currentUser.username === name ? (
                  <span className="current-user-badge bold ms-2">you</span>
                ) : (
                  ""
                )}
              </p>
              <p className="grey mb-0">{date}</p>
            </div>
            <div className="header-btns">
              {currentUser.username === name ? (
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn red bold p-0"
                    onClick={() => onDelete(id, isReply)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                  <button
                    className="btn blue bold p-0"
                    onClick={() => setEdit(true)}
                  >
                    <FontAwesomeIcon icon={faPencil} /> Edit
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn p-0 d-flex align-items-center gap-2"
                  onClick={() => {
                    setReply(true);
                  }}
                >
                  <img src={replyIcon} alt="icon" />
                  <span className="blue bold">Reply</span>
                </button>
              )}
            </div>
          </div>
          {!edit ? (
            <p className={`${isReply ? "reply" : "comment"} mb-0 grey mt-3`}>
              {isReply && !isTagWrong ? (
                <span className="blue bolder">@{replyingTo} </span>
              ) : (
                ""
              )}
              {comment}
            </p>
          ) : (
            <Fragment>
              <textarea
                value={currentComment}
                onChange={(e) => setCurrentComment(e.target.value)}
                className="editArea mt-3 reply"
              />
              <button
                type="button"
                className="btn main-btn d-block ms-auto mt-3"
                onClick={() => {
                  setEdit(false);
                  let editedComment = isReply
                    ? currentComment.split(replyingTo)[1]
                    : currentComment;
                  if (editedComment === undefined) {
                    editedComment = currentComment;
                    setTagStatus(true);
                  } else if (isTagWrong) {
                    setTagStatus(false);
                  }
                  onEdit(id, editedComment, isReply);
                }}
              >
                update
              </button>
            </Fragment>
          )}
        </div>
      </div>
      {reply ? (
        <AddComment
          user={currentUser}
          reply={true}
          onReply={(comment, tagStatus) => {
            setReply(false);
            onReply(id, name, comment, isReply, originalCommentId, tagStatus);
          }}
          replyingTo={name}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
