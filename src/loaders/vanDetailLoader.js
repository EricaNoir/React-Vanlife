import { getVan } from "../../api";
import { defer } from "react-router-dom";

export function loader({ params }) {
    return defer({ van: getVan(params.id) });
}
