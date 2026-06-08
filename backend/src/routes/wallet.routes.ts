import { Router } from "express";

import {
    authenticate,
} from "../middleware/auth.middleware";

import {
    authorize,
} from "../middleware/role.middleware";

import {
    getVendorWallet,
    requestWithdrawal,
    getWithdrawalHistory,
} from "../modules/wallet/wallet.controller";

const router =
    Router();

router.get(
    "/vendor",
    authenticate,
    authorize("VENDOR"),
    getVendorWallet
);

router.post(
    "/withdraw",
    authenticate,
    authorize("VENDOR"),
    requestWithdrawal
);

router.get(
    "/withdrawals",
    authenticate,
    authorize("VENDOR"),
    getWithdrawalHistory
);

export default router;