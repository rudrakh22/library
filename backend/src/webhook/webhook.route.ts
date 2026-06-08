import express from "express";
import { clerkWebhook } from "../webhook/clerk.webhook";
const router = express.Router();

router.post(

    "/register",

    express.raw({
        type:
            "application/json",
    }),

    clerkWebhook
);
export default router;