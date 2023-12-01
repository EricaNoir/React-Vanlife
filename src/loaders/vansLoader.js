import { getVans } from "../../api";
import { defer } from "react-router-dom"

export function loader() {
    return defer({ vans: getVans() });
}