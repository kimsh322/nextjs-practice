import Head from "next/head"; // Next.js 에서 제공하는 Head 컴포넌트

import { getFeaturedEvents } from "@/helper/api-util";
import EventList from "../components/events/EventList";

const HomePage = (props) => {
  // Head 컴포넌트는 아무데서나 불러오면 된다. Next.js가 알아서 <head> 태그 내부에 추가함.
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // 30분에 한 번 페이지 재생성(다시 불러올 때)
  };
}
