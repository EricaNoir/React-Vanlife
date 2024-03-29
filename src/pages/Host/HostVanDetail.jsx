import React from "react";
import { Outlet, NavLink, useLoaderData, Await } from "react-router-dom";
import { Link } from "react-router-dom";

function HostVanDetail() {
    const dataPromise = useLoaderData();

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    function renderHostVanDetailElement(van) {
        return (
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
        );
    }

    return (
        <>
            <Link to="../vans" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>
            <React.Suspense fallback={<h2>Loading van detail</h2>}>
                <Await resolve={dataPromise.van}>
                    {renderHostVanDetailElement}
                </Await>
            </React.Suspense>
        </>
    );
}

export default HostVanDetail;
