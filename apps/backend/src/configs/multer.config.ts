import { diskStorage } from "multer";
import { extname } from "path";
import { BadRequestException } from "@nestjs/common";

export const multerOptions = {
  storage: diskStorage({
    destination: "./public/upload/products",
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          "อนุญาตให้อัปโหลดเฉพาะไฟล์รูปภาพ (jpg, jpeg, png, webp) เท่านั้น",
        ),
        false,
      );
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};
