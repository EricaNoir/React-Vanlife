import React from "react";
import { Link, useLoaderData } from "react-router-dom";

function HostVans() {
    const vans = useLoaderData();

    const hostVanElements = vans.map((van) => (
        <Link to={van.id} className="host-van-link-wrapper">
            <div key={van.id} className="host-van-single">
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ));

    return (
        <div className="host-van-list-container">
            <h1>Your listed vans</h1>
            <div className="host-vans-list">
                {vans.length > 0 ? (
                    <section>{hostVanElements}</section>
                ) : (
                    <h2>No vans yet</h2>
                )}
            </div>
        </div>
    );
}

export default HostVans;
