import { getHostVans } from "../../api";
import { defer } from "react-router-dom";

import { requireAuth } from "../utils/requireAuth";

export async function loader({ params, request }) {
    await requireAuth(request);
    return defer({ van: getHostVans(params.id) });
}
