import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export default function CommentForm({ app, user, update }) {
    const [formData, setFormData] = useState({
        user: user.id,
        app: app.id,
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Form
            action="/api/post/"
            method="POST"
            onSubmit={(e) => {
                e.preventDefault();

                fetch(e.target.action, {
                    method: e.target.method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Post successful:', data); // Show response
                        update();
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }}>

            <Form.Group controlId="content">
                <FloatingLabel label="Content">

                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </FloatingLabel>

            </Form.Group>
            <Button variant="primary" type="submit">
                Post Comment
            </Button>
        </Form>);
}