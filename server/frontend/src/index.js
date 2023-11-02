import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import NewApp from "./NewApp";
import Admin from "./Admin"
import Login from "./Login"
import Register from "./Register"
import './style.css'

const root = createRoot(document.getElementById("app"));

function MainApp() {
  const [site, setSite] = useState(""); // Default to "App"
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(0);

  const handleLoginSuccess = (tokenValue) => {
    console.log(tokenValue);
    setToken(tokenValue);
    console.log(tokenValue);
    setSite(''); // Reset the site state after a successful login
  }

  const renderSite = () => {
    switch (site) {
      case "":
        return <App />;
      case "NewApp":
        return <NewApp site={setSite}/>;
      case "Admin":
        return <Admin token={token}/>;
      case "Login":
        return <Login token={setToken} site={setSite} auth={setAuth} />
      case "Register":
        return <Register token={setToken} site={setSite} auth={setAuth}/>
      default:
        return <App />; // Default to "App"
    }
  }



  return (
    <>
      <div className="topnav">
        <ul>
          <li key='0'><a href="#" onClick={() => setSite("")}>Agile Apps</a></li>
          {token != '' ?
            <>
              <li key='1'><a href="#" onClick={() => setSite("NewApp")}>New App</a></li>
              {auth >= 2 ? <li key='2'><a href="#" onClick={() => setSite("Admin")}>Admin</a></li> : <></>}
            </> : <></>}
          <li key='2' id="login">{token == '' ? <a href="#" onClick={() => setSite("Login")}>Login</a> : <a href="#" onClick={() => {
            setToken("");
            setSite("");
          }}>Logout</a>}</li>
        </ul>
      </div>
      {renderSite()}
    </>
  );
}

root.render(<MainApp />);
