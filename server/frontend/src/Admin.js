import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function Admin(props) {
    const [data, setData] = useState([]);

    const [delId, setDelId] = useState(-1);

    const fetchData = () => {
        fetch(`http://127.0.0.1:8000/api/pending/`, { method: "GET" })
            .then(response => response.json())
            .then(json => setData(json));
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleApprove = (id) => {
        // Send a POST request to approve the record
        fetch('http://127.0.0.1:8000/api/pending/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, approved: true, token: props.token }),
        })
            .then(response => {
                if (response.ok) {
                    // Refresh the data when the request is successful
                    fetchData();
                }
                else {
                    alert("Failed to delete element.")
                }
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDeny(delId);
    }

    const handleIdChange = (e) => {
        setDelId(e.target.value)
    }

    const handleDeny = (id) => {
        console.log(id)
        // Send a POST request to deny the record
        if (!confirm(`Confirm delete element of ID: ${id}`)) return;
        fetch('http://127.0.0.1:8000/api/pending/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, approved: false, token: props.token }),
        })
            .then(response => {
                if (response.ok) {
                    // Refresh the data when the request is successful
                    fetchData();
                }
            });
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>App ID:</Form.Label>
                    <Form.Control onChange={handleIdChange} type="text" />
                </Form.Group>
                <Button type="submit" variant="danger">DELETE</Button>
            </Form >
            <div className='main'>
                <table className="apps">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Organization</th>
                            <th>Platforms</th>
                            <th>Price</th>
                            <th>Approve</th>
                            <th>Deny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((e) => (
                                <tr className="appsRow" key={e.id}>
                                    <td>{e.name}</td>
                                    <td>{e.desc}</td>
                                    <td>{e.org}</td>
                                    <td>
                                        {e.platforms.map(p => (
                                            <a href={p.link} target="_blank" key={p.id}>
                                                {p.name}
                                            </a>
                                        ))}
                                    </td>
                                    <td>{e.price === 0 ? 'Free' : '$' + e.price}</td>
                                    <td>
                                        <button onClick={() => handleApprove(e.id)}>Approve</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeny(e.id)}>Deny</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No pending apps</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
