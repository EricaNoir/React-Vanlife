import { useOutletContext } from "react-router-dom";

function HostVanPhotos() {
    const { van } = useOutletContext();
    return (
        <section>
            <img src={van.imageUrl} alt="van" className="host-van-detail-image" />
        </section>
    );
}

export default HostVanPhotos;
