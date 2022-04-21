import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
const sanitize = require("mongo-sanitize");

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const cleanParentId = sanitize(req.body.parentId);
      const cleanVotedItems = sanitize(req.body.votedItems);
      const { db } = await connectToDatabase();
      const moviesCollection = db.collection("movies");
      const alreadyPresentIds = [];
      const votedIds = [];

      const fetchPresentIds = await moviesCollection
        .findOne({ _id: ObjectId(cleanParentId) }, { projection: { recommendations: 1 } },)
      fetchPresentIds.recommendations.forEach((element) => {
        alreadyPresentIds.push(element.id);
      });
      for (const element of cleanVotedItems){
        if (!alreadyPresentIds.includes(element.id)) {
          const newItem = {
            id: element.id,
            votes: 1,
            title: element.title,
            photo: element.photo
          }
          await moviesCollection.updateOne({ _id: ObjectId(cleanParentId) }, { $push: {recommendations: newItem} })
        } else{
          votedIds.push(element.id);
        }
      }

      const result = await moviesCollection.updateOne(
        { _id: ObjectId(cleanParentId) },
        { $inc: { "recommendations.$[elem].votes": 1 } },
        {
          arrayFilters: [
            {
              "elem.id": {
                $in: votedIds,
              },
            },
          ],
        }
      );
      res.status(200).json({ message: "success", result: result });
    } catch (error) {
      res.status(error.code ?? 500).send({
        message: error.message ?? "Something went wrong.",
      });
    }
  }
}

export default handler;
