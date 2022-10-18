const NewComment = (id, comment, user, isReply, replyingTo, isTagWrong) => {
  return !isReply
    ? {
        id: id,
        content: comment,
        createdAt: "1 min ago",
        score: 0,
        user: user,
        replies: [],
      }
    : {
        id: id,
        content: comment,
        createdAt: "1 min ago",
        score: 0,
        replyingTo: replyingTo,
        user: user,
        tagStatus: isTagWrong,
      };
};

export default NewComment;
