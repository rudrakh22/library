import {
    authorize,
} from "./role.middleware";

export const vendorOnly =
    authorize("VENDOR");