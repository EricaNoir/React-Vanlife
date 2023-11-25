import { useOutletContext } from "react-router-dom";

function HostVanPricing() {
    const { van } = useOutletContext();
    return (
        <section className="host-van-detail-pricing">
            <h3>
                ${van.price}
                <span>/day</span>
            </h3>
        </section>
    );
}

export default HostVanPricing;
