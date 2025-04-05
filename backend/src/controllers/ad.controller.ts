import type { Request, Response } from "express";
import {
  deleteAdObject,
  getObjectUrl,
  listAdObjects,
  uploadFileToS3,
} from "../services/s3.service";
import { Ad } from "../models/ad.model";

export const getAllAds = async (_req: Request, res: Response) => {
  const ads = await Ad.find().sort({ createdAt: -1 });

  const enrichedAds = await Promise.all(
    ads.map(async (ad) => {
      const url = await getObjectUrl(ad.key);
      return { ...ad.toObject(), url };
    })
  );

  res.json(enrichedAds);
};

export const uploadAds = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const { duration } = req.body;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!duration) {
    return res.status(400).json({ error: "Display time is required" });
  }

  const key = await uploadFileToS3(file);
  const type = file.mimetype.startsWith("video") ? "video" : "image";

  const ad = await Ad.create({
    title: file.originalname,
    key,
    type,
    duration: parseInt(duration),
  });

  res.status(201).json(ad);
};

export const listAds = async (_req: Request, res: Response) => {
  const data = await listAdObjects();

  res.json(data);
};

export const deleteAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ad = await Ad.findById(id);

  if (!ad) return res.status(404).json({ error: "Ad not found" });

  await deleteAdObject(ad.key);
  await ad.deleteOne();

  res.json({ message: "Ad deleted" });
};
