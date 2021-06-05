import React, { useState } from 'react';

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
);

/**const App = () => {
  const [ counter, setCounter ] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

  return (
    <div>
      <Display counter={counter} />
      <Button 
        handleClick={increaseByOne} 
        text="plus"
      />
      <Button
        handleClick={setToZero} 
        text="zero"
      />
      <Button
        handleClick={decreaseByOne} 
        text="minus"
      />
    </div>
  );
};**/

/**const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });

  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });
  const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 });


  return (
    <div>
      {clicks.left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {clicks.right}
    </div>
  );
};**/

const History = (props) => {
  if (props.allClicks.length == 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    );
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  );
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
