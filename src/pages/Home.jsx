import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Home</h1>
      <button
        onClick={() => {
          navigate('/daily-todo');
        }}>
        dailyTodo로 이동
      </button>
    </>
  );
};

export default Home;
