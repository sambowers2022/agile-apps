import React, { useState } from 'react';

function NewApp() {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        org: '',
        price: 0,
        platforms: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addPlatform = () => {
        setFormData({
            ...formData,
            platforms: [
                ...formData.platforms,
                { name: '', link: '' },
            ],
        });
    };

    const removePlatform = (index) => {
        const updatedPlatforms = [...formData.platforms];
        updatedPlatforms.splice(index, 1);
        setFormData({ ...formData, platforms: updatedPlatforms });
    };

    const handlePlatformChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPlatforms = [...formData.platforms];
        updatedPlatforms[index][name] = value;
        setFormData({ ...formData, platforms: updatedPlatforms });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the formData to the Django API
        const response = await fetch('http://localhost:8000/api/apps/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            // Handle success
        } else {
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            <label>
                Description:
                <br />
                <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                />
            </label>
            <br />

            <label>
                Organization:
                <input
                    type="text"
                    name="org"
                    value={formData.org}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
            </label>
            <br />



            {formData.platforms.map((platform, index) => (
                <div key={index}>
                    <label>
                        Platform Name:
                        <input
                            type="text"
                            name="name"
                            value={platform.name}
                            onChange={(e) => handlePlatformChange(e, index)}
                        />
                    </label>
                    <label>
                        Platform Link:
                        <input
                            type="text"
                            name="link"
                            value={platform.link}
                            onChange={(e) => handlePlatformChange(e, index)}
                        />
                    </label>
                    <button onClick={() => removePlatform(index)}>X</button>
                </div>
            ))}

            <button type="button" onClick={addPlatform}>Add Platform</button>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default NewApp;
