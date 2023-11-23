import React from 'react';
import { Card, ListGroup, Stack } from 'react-bootstrap';

export default function App({a, setSelect}) {
    return <Card bg="primary" text="white">
        <Card.Body>
            <Card.Title><a className="text-white" onClick={()=>setSelect(a)} href="#">{a.name}</a></Card.Title>
            <Card.Text>{a.desc}</Card.Text>
            <Card.Text>By: {a.org}</Card.Text>
            <ListGroup variant="flush" bg="primary">
                <Stack direction="horizontal" gap={3}>
                {a.platforms.map((p, index) => (
                    <ListGroup.Item key={index} bg="primary" text="primary">
                        <a href={p.link} target="_blank">
                            {p.name}
                        </a>
                    </ListGroup.Item>
                ))}
                </Stack>
            </ListGroup>
        </Card.Body>
    </Card>;
}