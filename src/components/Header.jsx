import React from "react";
import { Link, NavLink } from "react-router-dom";
import loginIcon from "../assets/images/avatar-icon.png";

export default function Header() {
    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };
    return (
        <header>
            <NavLink className="site-logo" to="/">
                #VanLife
            </NavLink>
            <nav>
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="host"
                >
                    Host
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="about"
                >
                    About
                </NavLink>
                <NavLink
                    style={({ isActive }) => (isActive ? activeStyle : null)}
                    to="vans"
                >
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img
                        src={loginIcon}
                        className="login-icon"
                    />
                </Link>
            </nav>
        </header>
    );
}
