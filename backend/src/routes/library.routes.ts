import {
    Router,
} from "express";

import {
    authenticate,
} from "../middleware/auth.middleware";

import {
    authorize,
} from "../middleware/role.middleware";

import {
    validate,
} from "../middleware/validation.middleware";

import {

    createLibrary,

    getLibraries,

    getLibraryById,

    updateLibrary,

    deleteLibrary,

} from "../modules/library/library.controller";

import {

    createLibrarySchema,

    updateLibrarySchema,

    libraryParamsSchema,

} from "../modules/library/library.validation";

const router =
    Router();

router.post(

    "/",

    authenticate,

    authorize("VENDOR"),

    validate(
        createLibrarySchema
    ),

    createLibrary
);

router.get(
    "/",
    getLibraries
);

router.get(

    "/:id",

    validate(
        libraryParamsSchema,
        "params"
    ),

    getLibraryById
);

router.patch(

    "/:id",

    authenticate,

    authorize("VENDOR"),

    validate(
        libraryParamsSchema,
        "params"
    ),

    validate(
        updateLibrarySchema
    ),

    updateLibrary
);

router.delete(

    "/:id",

    authenticate,

    authorize("VENDOR"),

    validate(
        libraryParamsSchema,
        "params"
    ),

    deleteLibrary
);

export default router;