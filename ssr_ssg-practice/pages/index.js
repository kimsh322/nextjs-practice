// fs 모듈같은 nodejs 모듈은 getStaticProps 함수에서만 쓰이고, 클라이언트로 넘어갈때는 삭제된다.
import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// 컴포넌트가 생성되기 이전에 동작하는 함수
// 반환된 객체가 위의 컴포넌트의 props가 된다.
// 클라이언트 사이드 오기전에 동작
// 빌드시 작동하는 코드로 서버에서 만들어지는것은 아니다.
// 그러나 revalidate 설정을 주면 정해진 시간마다 서버에서 다시 함수를 실행시킨다. console.log로 확인가능
// dev 에서는 확인 불가능하고 build한 후 npm start로 확인 가능함.
export async function getStaticProps() {
  console.log("re-generating...");
  // cwd : 현재작업디렉토리, 여기서는 pages가 아니라 root폴더를 가리킨다.
  const filepath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filepath);
  const data = JSON.parse(jsonData);

  if (!data) {
    // 사용자를 해당 url로 리다이렉트 시킨다. 에러 핸들링할 때 사용.
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  // props는 페이지 컴포넌트의 props로 반환된다.
  return {
    props: {
      products: data.products,
    },
    revalidate: 120, // 적용한 시간이 지나면 페이지를 다시 정적생성하여 기존 페이지를 대체(업데이트)한다. ISR(Incremental Static Generation)
    notFound: false, // true로 설정하면 404 페이지가 뜬다. 이 key로 에러 핸들링 가능. 38번줄 참조
  };
}

export default HomePage;
