function helper(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // 유효한 이메일인지 서버에서 확인
    // 클라이언트에서 확인하더라도 서버에서 한번 더 확인하는것이 좋다.
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default helper;
