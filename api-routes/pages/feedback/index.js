import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text} <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default FeedbackPage;

export async function getStaticProps() {
  // 자체 api에서 불러올때는 fetch함수를 사용하지 말고
  // data에 있는 파일읇 바로불러온다.
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}
