import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost, unlikePost } from '../../actions/post'
import CommentAdder from './CommentAdder'
import Comments from './Comments'

const Post = ({post}) => {
    const {user}= useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [commenting, setCommenting] = useState(false)
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    var img = new Image();
    img.src = post && post.user.avatar
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
const liked=user && post.likes.map(like=>like.user).includes(user._id) 
    return (
        <div className='post'>
            {user&&(user._id===post.user._id) && <button id="deletePost" onClick={()=>dispatch(deletePost(post._id))}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path>
                </svg>
            </button>}


            <div className='postOwner'>
                    <div id="profiles_avatar_container">
                        <img src={post && post.user.avatar} alt="" width={width} height={height}/>
                    </div>
                    <div>
                        <h4>{post.name}</h4>
                        <p>{formatDate(post.date)}</p>
                    </div>    
            </div>
            
            <p className='postText'>{post.text}</p>



            <div className='postInfo'>
                    {post.likes.length>0 ?<p>{post.likes.length} like{post.likes.length>1 && 's'}</p>:<p></p>}
                    {post.comments.length>0 ?<p>{post.comments.length} comment{post.comments.length>1 && 's'}</p>:<p></p>}
            </div>




            <div className='like_comment_btns'>
                <button className={liked? 'liked':'unliked'} onClick={liked?()=>dispatch(unlikePost(post._id)):()=>dispatch(likePost(post._id))}>
                {liked?
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  fill="currentColor"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
</svg>
                :<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                </svg>}
                    Like
                </button>
                <button onClick={()=>setCommenting(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                </svg>
                    Comment
                </button>
            </div>
            <Comments comments={post.comments} postId={post._id}/>
            <CommentAdder postId={post._id} focus={commenting}/>
        </div>
    )
}

export default Post
