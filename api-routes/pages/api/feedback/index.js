// 폴더 이름은 api라고 지정해아함!
// api 폴더 내부의 파일들은 React 컴포넌트를 export하지 않고, api를 만들 때 사용한다.
// 서버 코드이므로 node 모듈 사용가능
import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

// 이 함수는 /api/feedback 으로 들어오는 요청을 처리한다.
// 이 파일 내부의 코드는 ServerSide 코드로, 클라이언트까지 가지 않는다.
function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(), // dummy Id
      email: email,
      text: feedbackText,
    };

    // 위의 feedback을 파일이나 database에 저장
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
