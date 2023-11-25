import React from "react";
import { useParams } from "react-router-dom";

/**
 * Challenge (not optional!): build the shared UI portion of the
 * Host Van Detail page. This is
 *
 * Optional portion: also style it to look like the design.
 *
 * For now, get the data from a request to `/api/host/vans/:id`
 * and display the van image, name, price, type
 */

function HostVanDetail() {
    const params = useParams();
    const [van, setVan] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
            .then((response) => response.json())
            .then((data) => setVan(data.vans));
    }, [params.id]);

    return (
        <div className="host-van-detail-container">
            {van ? (
                <div className="host-van-detail">
                    <img src={van.imageUrl} width={150} />
                    <i className={`host-van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="host-van-price">
                        <span>${van.price}</span>/day
                    </p>
                    <p>{van.description}</p>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

export default HostVanDetail;
