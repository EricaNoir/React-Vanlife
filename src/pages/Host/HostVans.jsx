import React from "react";
import { Link } from "react-router-dom";

function HostVans() {
    const [vans, setVans] = React.useState([]);

    React.useEffect(() => {
        fetch("/api/host/vans")
            .then((response) => response.json())
            .then((data) => {
                setVans(data.vans);
            });
    }, []);

    const hostVanElements = vans.map((van) => (
        <Link to={`/host/vans/${van.id}`} className="host-van-link-wrapper">
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
                    <h2>Loading...</h2>
                )}
            </div>
        </div>
    );
}

export default HostVans;
