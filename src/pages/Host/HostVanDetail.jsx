import React from "react";
import { Outlet, NavLink, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

function HostVanDetail() {
    const van = useLoaderData();

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    return (
        <>
            <Link to="../vans" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>
            <div className="host-van-detail-container">
                <div className="host-van-detail">
                    <img src={van.imageUrl} width={150} />
                    <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${van.type}`}>
                            {van.type}
                        </i>
                        <h3>{van.name}</h3>
                        <h4 className="host-van-price">${van.price}/day</h4>
                    </div>
                </div>
                <nav className="host-van-nav">
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to="."
                        end
                    >
                        Details
                    </NavLink>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to="pricing"
                        end
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to="photos"
                        end
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ van }} />
            </div>
        </>
    );
}

export default HostVanDetail;
