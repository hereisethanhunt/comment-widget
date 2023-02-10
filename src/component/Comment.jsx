import { IconBtn } from "./IconBtn"
import { FaEdit, FaReply, FaTrash } from "react-icons/fa"
import { usePost } from "../context/CommentsContext"
import CommentList  from "./CommentList"
import CommentForm from "./CommentForm";
import { dateFormatter, currentUser } from "../utils/commentUtils";
import { useState } from "react"

export function Comment({
  id,
  message,
  user,
  createdAt,
}) {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const {
    getReplies,
    createComment,
    updateComment,
    deleteComment
  } = usePost()

  const childComments = getReplies(id)

  const onCommentDelete = () => {
    deleteComment(id);
  }

  const onReply = (message) => {
    createComment(message, id);
    setIsReplying(false);
  }

  const onCommentUpdate = (message) => {
    updateComment(id, message)
    setIsEditing(false)
  }

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        
        {isEditing ? (
          <CommentForm
            onSubmit={onCommentUpdate}
            autoFocus
            initialValue={message}
          />
        ) : (
          <div className="message">{message}</div>
        )}

        <div className="footer">
          <IconBtn
            onClick={() => setIsReplying(prev => !prev)}
            isActive={isReplying}
            Icon={FaReply}
            aria-label={isReplying ? "Cancel Reply" : "Reply"}
          />
          {user.id === currentUser.id && (
            <>
              <IconBtn
                onClick={() => setIsEditing(prev => !prev)}
                isActive={isEditing}
                Icon={FaEdit}
                aria-label={isEditing ? "Cancel Edit" : "Edit"}
              />
              <IconBtn
                onClick={onCommentDelete}
                Icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          )}
        </div>
      </div>

      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            onSubmit={onReply}
            autoFocus
          />
        </div>
      )}

      {childComments?.length > 0 && (
        <>
          <div
            className={`nested-comments-stack`}
          >
            <div
              className="reply-line" />
            <div className="nested-comments">
              <CommentList comments={childComments} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
