import { Routes, Route } from "react-router-dom"
import PostList from "./component/PostList";
import Post from "./component/Post";
import { PostProvider } from '../src/context/CommentsContext'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
