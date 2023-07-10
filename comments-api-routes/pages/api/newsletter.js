import { connectDatabase, insertDocument } from "@/helpers/db-util";

async function helper(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // 유효한 이메일인지 서버에서 확인
    // 클라이언트에서 확인하더라도 서버에서 한번 더 확인하는것이 좋다.
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;
    // MongoDB 사용
    try {
      // MongoDB 연결
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      // 연결 끊기
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default helper;
