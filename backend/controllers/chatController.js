import Document from "../models/Document.js";

export const askQuestion = async (req, res) => {
  const { question } = req.body;

  const docs = await Document.find();

  if (docs.length === 0) {
    return res.json({
      answer: "No documents uploaded yet.",
      references: []
    });
  }

  // Prepare question keywords
  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 2);

  let bestSentence = "";
  let bestScore = 0;
  let bestDoc = null;

  for (const doc of docs) {
    const sentences = doc.content.split(/[.?!]/);

    for (const sentence of sentences) {
      let score = 0;
      const lowerSentence = sentence.toLowerCase();

      for (const keyword of keywords) {
        if (lowerSentence.includes(keyword)) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestSentence = sentence.trim();
        bestDoc = doc;
      }
    }
  }

  // Fallback: return first sentence if no keyword matched
  if (!bestSentence && docs.length > 0) {
    bestSentence = docs[0].content.split(/[.?!]/)[0];
    bestDoc = docs[0];
  }

  res.json({
    answer: bestSentence,
    references: [
      {
        documentName: bestDoc.filename,
        excerpt: bestSentence
      }
    ]
  });
};
