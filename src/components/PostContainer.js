import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPost, goToHome} from "../modules/posts";
import Post from "./Post";

function PostContainer({postId}) {
    const {data, loading, error} = useSelector(state => state.posts.post[postId]) || {
        loading: false,
        data: null,
        error: null
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(postId));
    }, [postId, dispatch]);

    if (loading && !data) return <div>로딩중...</div>;
    if (error) return <div>에러 발생!</div>;
    if (!data) return null;
    return (
        <>
            <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
            <Post post={data}/>
        </>
    );
}

export default PostContainer;