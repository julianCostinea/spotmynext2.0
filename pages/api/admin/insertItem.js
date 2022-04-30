import { connectToDatabase } from "../../../lib/mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      const item = {
        title: req.body.title,
        description: req.body.description,
        recommendations: [],
        photo: req.body.photo,
        mainTags: req.body.mainTags,
        secondaryTags: req.body.secondaryTags,
        collection: req.body.collection
      };
      const itemCollection = db.collection(req.body.collection);
      const result = await itemCollection.insertOne(item);
      res.status(200).json({ message: "success", result, allItemsResult });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Something went wrong.",
      });
    }
  }
}

export default handler;
