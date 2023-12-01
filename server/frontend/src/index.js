import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Apps from "./Apps";
import NewApp from "./NewApp";
import Admin from "./Admin"
import Login from "./Login"
import Register from "./Register"
import './style.css'

const root = createRoot(document.getElementById("app"));

// Wrapper for the entire application.
function MainApp() {
  const [site, setSite] = useState(""); // Default to "App"
  const [user, setUser] = useState({})

  // Handle which sub-page is being rendered
  const renderSite = () => {
    switch (site) {
      case "":
        return <Apps user={{...user}} />;
      case "NewApp":
        return <NewApp site={setSite}/>;
      case "Admin":
        return <Admin user={user}/>;
      case "Login":
        return <Login user={setUser} site={setSite} />
      case "Register":
        return <Register user={setUser} site={setSite} />
      default:
        return <Apps user={{...user}} />; // Default to "App"
    }
  }



  return (
    <>
    {/* Navbar */}
      <div className="topnav">
        <ul>
          <li key='0'><a href="#" onClick={() => setSite("")}>Agile Apps</a></li>
          {JSON.stringify(user) !== '{}' ?
            <>
              <li key='1'><a href="#" onClick={() => setSite("NewApp")}>New App</a></li>
              {user.auth >= 2 ? <li key='2'><a href="#" onClick={() => setSite("Admin")}>Admin</a></li> : <></>}
            </> : <></>}
          <li key='2' id="login">{JSON.stringify(user) === '{}' ? <a href="#" onClick={() => setSite("Login")}>Login</a> : <a href="#" onClick={() => {
            setUser({});
            setSite("");
          }}>Logout</a>}</li>
        </ul>
      </div>
      {/* Sub-Page that is opened */}
      {renderSite()}
    </>
  );
}

// Renders everything
root.render(<MainApp />);
