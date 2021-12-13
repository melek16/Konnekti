import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { avatarUpdate, getCurrentProfile} from '../actions/profile'
import ProfileFirstSection from './profiles/ProfileFirstSection'
import ProfileInfoSection from './profiles/ProfileInfoSection'
import Spinner from './Spinner'


const Profile = () => {
    const {profile,loading} = useSelector(state => state.profile)
    const currentUser = useSelector(state => state.auth.user)
    const [file, setFile] = useState()
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [avatarForm, setAvatarForm] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCurrentProfile())
    },[dispatch])

    var img = new Image();
    img.src = profile && profile.user.avatar
    img.style.display = "none";
    img.onload = function(){
    // console.log("Image Loaded");
    this.style.display = "block";
    this.id='profile_avatar'
    // console.log(this.width)
    // console.log(this.height)
    if(this.width>this.height){
        setHeight(200)
        setWidth(null)
    }
    if(this.height>this.width){
        setWidth(200)
        setHeight(null)
    }
    if(this.width===this.height){
        setWidth(200)
        setHeight(200)
    }
}
    
    const onChange = e => {
        console.log(e.target.files[0])
        if(e.target.files[0]){
        setFile(e.target.files[0]);
        }
    }
    ;
    const onSubmit =e => {
        e.preventDefault();
        setAvatarForm(false)
        const formData = new FormData();
        formData.append('file', file);
        dispatch(avatarUpdate(formData))
    } 
    const closeAvatarForm=()=>{
        setAvatarForm(!avatarForm)
        setFile()
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
            console.log(month)
        return [monthNames[month],day, year].join(' ');
    }
    return(
        loading && profile===null? <Spinner/>:
        <Fragment>
            {profile !== null ?
            <div id="profile">
                <ProfileFirstSection profile={profile} onChange={onChange} onSubmit={onSubmit} avatarForm={avatarForm} closeAvatarForm={closeAvatarForm}
                height={height} width={width} currentUser={currentUser}/>
                <ProfileInfoSection profile={profile} formatDate={formatDate} dateGetYear={dateGetYear}/>

            </div>:
            <div className='SpinnerContainer'>
            <div id="create_profile_btn">
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="create-profile">Create profile</Link>
            </div>
            </div>}

        </Fragment>
    )
}


export default Profile
