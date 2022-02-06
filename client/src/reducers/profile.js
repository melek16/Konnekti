import { CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, MODIFY_AVATAR, PROFILE_ERROR} from "../actions/types"

const initialState={
    profile:null,
    profiles:[],
    loading:true,
    error:{}
}

export default function profile(state=initialState,{type,payload}){
    switch (type) {
        case GET_PROFILE:
            return {...state,profile:payload,loading:false}
        case GET_PROFILES:
            return {...state,profiles:payload,loading:false}
        case MODIFY_AVATAR:
            return {...state,profile:{...state.profile,user:payload}}
        case PROFILE_ERROR:
            return {...state,error:payload}
        case CLEAR_PROFILE:
            return {...state,loading:true,profile:null}
        default:
            return state
    }
}