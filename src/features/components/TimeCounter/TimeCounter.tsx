import React from 'react';
import classes from './TimeCounter.module.scss';

const TimeCounter = () => {
  const [state, setState] = React.useState(0);

  const onMinus = () => {
    setState((prevState) => prevState - 1);
  };
  const onPlus = () => {
    setState((prevState) => prevState + 1);
  };

  return (
    <div className={classes.btn}>
      <h1>TimeCounter</h1>
      <h2>{state}</h2>
      <div>
        <button onClick={onMinus}>-</button>
        <button onClick={onPlus}>+</button>
      </div>
    </div>
  );
};

export default TimeCounter;
