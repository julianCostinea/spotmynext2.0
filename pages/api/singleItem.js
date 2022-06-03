import { connectToDatabase } from "../../lib/mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { db } = await connectToDatabase();
      const collections = ["videogames", "movies", "books"];
      const randomCollectionNumber = Math.floor(Math.random() * 3);
      const dbCollection = db.collection(collections[randomCollectionNumber]);
      const result = await dbCollection
        .aggregate([{ $sample: { size: 1 } }])
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
