import { REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT, MODIFY_AVATAR} from "../actions/types";

const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function auth(state=initialState,{type,payload}){
    switch (type) {
        case USER_LOADED:
            return {...state,isAuthenticated:true,loading:false,user:payload}
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {...state,...payload,isAuthenticated:true,loading:false}
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {...state,token:null,isAuthenticated:false,loading:false}
        case MODIFY_AVATAR:
            return {...state,user:payload}
        default:
            return state
    }
}