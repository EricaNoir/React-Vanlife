import React from "react";
import { Link, useSearchParams, useLoaderData, Await } from "react-router-dom";

function Vans() {
    const [searchParams, setSearchParams] = useSearchParams();
    const dataPromise = useLoaderData();

    const typeFilter = searchParams.get("type");

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

    function renderVanElements(vans) {
        const filteredVans = typeFilter
            ? vans.filter((van) => van.type === typeFilter)
            : vans;

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
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                </Link>
            </div>
        ));
        return (
            <>
                <div className="van-list-filter-buttons">
                    {vanFilterElements}
                </div>
                <div className="van-list">{vanElements}</div>
            </>
        );
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <React.Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.vans}>{renderVanElements}</Await>
            </React.Suspense>
        </div>
    );
}

export default Vans;
