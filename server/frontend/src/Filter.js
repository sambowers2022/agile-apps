import React, { useState } from 'react';
import { Form, Button, Dropdown, Stack } from 'react-bootstrap';

export default function Filter({ query, setQuery, fetch }) {

    const handleInputChange = (key, value) => {
        setQuery((prevQuery) => ({ ...prevQuery, [key]: value }));
    };

    const handleSearch = () => {
        fetch();
    };

    return (
        <Stack direction="horizontal">
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="filter_dropdown">
                    {query.filter || 'Select Filter'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleInputChange('filter', 'name')}>Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('filter', 'org')}>Organization</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('filter', 'desc')}>Description</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('filter', 'platform')}>Platform</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Control
                type="text"
                placeholder="Enter filter value"
                value={query.val}
                onChange={(e) => handleInputChange('val', e.target.value)}
            />
            <Button variant="secondary" disabled>
                Order:
            </Button>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="order_by_dropdown">
                    {query.order_by}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleInputChange('order_by', 'id')}>ID</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('order_by', 'price')}>Price</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('order_by', 'name')}>Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('order_by', 'org')}>Organization</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('order_by', 'platforms')}>Platforms</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleInputChange('order_by', 'desc')}>Description</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={handleSearch}>
                Search
            </Button>
        </Stack>
    );
}