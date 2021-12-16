import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileById } from '../../actions/profile'
import Spinner from '../Spinner'
import ProfileFirstSection from './ProfileFirstSection'
import ProfileInfoSection from './ProfileInfoSection'
import ProfilePosts from './ProfilePosts'

const OtherUserProfile = () => {
    const {profile,loading} = useSelector(state => state.profile)
    const currentUser = useSelector(state => state.auth.user)
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const dispatch = useDispatch()
    const params=useParams()
    useEffect(()=>{
        dispatch(getProfileById(params.userId))
    },[dispatch,params.userId])

    var img = new Image();
    img.src = profile && profile.user.avatar
    img.style.display = "none";
    img.onload = function(){
    this.style.display = "block";
    this.id='profile_avatar'
    if(this.width>this.height){
        setHeight(200)
        setWidth(null)
    }
    if(this.height>this.width){
        setWidth(200)
        setHeight(null)
    }
}
const dateGetYear=date=>date ?new Date(date).getFullYear():null
function formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var d = new Date(date),
        month = d.getMonth(),
        day = d.getDate()+",",
        year = d.getFullYear();
    return [monthNames[month],day, year].join(' ');
}

const checkProfile=profile=>Object.values({...profile,__v:0}).filter(e=>e)
return(
    loading ? <Spinner/>:
    <Fragment>
        {profile !== null &&
        <div id="profile" className='otherUserProfile'>
            <ProfileFirstSection profile={profile} currentUser={currentUser} height={height} width={width}/>
            {checkProfile(profile).length<4 &&<p id="no-pro">This user has no profile yet.</p>}
            <ProfileInfoSection profile={profile} formatDate={formatDate} dateGetYear={dateGetYear}/>
        </div>}
        <ProfilePosts/>
    </Fragment>
)
}

export default OtherUserProfile
