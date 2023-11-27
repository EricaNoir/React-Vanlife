import React from "react";
import { Link, useSearchParams } from "react-router-dom";

function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = React.useState([]);

    const typeFilter = searchParams.get("type");

    const filteredVans = typeFilter
        ? vans.filter((van) => van.type === typeFilter)
        : vans;

    React.useEffect(() => {
        fetch("/api/vans")
            .then((response) => response.json())
            .then((data) => setVans(data.vans));
    }, []);

    const vanElements = filteredVans.map((van) => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list">{vanElements}</div>
        </div>
    );
}

export default Vans;
