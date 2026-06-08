import type {
    Request,
    Response,
} from "express";

import {

    createLibraryService,

    getLibrariesService,

    getLibraryByIdService,

    updateLibraryService,

    deleteLibraryService,

} from "./library.service";

export const createLibrary =
    async (
        req: Request,
        res: Response
    ) => {

        const library =
            await createLibraryService(

                req.user!.id,

                req.body
            );

        return res.status(201).json({

            success: true,

            data: library,
        });
    };

export const getLibraries =
    async (
        req: Request,
        res: Response
    ) => {

        const libraries =
            await getLibrariesService();

        return res.status(200).json({

            success: true,

            data: libraries,
        });
    };

export const getLibraryById =
    async (
        req: Request,
        res: Response
    ) => {

        const library =
            await getLibraryByIdService(

                req.params.id! as string
            );

        return res.status(200).json({

            success: true,

            data: library,
        });
    };

export const updateLibrary =
    async (
        req: Request,
        res: Response
    ) => {

        const library =
            await updateLibraryService(

                req.params.id! as string,

                req.user!.id,

                req.body
            );

        return res.status(200).json({

            success: true,

            data: library,
        });
    };

export const deleteLibrary =
    async (
        req: Request,
        res: Response
    ) => {
        
        await deleteLibraryService(

            req.params.id! as string,

            req.user!.id
        );

        return res.status(200).json({

            success: true,

            message:
                "Library deleted successfully",
        });
    };