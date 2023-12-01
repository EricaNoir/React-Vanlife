import { getHostVans } from "../../api";
import { requireAuth } from "../utils/requireAuth";
import { defer } from "react-router-dom";

export async function loader({ request }) {
    await requireAuth(request);
    return defer({ vans: getHostVans() });
}
