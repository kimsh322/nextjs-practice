// 전체 HTML 문서를 커스터마이징 할 수 있는 파일.
// 필요한 요소를 삽입해서 사용하면 적용된다.
// 애플리케이션 컴포넌트 트리 외부에 추가가능, 예를 들면 React Portal 같이
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <div id="overlay" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
