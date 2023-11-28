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

    function handleFilterChange(key, value) {
        // setSearchParams((prev) => {
        //     if (value === null) {
        //         prev.delete(key);
        //     } else {
        //         prev.set(key, value);
        //     }
        //     return prev;
        // });
        setSearchParams((prev) =>
            value ? prev.set(key, value) : prev.delete(key)
        );
    }

    const vanFilterElements = (
        <>
            <button
                className={`van-type simple ${
                    typeFilter === "simple" && "selected"
                }`}
                onClick={() => handleFilterChange("type", "simple")}
            >
                Simple
            </button>
            <button
                className={`van-type luxury ${
                    typeFilter === "luxury" && "selected"
                }`}
                onClick={() => handleFilterChange("type", "luxury")}
            >
                Luxury
            </button>
            <button
                className={`van-type rugged ${
                    typeFilter === "rugged" && "selected"
                }`}
                onClick={() => handleFilterChange("type", "rugged")}
            >
                Rugged
            </button>
            {typeFilter && (
                <button
                    className="van-type clear-filters"
                    onClick={() => handleFilterChange("type", null)}
                >
                    Clear Filter
                </button>
            )}
        </>
    );

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">{vanFilterElements}</div>
            <div className="van-list">{vanElements}</div>
        </div>
    );
}

export default Vans;
