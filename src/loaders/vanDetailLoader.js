import { getVans } from "../../api";

export function loader({ params }) {
    return getVans(params.id);
}