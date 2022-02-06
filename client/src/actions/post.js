import axios from 'axios'
import { GET_POSTS,  POST_ERROR,  POST_SUCCESS } from './types'



//get posts
export const getPosts=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/post')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//post a post
export const postPost=(text)=>async dispatch=>{
    try {
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const res=await axios.post('/api/post',{text},config)
        dispatch({
            type:POST_SUCCESS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//delete a post
export const deletePost=(post_id)=>async dispatch=>{
    try {
        await axios.delete(`/api/post/${post_id}`)
        dispatch(getPosts())
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//like a post
export const likePost=post_id=>async dispatch=>{
    try {
        await axios.put(`/api/post/like/${post_id}`)
        dispatch(getPosts())
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



//unlike a post
export const unlikePost=post_id=>async dispatch=>{
    try {
        await axios.put(`/api/post/unlike/${post_id}`)
        dispatch(getPosts())
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//add comment
export const addComment=(post_id,text)=>async dispatch=>{
    try {
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        
        await axios.post(`/api/post/comment/${post_id}`,{text},config)
        dispatch(getPosts())
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



//delete comment
export const deleteComment=(post_id,comment_id)=>async dispatch=>{
    try {
        await axios.delete(`/api/post/comment/${post_id}/${comment_id}`)
        // dispatch({type:POST_LOADING})
        dispatch(getPosts())
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//post photo
// export const postPhoto=(file,postId)=>async dispatch=>{
//     try {
//         const config={
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         }
//         let res=await axios.post('/api/post/postPhoto',file,{headers: {
//             'Content-Type': 'multipart/form-data'
//         }})
        
//         await axios.post(`api/post/postPhoto/${postId}`,{"avatar":`http://localhost:5000/api/post/postPhoto/${res.data.id}`},config)
//         dispatch(getPosts())

//     } catch (error) {
//         dispatch({
//             type:POST_ERROR,
//             payload:{msg:error.response.statusText,status:error.response.status}
//         })
//     }
// }