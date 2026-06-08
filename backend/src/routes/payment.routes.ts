import { Router } from "express";

import {
    authenticate,
} from "../middleware/auth.middleware";

import {
    createPaymentOrder,
    verifyPayment,
} from "../modules/payment/payment.controller";

const router =
    Router();

router.post(
    "/create-order",
    authenticate,
    createPaymentOrder
);

router.post(
    "/verify",
    authenticate,
    verifyPayment
);

export default router;