import Document from "../models/Document.js";
import { extractText } from "../utils/pdfParser.js";

export const uploadDocument = async (req, res) => {
  try {
    const text = await extractText(req.file);

    const doc = await Document.create({
      filename: req.file.originalname,
      content: text,
      status: "processed"
    });

    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Document upload failed" });
  }
};

export const listDocuments = async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

