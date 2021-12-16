import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../Spinner'
import Post from './Post'

const Posts = () => {
    const {posts,loading} = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(()=>dispatch(getPosts()),[dispatch])
    return (
       loading ? <Spinner/> : <div id='posts'>
        {
            posts.map((post,i)=><Post key={i} post={post}/>)

        }
    </div>
    )
}

export default Posts
