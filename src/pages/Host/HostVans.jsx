import React from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

function HostVans() {
    const dataPromise = useLoaderData();

    function renderHostVanElements(vans) {
        const hostVanElements = vans.map((van) => (
            <Link key={van.id} to={van.id} className="host-van-link-wrapper">
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
            <div className="host-vans-list">
                {vans.length > 0 ? (
                    <section>{hostVanElements}</section>
                ) : (
                    <h2>No vans yet</h2>
                )}
            </div>
        );
    }
    return (
        <div className="host-van-list-container">
            <h1>Your listed vans</h1>
            <React.Suspense fallback={<h2>Loading your vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderHostVanElements}
                </Await>
            </React.Suspense>
        </div>
    );
}

export default HostVans;
