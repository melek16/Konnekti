import axios from 'axios'
import { getPosts } from './post'
import {PROFILE_ERROR,GET_PROFILE, MODIFY_AVATAR, GET_PROFILES, CLEAR_PROFILE, LOGOUT} from './types'



//get current useres profile
export const getCurrentProfile=()=> async dispatch=>{
    dispatch({
        type:CLEAR_PROFILE
    })
    try {
        const res=await axios.get('/api/profile/me')
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.message}
        })
    }
}


//get all profiles
export const getProfiles=()=> async dispatch=>{
    try {
        const res=await axios.get('/api/profile')
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:'error all'}
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
        console.log(`res:${res.data}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:"error byId"}
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
        console.log(newProfile)
        const res=await axios.post('/api/profile',body,config)
        console.log('res.data')
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

//delete user
export const deleteUser=()=>async dispatch=>{
    try {
        await axios.delete('/api/profile')
        dispatch({
            type:LOGOUT
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:'error all'}
        })
    }
}


//add experience
// export const addExperience=(newExp)=>async dispatch=>{
//     const config={
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }
//     const body=JSON.stringify(newExp)
//     try {
//         const res=await axios.put('api/profile/experience',body,config)
//         dispatch({
//             type:GET_PROFILE,
//             payload:res.data
//         })
//     } catch (error) {
//         dispatch({
//             type:PROFILE_ERROR,
//             payload:{msg:error.response.statusText,status:error.response.status}
//         })
//     }
// }



// //add education
// export const addEducation=(newEdu)=>async dispatch=>{
//     const config={
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }
//     const body=JSON.stringify(newEdu)
//     try {
//         const res=await axios.put('api/profile/education',body,config)
//         dispatch({
//             type:GET_PROFILE,
//             payload:res.data
//         })
//     } catch (error) {
//         dispatch({
//             type:PROFILE_ERROR,
//             payload:{msg:error.response.statusText,status:error.response.status}
//         })
//     }
// }

// //delete Experience
// export const RemoveExp=(exp_id)=>async dispatch=>{
//     try {
//         const res=await axios.delete(`api/profile/experience/${exp_id}`)
//         dispatch({
//             type:GET_PROFILE,
//             payload:res.data
//         })
//     } catch (error) {
//         dispatch({
//             type:PROFILE_ERROR,
//             payload:{msg:error.response.statusText,status:error.response.status}
//         })
//     }
// }


// //delete Education
// export const RemoveEdu=(edu_id)=>async dispatch=>{
//     try {
//         const res=await axios.delete(`api/profile/education/${edu_id}`)
//         dispatch({
//             type:GET_PROFILE,
//             payload:res.data
//         })
//     } catch (error) {
//         dispatch({
//             type:PROFILE_ERROR,
//             payload:{msg:error.response.statusText,status:error.response.status}
//         })
//     }
// }


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
        const newAvatar=`http://192.168.1.4:3000/api/auth/avatar/${res.data.id}/${res.data.filename}`
        const res2=await axios.post(`api/users/avatarUpdate/${res.data.filename}`,{"avatar":newAvatar},config)
        
        
        dispatch({
            type:MODIFY_AVATAR,
            payload:res2.data
        })
        dispatch(getProfiles())
        axios.put('/api/post/avatarModification',{filename:res.data.filename,newAvatar},config)
        dispatch(getPosts())
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:error.response.statusText,status:error.response.status}
        })
    }
}
