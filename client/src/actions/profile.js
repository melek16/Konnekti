import axios from 'axios'
import {PROFILE_ERROR,GET_PROFILE, MODIFY_AVATAR, GET_PROFILES, CLEAR_PROFILE} from './types'


//get current useres profile
export const getCurrentProfile=()=> async dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    try {
        const res=await axios.get('api/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//get all profiles
export const getProfiles=()=> async dispatch=>{
    try {
        const res=await axios.get('api/profile')
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//get profile by ID
export const getProfileById=(userId)=> async dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    try {
        const res=await axios.get(`/api/profile/user/${userId}`)
        console.log(res.data)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}


//create or update profile
export const createProfile=(newProfile)=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify(newProfile)
    try {
        const res=await axios.post('api/profile',body,config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}



//modify avatar
export const avatarUpdate=(file)=>async dispatch=>{
    try {
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        let res=await axios.post('/api/auth/avatarUpdate',file,{headers: {
            'Content-Type': 'multipart/form-data'
        }})
        
        const res2=await axios.post(`api/users/avatarUpdate/${res.data.filename}`,{"avatar":`http://localhost:5000/api/auth/avatar/${res.data.id}/${res.data.filename}`},config)
        dispatch(getProfiles())
        dispatch({
            type:MODIFY_AVATAR,
            payload:res2.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
