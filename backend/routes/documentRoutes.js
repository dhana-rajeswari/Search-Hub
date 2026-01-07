import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  uploadDocument,
  listDocuments
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", listDocuments);

export default router;
