import React, { useContext, useEffect, useMemo, useState } from "react"
import {
    deleteAllChildPosts, 
    setLocalStorage, 
    getCommentFromLocalStorage, 
    useGetPostById, 
    currentUser 
} from '../utils/commentUtils'
import { v4 as uuidv4 } from 'uuid';
 
const Context = React.createContext()

export const usePost = () => {
  return useContext(Context)
}

export const PostProvider = ({ children }) => {

  const { error, value: post } = useGetPostById();
  const [comments, setComments] = useState([]);

  const commentsByParentId = useMemo(() => {
    const group = {}
    comments.forEach(comment => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })
    return group
  }, [comments])


  useEffect(() => {
    if(getCommentFromLocalStorage() === null || getCommentFromLocalStorage() === undefined)
        return;
    setComments(getCommentFromLocalStorage());
  }, []);

  const getReplies = (parentId) => {
    return commentsByParentId[parentId]
  }

   const createComment = (message, parentId) => {

    const comment = {
        message,
        parentId,
        createdAt: new Date(),
        user: currentUser,
        id: uuidv4(),
        postId: post.id
    }
    let newComments = [...comments, comment]

    setLocalStorage(newComments);
    setComments(newComments)
  }

  const updateComment = (id, message) => {

    const updatedComments = comments.map(comment => {
        if (comment.id === id) return { ...comment, message }
        else return comment
      });

      setLocalStorage(updatedComments);
      setComments(updatedComments);
  }

  const deleteComment = (id) => {

    const deletedCommentIds = deleteAllChildPosts(commentsByParentId, id, []);
    const deletedComments = comments.filter((comment) => {
        return deletedCommentIds.indexOf(comment.id) === -1
    });

    setLocalStorage(deletedComments);
    setComments(deletedComments);
  }

  return (
    <Context.Provider
      value={{
        post: post,
        rootComments: commentsByParentId[null],
        getReplies,
        createComment,
        updateComment,
        deleteComment,
      }}
    >
      {error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  )
}
