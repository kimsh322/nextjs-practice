import { MongoClient } from "mongodb";

async function helper(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // 유효한 이메일인지 서버에서 확인
    // 클라이언트에서 확인하더라도 서버에서 한번 더 확인하는것이 좋다.
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    // MongoDB 사용

    // MongoDB 연결
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
    // 'newslettet' db에 연결
    const db = client.db("events");
    // collection 'emails'에 key, value 입력
    await db.collection("newsletter").insertOne({ email: userEmail });
    // 연결 끊기
    client.close();

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default helper;
