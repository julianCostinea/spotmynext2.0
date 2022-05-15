import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

const sanitize = require("mongo-sanitize");

async function handler(req, res) {
  if (req.method === "GET") {
    if (
      typeof req.query.searchId === "string" ||
      req.query.searchId instanceof String
    ) {
      try {
        const cleanQuery = sanitize(req.query.searchId);
        const pageDelimiter = req.query.pageDelimiter;
        const { db } = await connectToDatabase();
        const dbCollection = db.collection(req.query.collection);
        let result;
        let lastItem;
        if (pageDelimiter) {
          result = await dbCollection
            .find({
              title: { $regex: new RegExp(cleanQuery, "i") },
              _id: { $gt: ObjectId(pageDelimiter) },
            })
            .limit(8)
            .toArray();
        } else {
          result = await dbCollection
            .find({
              title: { $regex: new RegExp(cleanQuery, "i") },
            })
            .limit(8)
            .toArray();
            lastItem = await dbCollection
            .find(
              {
                title: { $regex: new RegExp(cleanQuery, "i") },
              },
              { projection: { _id: 1 } }
            )
            .sort({ _id: -1 })
            .limit(1)
            .toArray();
        }

        res.status(200).json({ message: "success", result: result, lastItem });
      } catch (error) {
        res.status(error.code ?? 502).send({
          message: error.message ?? "Could not find any item",
        });
      }
    }
  }
}

export default handler;
