function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// 이 코드는 서버에서만 작동하므로 사전생성 할 필요없고, 사전생성을 하지 않으니 getStaticPaths가 필요없다.
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
