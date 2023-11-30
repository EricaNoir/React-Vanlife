import { getHostVans } from "../../api";

export function loader() {
    return getHostVans();
}