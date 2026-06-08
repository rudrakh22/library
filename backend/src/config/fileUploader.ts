import fs from "fs";
import { uploadOnCloudinary } from "./cloudinary";

export const uploadFiles=async(files:any)=>{
    try{
        if(!files || files.length===0){
            return [];
        }
        const uploadPromises=files.map(async(file:any)=>{
            const response = await uploadOnCloudinary(file.path);
            if(response) return response.secure_url;
            return null;
        })
        const uploadedUrls=await Promise.all(uploadPromises);
        return uploadedUrls.filter(url=>url!==null);
    }catch(err){
        console.log(err);
        return [];
    }
}