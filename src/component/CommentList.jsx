import { Comment } from "./Comment"
import { useParams } from "react-router-dom"

function CommentList({ comments }) {
  const { id } = useParams();
  return comments.filter(comment => comment.postId === id).map(comment => (
    <div key={comment.id} className="comment-stack">
      <Comment {...comment} />
    </div>
  ))
}

export default CommentList;