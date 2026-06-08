import express from "express"
import cors from "cors";
import http from "http";
import { upload } from "./middleware/multer"
import {prisma} from "./config/prisma"
import {PORT} from "./config/env.config"
import webhookRoutes from "./webhook/webhook.route"
import appRoutes from "./routes/index.route"


const app = express();
app.set("trust proxy", 1);
app.use(cors());
// WEBHOOK ROUTES
app.use("/api/webhook", webhookRoutes);

app.use(express.json());
app.use(upload.single('image'))

app.use("/api/v1",appRoutes)




// ❌ 404 HANDLER (must be after routes)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// ❌ GLOBAL ERROR HANDLER (last middleware)
app.use((err: any, req: any, res: any, next: any) => {
    console.error("❌ Error:", err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// ======================================
// CREATE HTTP SERVER
// ======================================

const server = http.createServer(app);

const startServer=async()=>{
    await prisma.$connect();
    console.log("DB connected")
    server.listen(PORT,()=>{
        console.log("server running on port",PORT)
    })
}


startServer()