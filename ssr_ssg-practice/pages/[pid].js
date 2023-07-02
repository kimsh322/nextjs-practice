import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

// dynamic segment는 기본적으로 사전 렌더링하지 않는다.
// 요청이 있으면 서버에서 생성한다.
// 따라서 getStaticPaths 함수를 추가해서 nextjs에 추가적인 정보를 전달해야 한다.
// getStaticPaths 함수는 page 컴포넌트에서만 사용가능하다.

const ProductDetailPage = (props) => {
  // getStaticProps에서 반환한 값 가져오기
  const { loadedProduct } = props;
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

export async function getStaticProps(context) {
  // params는 정해진 이름
  const { params } = context;

  // url에 있는 param
  const productId = params.pid;

  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);
  // pid에 맞는 data 찾기
  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 동적 페이지에서 어떤 구체적인 인스턴스를 사전에 생성해야 하는지 알려주는 함수
export async function getStaticPaths() {
  // getStaticPaths는 paths 키를가진 객체를 반환한다. paths는 객체를 담은 배열이다.
  // 이 동적 페이지가 세 번 생성되어야 한다는것을 Next.js에게 알려준다.
  return {
    paths: [{ params: { pid: "p1" } }, { params: { pid: "p2" } }, { params: { pid: "p3" } }],
    fallback: false,
  };
}

export default ProductDetailPage;
