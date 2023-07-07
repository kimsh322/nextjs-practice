import Link from "next/link";
import classes from "./EventItem.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Image from "next/image"; // 이미지 최적화 컴포넌트

const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      {/* 이미지 최적화, 실제로 1.9mb인 이미지가 19kb가 된다. 확장자도 크롬 기준으로 WebP로 바뀜 */}
      {/* 추가적으로 lazy loading도 자동으로 적용된다. */}
      {/* width, height는 fetch해오는 이미지 크기이다. 크면 용량이 커지고, 해상도가 좋아진다. */}
      {/* 렌더링 되는 이미지 크기는 css 영향을 받는다. */}
      <Image src={"/" + image} alt={title} width={256} height={160} />
      {/* <img src={"/" + image} alt={title} /> */}
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
