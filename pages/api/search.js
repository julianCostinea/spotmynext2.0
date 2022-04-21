import { connectToDatabase } from "../../lib/mongodb";
const sanitize = require("mongo-sanitize");

async function handler(req, res) {
    try {
      const collection = "videogames";
      const { db } = await connectToDatabase();
      const dbCollection = db.collection(collection);
      const result = await dbCollection
        .find({ title: "Persona 5" })
        .toArray();
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 502).send({
        message: error.message ?? "Could not find any item",
      });
    }
}

export default handler;
