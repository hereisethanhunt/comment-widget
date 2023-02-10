import postData from '../sampleData/postData.json';
import { useParams } from "react-router-dom";


export const deleteAllChildPosts = (commentsByParentId, id, arr) => {
	arr.push(id);
	if(commentsByParentId[id] === undefined)    	
        return arr;
        
    for(let i = 0; i< commentsByParentId[id].length; i++)
    deleteAllChildPosts(commentsByParentId, commentsByParentId[id][i].id, arr);
    
    console.log(arr);
    return arr;
}

export const setLocalStorage = (value) => {
    localStorage.setItem("Comment", JSON.stringify(value));
}

export const getCommentFromLocalStorage = () => {
    return localStorage.getItem("Comment") && JSON.parse(localStorage.getItem("Comment"));
}


export const useGetPostById = () => {
    const { id } = useParams()
   const postById = postData?.filter(post => post.id === id);

   if(postById && postById.length)
       return { error : undefined , value : postById[0]}
   
   return { error: new Error('Post does not exist'), value : [] }
}

export const useGetPosts = () => {
    if(postData && postData.length)
       return { error : undefined , value : postData}
   return { error: new Error('Posts are not defined'), value : [] }
}

// this is static just for normal showcase purpose
export const currentUser = {
    "id" : "1",
    "name": "Vishal Bisht"
}

export const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })