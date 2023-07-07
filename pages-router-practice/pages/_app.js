import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  // 모든 페이지에서 Head를 추가하고 싶으면 여기에 작성하면된다.
  // Head 컴포넌트는 전부 merge되는데, 겹치는 부분이 있으면 최근 Head 컴포넌트 내부의 태그가 반영된다.
  // 그러니까 _app.js에서는 기본값을 설정해두고, 각 페이지에 맞는 meta태그나 title을 설정하면 된다.
  return (
    <Layout>
      <Head>
        <title>Next events</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
