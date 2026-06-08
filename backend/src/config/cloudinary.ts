import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET} from "../config/env.config"
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (
    localFilePath: string
): Promise<{
    secure_url: string;
    public_id: string;
} | null> => {
    try {
        if (!localFilePath) return null;
        const uniqueId = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log("loca",localFilePath)
        const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "image",
        folder: "SportsApp", 
        public_id: uniqueId,
        overwrite:false
        });
        try {
            await fs.unlinkSync(localFilePath);
        } catch (err) {
        console.warn("File already removed:", localFilePath);
        }

        return {
            secure_url: response.secure_url,
            public_id: response.public_id,
        };
    } catch (err) {
        console.error("Cloudinary upload error:", err);
        try {
        await fs.unlinkSync(localFilePath);
        } catch {}

        return null;
    }
};

export const deleteFromCloudinary=async(publicId:string)=>{
    await cloudinary.uploader.destroy(publicId);
}