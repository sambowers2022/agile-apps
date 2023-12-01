import React from 'react';
import { Card, Button } from 'react-bootstrap';

// Creates a card representing object c.
const Comment = ({ refresh, c, user }) => {
  // Method for moderators to delete comments
  const handleDelete = () => {
    fetch(`/api/comments/?id=${c.app}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: user.token,
        id: c.id,
      }),
    })
      .then(() => refresh()) // Refresh comments on delete
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{c.username}</Card.Title>
        <Card.Text>{c.content}</Card.Text>
        {/* Only show delete button to moderators and above */}
        {user.auth > 1 ? <Button variant="danger" onClick={handleDelete}>
          Delete Comment 
        </Button> : <></>}
      </Card.Body>
    </Card>
  );
};

export default Comment;