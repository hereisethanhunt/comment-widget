import { usePost } from "../context/CommentsContext";
import CommentList from './CommentList';
import CommentForm from "./CommentForm";

const Post = () => {
    
    const { post, rootComments, createComment } = usePost();

    const onReply = (message) => {
      createComment(message, null);  
    }

  return (
    <>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm onSubmit={onReply} />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  )
}

export default Post;