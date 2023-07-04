import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  //   // 클라이언트에서 데이터 fetching
  //   useEffect(() => {
  //     setIsLoading(true);
  //     // firebase 실시간 database url, 끝에 .json 붙여줘야함
  //     fetch("https://nextjs-practice-bc64c-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  //   // 페이지소스 보기로 소스를 보면 이 부분이 보인다.
  //   // 이것은 Next.js가 기본적으로 사전 렌더링을 하는데, 이 과정에서 useEffect는 거치지 않기 때문에
  //   // 첫 렌더링 때 반환되는 jsx를 사전 렌더링 하게 되므로 이 소스가 보이게 된다.
  //   if (!sales) {
  //     return <p>No data yet.</p>;
  //   }

  // Next.js 팀에서 만든 fetching hook, useEffect없이 사용한다.
  // 두번째 인자는 fetcher를 받는데, 기본 fetcher가 필요하다.
  // 데이터베이스의 데이터 변경시 자동으로 fetch한다.
  // 여러기능이 많으니 궁금하면 찾아보기:
  const { data, error } = useSWR("https://nextjs-practice-bc64c-default-rtdb.firebaseio.com/sales.json", (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage;

// 초기 sales 값으로 사용할 데이터 사전 fetching
// getStaticProps를 사용하면 초기값을 주기 때문에 첫 렌더링부터 본문이 렌더링된다. 따라서 페이지소스보기에서 데이터를 볼 수 있다.
// 다만 실시간으로 데이터가 변경되어도 페이지소스보기는 변하지 않는다.
export async function getStaticProps() {
  // getStaticProps는 React 컴포넌트가 아니기 때문에 hook을 사용할 수 없다.
  const response = await fetch("https://nextjs-practice-bc64c-default-rtdb.firebaseio.com/sales.json");

  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume });
  }

  return { props: { sales: transformedSales }, revalidate: 10 };
}
