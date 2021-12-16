import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfileItem = ({profile}) => {
    const user = useSelector(state => state.auth.user)
    const navigate=useNavigate()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    var img = new Image();
    img.src = profile && profile.user.avatar
    img.style.display = "none";
    img.onload = function(){
    this.style.display = "block";
    this.id='profile_avatar'
    if(this.width>this.height){
        setHeight(40)
        setWidth(null)
    }
    if(this.height>this.width){
        setWidth(40)
        setHeight(null)
    }
    if(this.width===this.height){
        setWidth(40)
        setHeight(40)
    }
}
    return (
        <li onClick={()=>{navigate(profile.user._id===user._id? "/profile":`/profile/${profile.user._id}`)}}>
        <div id="profiles_avatar_container">
            <img src={profile && profile.user.avatar} alt="" width={width} height={height}/>
        </div>
        <h4>{profile.user.name}</h4>
    </li>
    )
}

export default ProfileItem
