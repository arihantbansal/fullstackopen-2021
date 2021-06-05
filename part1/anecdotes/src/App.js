import React, { useState } from 'react';


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const maxVotesIndex = points.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>

        <p>{anecdotes[selected]}</p>
        <p>{`has ${points[selected]} votes`}</p>

        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>

      <div>
        <h1>Anecode with most votes</h1>

        <p>{anecdotes[maxVotesIndex]}</p>
        <p>{`has ${points[maxVotesIndex]} votes`}</p>
      </div>
    </>
  );
}

export default App;