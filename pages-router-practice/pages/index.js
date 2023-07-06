import { getFeaturedEvents } from "@/helper/api-util";
import EventList from "../components/events/EventList";

const HomePage = (props) => {
  return (
    <div>
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
