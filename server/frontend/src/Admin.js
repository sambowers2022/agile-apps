import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';


export default function Admin(props) {
    const [data, setData] = useState([]);

    const [delId, setDelId] = useState(-1);

    const [promote, setPromote] = useState({ username: '', selected: 'User' })

    const fetchData = () => {
        fetch(`/api/pending/`, { method: "GET" })
            .then(response => response.json())
            .then(json => setData(json));
    };

    useEffect(() => {
        fetchData();
    }, []);


    const getLevel = () => {
        if (promote.selected == 'Mod') return 2;
        if (promote.selected == 'Admin') return 3;
        return 1;
    };

    const handleApprove = (id) => {
        // Send a POST request to approve the record
        fetch('/api/pending/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, approved: true, token: props.user.token }),
        })
            .then(response => {
                if (response.ok) {
                    // Refresh the data
                    fetchData();    
                }
                else {
                    alert("Failed to delete element.");
                }
            });
    };

    const handlePromote = (e) => {
        e.preventDefault();
        fetch('/api/perms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: props.user.token, username: promote.username, level: getLevel() })
        })
        .then(response => response.json())
        .then(data => {
          alert(data.message);
        })
        .catch(error => {
          alert("Invalid permissions/Invalid username")
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDeny(delId);
    }

    const handleIdChange = (e) => {
        setDelId(e.target.value)
    }

    const handleUserChange = (e) => {
        setPromote({ ...promote, username: e.target.value })
    }
    const handleSelect = (e) => {
        setPromote({ ...promote, selected: e })
    }

    const handleDeny = (id) => {
        console.log(id)
        // Send a POST request to deny the record
        if (!confirm(`Confirm delete element of ID: ${id}`)) return;
        fetch('/api/pending/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, approved: false, token: props.user.token }),
        })
            .then(response => {
                if (response.ok) {
                    // Refresh the data
                    fetchData();
                }
            });
    };

    return (
        <>
            {/* Mod + Admin Shared Menu */}

            <Form onSubmit={handlePromote}>
                <Stack direction="horizontal">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control onChange={handleUserChange} type="text" />
                    <Dropdown onSelect={handleSelect}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {promote.selected}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="User">User</Dropdown.Item>
                            <Dropdown.Item eventKey="Mod">Mod</Dropdown.Item>
                            <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button type="submit" variant="success">Promote</Button>
                </Stack>
            </Form >

            {/* Conditional rendering of Admin only menus */}
            {
                props.user.auth >= 3 ? <>
                    <Form onSubmit={handleSubmit}>
                        <Stack direction="horizontal">
                            <Form.Label>App ID:</Form.Label>
                            <Form.Control onChange={handleIdChange} type="text" />
                            <Button type="submit" variant="danger">DELETE</Button>
                        </Stack>
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
                    </div></> : <></>
            }
        </>
    );
}
