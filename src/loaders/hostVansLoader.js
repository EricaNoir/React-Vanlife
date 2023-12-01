import { getHostVans } from "../../api";
import { defer } from "react-router-dom";

import { requireAuth } from "../utils/requireAuth";

export async function loader({ request }) {
    await requireAuth(request);
    return defer({ vans: getHostVans() });
}
