import { Router } from "express";
import type { RequestHandler } from "express";
import {
  getAllAds,
  listAds,
  deleteAd,
  uploadAds,
} from "../controllers/ad.controller";
import { upload } from "../config/multer.config";

const router = Router();

router.get("/", getAllAds as RequestHandler);
router.post("/upload", upload.single("file"), uploadAds as RequestHandler);
router.get("/list", listAds as RequestHandler);
router.delete("/delete/:id", deleteAd as RequestHandler);

export default router;
