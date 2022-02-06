import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postPost } from '../../actions/post'

const Poster = () => {
    const {user}= useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    var img = new Image();
    img.src = user && user.avatar
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

const onSubmit=()=>{
    if(text){
        if(text.trim()){
            dispatch(postPost(text))
            return false
        }
    }
    
    
}
    return (
        <div id="posterDiv">
        <form id="poster" onSubmit={onSubmit}>
            <fieldset id="posterField">
            <div id="profiles_avatar_container">
                <img src={user && user.avatar} alt="" width={width} height={height}/>
            </div>
            <input type="text" placeholder={`What's on your mind, ${user && user.name.split(" ")[0]} ?`} value={text} onChange={e=>setText(e.target.value)}/>
            </fieldset>
            <fieldset id="share_upload_btns">
                <button>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#0c6e32"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"></path>
                    </svg>
                    Upload image
                </button>
                <button type='submit'>
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#346275"><path d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"></path>
                </svg>
                        Share
                </button>
            </fieldset>
        </form>
        <hr />
        </div>
    )
}

export default Poster
