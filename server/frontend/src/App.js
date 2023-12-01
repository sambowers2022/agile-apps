import React from 'react';
import { Button, Card, ListGroup, Stack } from 'react-bootstrap';

// Display an app object 'a' as a card.
export default function App({ a, setSelect }) {
    return <Card bg="primary" text="white" id={a.id}>
        <Card.Body>
            {/* set selected app to 'a' if title is clicked */}
            <Card.Title><a className="text-white" onClick={() => setSelect(a)} href="#">{a.name}</a></Card.Title>
            <Card.Text>{a.desc}</Card.Text>
            <Card.Text>By: {a.org}</Card.Text>

            <ListGroup variant="flush" bg="primary">
                <Stack direction="horizontal" gap={3}>
                    <Button variant="success" active>{a.price == 0 ? 'Free' : '$' + a.price}</Button>
                    
                    {/* Map platoforms to be buttons with link */}
                    {a.platforms.map((p, index) => (
                        <Button variant="secondary" href={p.link} target="_blank">
                            {p.name}
                        </Button>
                    ))}
                </Stack>
            </ListGroup>

        </Card.Body>
    </Card>;
}