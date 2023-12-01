import React, { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';

import Comment from './Comment';
import App from "./App"
import CommentForm from "./CommentForm"

// View for when an app is clicked on to also show comments.
export default function AppView({ select, setSelect, user }) {

    const [comments, setComments] = useState([]);

    const fetchComments = () => {
        fetch(`/api/comments/?id=${select.id}`, { method: "GET" })
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

            {/* Comment Submission -only show to logged in users*/}
            {JSON.stringify(user) === '{}' ? <></> :
                <CommentForm app={select} user={user} update={fetchComments} />}

            {/* Map Comments*/}
            <div>{comments.map((c) => <Comment refresh={fetchComments} c={c} user={user} />)}</div>
        </>
    );
};