import React from "react";
import { Link, useLocation, useLoaderData } from "react-router-dom";

function VanDetail() {
    const location = useLocation();
    const van = useLoaderData();

    return (
        <div className="van-detail-container">
            <Link
                to={`..${location.state?.search || ""}`}
                relative="path"
                className="back-button"
            >
                &larr; <span>Back to {location.state?.type || "all"} vans</span>
            </Link>
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price">
                    <span>${van.price}</span>/day
                </p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        </div>
    );
}

export default VanDetail;
