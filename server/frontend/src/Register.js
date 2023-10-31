import React, { useState } from 'react';

function Register(props) {
  const [formData, setFormData] = useState({
    name: '',
    pwd: '',
    confirmedPwd: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.pwd !== formData.confirmedPwd) {
      alert('Passwords do not match.');
      return;
    }

    fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.name,
        pwd: formData.pwd,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        props.token(data.token);
        props.auth(1);
        props.site("")
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="pwd"
            value={formData.pwd}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmedPwd"
            value={formData.confirmedPwd}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
