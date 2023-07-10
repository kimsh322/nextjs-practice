import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // MongoDB 연결
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
  return client;
}

export async function insertDocument(client, collection, document) {
  // 'events' db에 연결
  const db = client.db("events");
  // collection 'newsletter'에 key, value 입력
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db("events");
  // comments 전부 받아오기
  // sort {_id : -1} 은 _id를 내림차순으로 정렬하라는 뜻
  const documents = await db.collection(collection).find(filter).sort(sort).toArray();

  return documents;
}
