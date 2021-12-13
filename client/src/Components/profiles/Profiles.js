import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({search}) => {
    const {profiles} = useSelector(state => state.profile)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProfiles())
    },[dispatch])
    
    return (
        <div id="profiles">
            <ul>
            {
                profiles.map((profile,i)=> search && profile.user.name.toLowerCase().includes(search.toLowerCase())?
               <ProfileItem key={i} profile={profile} />:null)
            }
            </ul>
        </div>
    )
}

export default Profiles
