import React from "react";
// import { Nav, NavLink, NavMenu }
//     from "./NavbarElements";

const Navbar = () => {
    return (
        <div className="topnav">
            <ul>
                <li><a href="/">Agile Apps</a></li>
                <li><a href="/" target="_blank">Logout</a></li>
            </ul>
        </div>
    );
};

export default Navbar;