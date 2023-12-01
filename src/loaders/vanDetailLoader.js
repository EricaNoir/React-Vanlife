import { getVans } from "../../api";
import { defer } from "react-router-dom";

export function loader({ params }) {
    return defer({ van: getVans(params.id) });
}
