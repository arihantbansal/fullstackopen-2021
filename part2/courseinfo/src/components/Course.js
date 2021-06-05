import React from 'react';

const Header = ({name}) => {
    return (
      <h1>
        {name}
      </h1>
    );
  };
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercise={part.exercises} />
        )}
      </>
    );
  };
  
  const Part = ({name, exercise, key}) => {
    return (
      <p key={key}>
        {name} {exercise}
      </p>
    );
  };
  
  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0);
    return (
      <p className="total">
        total of {total} exercises
      </p>
    );
  };

  export default Course;