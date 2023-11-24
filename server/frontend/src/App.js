import React from 'react';
import { Button, Card, ListGroup, Stack } from 'react-bootstrap';

export default function App({ a, setSelect }) {
    return <Card bg="primary" text="white">
        <Card.Body>
            <Card.Title><a className="text-white" onClick={() => setSelect(a)} href="#">{a.name}</a></Card.Title>
            <Card.Text>{a.desc}</Card.Text>
            <Card.Text>By: {a.org}</Card.Text>
            <ListGroup variant="flush" bg="primary">
                <Stack direction="horizontal" gap={3}>
                    <Button variant="success" active>{a.price == 0 ? 'Free' : '$' + a.price}</Button>
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