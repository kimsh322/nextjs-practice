import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URL);

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // 유효성검사
    if (!email.includes("@") || !name || name.trim() === "" || !text || !text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db("events");
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db("events");
    // comments 전부 받아오기
    // sort 는 _id를 내림차순으로 정렬하라는 뜻
    const documents = await db.collection("comments").find().sort({ _id: -1 }).toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
