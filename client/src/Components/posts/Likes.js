import React from 'react'
import { useSelector } from 'react-redux'
import Like from './Like'

const Likes = ({likes,setShowLikes}) => {
    const {user} = useSelector(state => state.auth)
    const currentUserLike=likes.find(like=>like.user===user._id)
    let sortedLikes=currentUserLike?[currentUserLike,...likes.filter(like=>like.user!==user._id)]:likes
    return (
        <div id="like_container">
        <div id="whoLiked">
            <p id="x" onClick={()=>setShowLikes(false)}>x</p>
            {
                sortedLikes.map((like,key)=><Like like={like} currentUser={user} key={key}/>)
            }
        </div>
        </div>
    )
}

export default Likes
