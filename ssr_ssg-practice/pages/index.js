// fs 모듈같은 nodejs 모듈은 getStaticProps 함수에서만 쓰이고, 클라이언트로 넘어갈때는 삭제된다.
import path from "path";
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// 컴포넌트가 생성되기 이전에 동작하는 함수
// 반환된 객체가 위의 컴포넌트의 props가 된다.
// 클라이언트 사이드 오기전에 동작
export async function getStaticProps() {
  // cwd : 현재작업디렉토리, 여기서는 pages가 아니라 root폴더를 가리킨다.
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  // 항상 props키를 가지는 객체를 반환해야 한다.
  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
