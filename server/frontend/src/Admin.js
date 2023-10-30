import React, { useState, useEffect } from 'react';

export default function Admin() {
    const [data, setData] = useState([]);

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
            body: JSON.stringify({ id, approved: true }),
        })
            .then(response => {
                if (response.ok) {
                    // Refresh the data when the request is successful
                    fetchData();
                }
            });
    };

    const handleDeny = (id) => {
        // Send a POST request to deny the record
        fetch('http://127.0.0.1:8000/api/pending/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, approved: false }),
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
