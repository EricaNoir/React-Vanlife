import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../../api";

function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [vans, setVans] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const typeFilter = searchParams.get("type");

    const filteredVans = typeFilter
        ? vans.filter((van) => van.type === typeFilter)
        : vans;

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVans();
                setVans(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        loadVans();
    }, []);

    const vanElements = filteredVans.map((van) => (
        <div key={van.id} className="van-tile">
            <Link
                to={van.id}
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter,
                }}
            >
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
        setSearchParams((prev) => {
            value ? prev.set(key, value) : prev.delete(key);
            return prev;
        });
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

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">{vanFilterElements}</div>
            <div className="van-list">{vanElements}</div>
        </div>
    );
}

export default Vans;
