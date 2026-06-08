import {
    authorize,
} from "./role.middleware";

export const adminOnly =
    authorize("ADMIN");