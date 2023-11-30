import { getHostVans } from "../../api";

export function loader({ params }) {
    return getHostVans(params.id);
}
