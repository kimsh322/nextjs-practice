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

  // fallback 페이지는 즉시 생성되지는 않기 때문에 생성될 때 까지 렌더링할 fallback 컴포넌트가 필요하다.
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

// 데이터 fetch 함수
async function getData() {
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  // params는 정해진 이름
  const { params } = context;

  // url에 있는 param
  const productId = params.pid;

  const data = await getData();

  // pid에 맞는 data 찾기
  const product = data.products.find((product) => product.id === productId);

  // 해당하는 pid 없으면 404띄워주기
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// 동적 페이지에서 어떤 구체적인 인스턴스를 사전에 생성해야 하는지 알려주는 함수
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  // getStaticPaths는 paths 키를가진 객체를 반환한다. paths는 객체를 담은 배열이다.
  // 이 동적 페이지가 세 번 생성되어야 한다는것을 Next.js에게 알려준다.
  return {
    paths: pathsWithParams,
    fallback: true, // true로 하면 paths에 없는 페이지는 사전 렌더링 하지않고 요청이 들어올 때 서버에서 만든다.
    // 자주사용하는 페이지는 paths에 넣어 사전 렌더링하고, 자주 사용하지 않거나 만들 페이지가 매우많으면 fallback으로 요청이 올때 만들도록 한다.
    // fallback : 'blocking'으로 설정하면 fallback 컴포넌트(로딩 컴포넌트 같은)가 없어도 동작한다.
  };
}

export default ProductDetailPage;
