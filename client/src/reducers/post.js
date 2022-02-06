import { GET_POSTS,POST_ERROR,  POST_SUCCESS } from "../actions/types";

const initialState={
    posts:[],
    post:null,
    loading:true,
    error:{}
}



export default function post(state=initialState,{payload,type}){
    switch (type) {
        case GET_POSTS:
            return {...state,posts:payload,loading:false}
        case POST_ERROR:
            return {...state,error:payload}
        case POST_SUCCESS:
            return {...state,posts:[payload,...state.posts]}
        default:
            return state
    }
}