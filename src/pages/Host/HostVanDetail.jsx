import React from "react";
import { useParams, Outlet, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

function HostVanDetail() {
    const params = useParams();
    const [van, setVan] = React.useState(null);

    React.useEffect(() => {
        fetch(`/api/host/vans/${params.id}`)
            .then((response) => response.json())
            .then((data) => setVan(data.vans));
    }, [params.id]);

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    };

    return (
        <>
            <Link to="../vans" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>
            <div className="host-van-detail-container">
                {van ? (
                    <>
                        <div className="host-van-detail">
                            <img src={van.imageUrl} width={150} />
                            <div className="host-van-detail-info-text">
                                <i className={`van-type van-type-${van.type}`}>
                                    {van.type}
                                </i>
                                <h3>{van.name}</h3>
                                <h4 className="host-van-price">
                                    ${van.price}/day
                                </h4>
                            </div>
                        </div>
                        <div className="host-van-nav">
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to="."
                                end
                            >
                                Details
                            </NavLink>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to="pricing"
                                end
                            >
                                Pricing
                            </NavLink>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to="photos"
                                end
                            >
                                Photos
                            </NavLink>
                        </div>
                        <Outlet />
                    </>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </>
    );
}

export default HostVanDetail;
