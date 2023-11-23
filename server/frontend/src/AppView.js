import React, { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

import Comment from './Comment';
import App from "./App"
import CommentForm from "./CommentForm"

export default function AppView({ select, setSelect, user }) {

    const [comments, setComments] = useState([]);

    const fetchComments = () => {
        fetch(`http://127.0.0.1:8000/api/comments/?id=${select.id}`, { method: "GET" })
            .then(response => response.json())
            .then(json => setComments(json));
    };

    useEffect(() => {
        fetchComments();
    }, []);

    console.log(select)

    return (
        <>
            <CloseButton onClick={() => setSelect({})} />
            {/* Add App info */}
            <App a={select} />

            {/* Add Comment Submission */}
            {JSON.stringify(user) === '{}' ? <></> :
                <CommentForm app={select} user={user} update={fetchComments} />}
            {/* Map Comments*/}
            <div>{comments.map((c) => <Comment c={c} user={user} />)}</div>
        </>
    );
};