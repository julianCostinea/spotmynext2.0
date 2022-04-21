import { connectToDatabase } from "../../lib/mongodb";

async function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export default handler;
