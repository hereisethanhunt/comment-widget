import { Link } from "react-router-dom"
import {useGetPosts} from "../utils/commentUtils"

const PostList = () => {
  const { error, value: posts } = useGetPosts();
  if (error) return <h1 className="error-msg">{error?.message}</h1>

  return posts.map(post => {
    return (
      <h1 key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h1>
    )
  })
}

export default PostList;