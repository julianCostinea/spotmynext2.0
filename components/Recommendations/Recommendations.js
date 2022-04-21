import classes from './Recommendations.module.css'

const Recommendations = (props) => {
  return (
    <div className={classes.recommendations}>
      {props.children}
    </div>
  );
};
export default Recommendations;
