import classes from "./about.module.css";

const About = () => {
  return (
    <div className={classes.aboutContainer}>
      <h1>What is it about?</h1>
      <p>Say you just finished your latest game, movie, book, what have you.</p>
      <p>
        But you&apos;re still craving more and you&apos;d like to try something that&apos;s in
        the same sphere.
      </p>
      <p>
        Welp, that&apos;s where{" "}
        <span style={{ backgroundColor: "#f4ce68" }}>SpotMyNext</span> comes in.
      </p>
      <p>
        Type in the latest piece of entertainment you&apos;ve consumed and see what
        other people have recommended to be the next thing just like it.
      </p>
      <br />
      <p>Or check out your favourites and recommend stuff to other people.</p>
      <br/>
      <h1>To keep it short:</h1>
      ILLUSTRATIONS HERE
    </div>
  );
};
export default About;
