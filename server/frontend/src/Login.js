import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            password: '',
            error: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleLogin = () => {
        const { username, password } = this.state;
        fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, pwd: password }),
        })
            .then(response => {
                if (response.ok) {
                    // Successful login
                    return response.json(); // Parse the response as JSON
                } else {
                    // Failed login
                    alert('Login failed. Please check your credentials.');
                    throw new Error('Login failed');
                }
            })
            .then(data => {
                // Access the 'token' field from the parsed JSON response
                this.props.token(data.token);
                this.props.auth(data.auth);
                this.props.site("");
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    }


    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <form>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button type="button" onClick={this.handleLogin}>Login</button>
                </form>
                <br />
                <a href="#" onClick={() => this.props.site("Register")}>Create an Account.</a>
            </div>
        );
    }
}

export default Login;
