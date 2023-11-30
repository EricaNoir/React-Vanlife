import { getHostVans } from "../../api";

import { requireAuth } from "../utils/requireAuth";

export async function loader({ params }) {
    await requireAuth();
    return getHostVans(params.id);
}
