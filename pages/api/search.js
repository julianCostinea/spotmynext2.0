import { connectToDatabase } from "../../lib/mongodb";
const sanitize = require("mongo-sanitize");

async function handler(req, res) {
  if (req.method === "GET") {
    if (
      typeof req.query.searchId === "string" ||
      req.query.searchId instanceof String
    ) {
      try {
        const cleanQuery = sanitize(req.query.searchId)
        const collection = req.query.collection.slice(1);
        const { db } = await connectToDatabase();
        const dbCollection = db.collection(collection);
        const result = await dbCollection
          .find({ title: { $regex: new RegExp(cleanQuery, "i") } })
          .toArray();
        res.status(200).json({ message: "success", result: result });
      } catch (error) {
        res.status(error.code ?? 502).send({
          message: error.message ?? "Could not find any item",
        });
      }
    }
  }
}

export default handler;
