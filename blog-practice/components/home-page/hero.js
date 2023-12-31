import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/anicon.png" alt="my image" width={300} height={300} />
      </div>
      <h1>Hi I'm Kim</h1>
      <p>My blog prototype</p>
    </section>
  );
}

export default Hero;
