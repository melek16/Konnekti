import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileFirstSection = ({profile,avatarForm,onChange,onSubmit,closeAvatarForm,height,width,currentUser}) => {
    const navigate=useNavigate()
    const current=profile&&currentUser&&(currentUser._id===profile.user._id)
    const checkProfile=profile=>Object.values({...profile,__v:0}).filter(e=>e)
    return (
<section id="name_avatar_section">
                <div id="name_avatar">
                    {avatarForm && <form onSubmit={onSubmit}>
                        <span id="x" onClick={closeAvatarForm}>X</span>
                        <input type="file" onChange={onChange}/>
                        <input type="submit" value='Upload' />
                    </form>}
                    <div id="modify_Avatar_btn">
                        <div id='profile_avatar_container'>
                            <img id='profile_avatar' src={profile && profile.user.avatar} alt=""  height={height} width={width}
                            />
                        </div>
                        {current && <button id="cameraBtn" onClick={closeAvatarForm}>
                        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                            <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"></path> 
                        </svg>
                        </button>}
                    </div>
                    <h2>{profile && profile.user.name}</h2>
                    <p>{profile.bio&&profile.bio.trim() && profile.bio.trim()}</p>
                </div>  
                {checkProfile(profile).length>3 && current&&
                <button id="edit_profile_btn" onClick={()=>navigate('/create-profile')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
                </svg>
                <p>Edit profile</p>  
                    </button>}
                </section>
    )
}

export default ProfileFirstSection
