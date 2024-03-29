import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  );
}

const Part = (part) => {
  return (
    <p>
      {part.name} {part.exercise}
    </p>
  );
}

const Content = ({ parts }) => {

  const [part1, part2, part3] = parts;

  return (
    <div>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </div>
  );
}

const Total = ({ parts }) => {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <p>
      Number of exercises {total}
    </p>
  );
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ],
  };


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
} 

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
