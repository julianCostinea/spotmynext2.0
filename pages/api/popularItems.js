import { connectToDatabase } from "../../lib/mongodb";
const sanitize = require("mongo-sanitize");

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const collection = sanitize(req.query.collection);
      const { db } = await connectToDatabase();
      const dbCollection = db.collection(collection);
      const result = await dbCollection
        .find()
        .limit(8)
        .toArray();
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Could not find any item",
      });
    }
  }
}

export default handler;
