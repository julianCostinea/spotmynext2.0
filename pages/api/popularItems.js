import { connectToDatabase } from "../../lib/mongodb";
const sanitize = require("mongo-sanitize");

async function handler(req, res) {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    if (req.query.collection === "all") {
      const videoGamesCollection = db.collection("videogames");
      const booksCollection = db.collection("books");
      const moviesCollection = db.collection("movies");

      try {
        const videoGamesResult = await videoGamesCollection
          .find()
          .sort({ _id: -1 })
          .limit(2)
          .toArray();
        const booksResult = await booksCollection
          .find()
          .sort({ _id: -1 })
          .limit(2)
          .toArray();
        const moviesResult = await moviesCollection
          .find()
          .sort({ _id: -1 })
          .limit(2)
          .toArray();

        const allCollectionsResult = videoGamesResult.concat(
          booksResult,
          moviesResult
        );

        res
          .status(200)
          .json({ message: "success", result: allCollectionsResult });
        return;
      } catch (error) {
        res.status(error.code ?? 502).send({
          message: error.message ?? "Could not find any item",
        });
      }
    }
    try {
      const collection = sanitize(req.query.collection);
      const dbCollection = db.collection(collection);
      const result = await dbCollection
        .find()
        .sort({ _id: -1 })
        .limit(20)
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
