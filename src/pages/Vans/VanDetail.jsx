import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

function VanDetail() {
    const params = useParams();
    const location = useLocation();
    console.log(location);

    const [van, setVan] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then((response) => response.json())
            .then((data) => setVan(data.vans));
    }, [params.id]);

    return (
        <div className="van-detail-container">
            {van ? (
                <>
                    <Link
                        to={`..${location.state?.search || ""}`}
                        relative="path"
                        className="back-button"
                    >
                        &larr; <span>Back to {location.state?.type || "all"} vans</span>
                    </Link>
                    <div className="van-detail">
                        <img src={van.imageUrl} />
                        <i className={`van-type ${van.type} selected`}>
                            {van.type}
                        </i>
                        <h2>{van.name}</h2>
                        <p className="van-price">
                            <span>${van.price}</span>/day
                        </p>
                        <p>{van.description}</p>
                        <button className="link-button">Rent this van</button>
                    </div>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default VanDetail;
