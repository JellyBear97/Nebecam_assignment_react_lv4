import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const DailyTodo = () => {
  const { date } = useParams();
  // console.log(date);
  const { data, isLoading, isError } = useQuery('oneDayTodo', async () => {
    const response = await axios.get(`http://localhost:4001/todos?userId=1&&date=${date}`);
    // return response.data;
  });
  console.log('isLoading', isLoading);
  if (isLoading) {
    return <div>로딩중</div>;
  }
  console.log('isError', isError);

  if (isError) {
    return <div>에러남</div>;
  }

  if (data) {
    console.log(data);
  }

  return (
    <>
      <h2>날짜별 조회</h2>
    </>
  );
};

export default DailyTodo;
