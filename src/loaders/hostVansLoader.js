import { getHostVans } from "../../api";

import { requireAuth } from "../utils/requireAuth";

export async function loader() {
    await requireAuth();
    return getHostVans();
}
