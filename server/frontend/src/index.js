import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import NewApp from "./NewApp";
import Admin from "./Admin"
import './style.css'

const root = createRoot(document.getElementById("app"));

function MainApp() {
  const [site, setSite] = useState("App"); // Default to "App"

  const renderSite = () => {
    switch (site) {
      case "App":
        return <App />;
      case "NewApp":
        return <NewApp />;
      case "Admin":
        return <Admin />;
      default:
        return <App />; // Default to "App"
    }
  }

  return (
    <>
      <div className="topnav">
        <ul>
          <li key='0'><a href="#" onClick={() => setSite("App")}>Agile Apps</a></li>
          <li key='1'><a href="#" onClick={() => setSite("NewApp")}>New App</a></li>
          <li key='2'><a href="#" onClick={() => setSite("Admin")}>Admin</a></li>
        </ul>
      </div>
      {renderSite()}
    </>
  );
}

root.render(<MainApp />);
