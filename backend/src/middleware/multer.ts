import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, path.join(process.cwd(), "/public/temp"));
  },

  filename: function (req: any, file: any, cb: any) {

    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    // ✅ preserve extension
    const ext = path.extname(file.originalname);

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        ext
    );
  },
});

export const upload = multer({
  storage,
});