import React, { useState } from 'react'


const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total; // Good: 1, Neutral: 0, Bad: -1
  const positivePercent = `${(good / total) * 100}%`
  
  if (total === 0) {
    return (
      <p>No feedback given</p>
    );
  }
  
  return (
    <>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={total} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positivePercent} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handeClickGood = () => {
    setGood(good + 1);
  };

  const handeClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handeClickBad = () => {
    setBad(bad + 1);
  };


  return (
    <>
      <div>
        <h1>Give Feedback</h1>  
        <Button handleClick={handeClickGood} text="good" />
        <Button handleClick={handeClickNeutral} text="neutral"/>
        <Button handleClick={handeClickBad} text="bad" />
      </div>
      
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral}/>
      </div>
    </>
  );
};

export default App;