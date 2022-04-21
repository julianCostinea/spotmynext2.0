import React from 'react';
import classes from './Loader.module.css'

const Loader = (props) => {
    return (
      <React.Fragment>
        <label htmlFor="" className={`${classes.Label} ${props.formLoader ? classes.formLoader : null}`}>
          <div 
            className={classes.checkIcon} 
            >
            </div>
        </label>
      </React.Fragment>
    );
  };
  
  export default Loader;