function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// 기본적으로 getStaticProps와 비슷함.
// 객체를 반환하는데 객체에서 props, redirect, notFound 같은 key가 있다.
// 다른점은 revalidate 키는 사용하지 못한다. getServerSideProps는 매번 실행이 되기 때문에 revalidate가 필요없음
export async function getServerSideProps(context) {
  return {
    props: {
      username: "Kim",
    },
  };
}
