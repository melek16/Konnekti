import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import Post from '../posts/Post'

const ProfilePosts = () => {
    const {posts} = useSelector(state => state.post)
    const {profile} = useSelector(state => state.profile)
    const dispatch = useDispatch()
    useEffect(()=>dispatch(getPosts()),[dispatch])
    return (
        <div id='posts'>
        {
            posts.map(post=>profile.user._id===post.user._id?<Post post={post}/>:null)

        }
    </div>
    )
}

export default ProfilePosts
