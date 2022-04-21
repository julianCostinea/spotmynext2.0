import classes from "./Tag.module.css";

const Tag = (props) => {
  return (
    <div
      className={`${classes.Tag} ${
        props.secondaryTag ? classes.SecondaryTag : null
      }`}
    >
      {props.children}
    </div>
  );
};
export default Tag;
