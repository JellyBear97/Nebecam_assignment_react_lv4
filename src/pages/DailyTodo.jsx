import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import DailyTodoItem from '../components/DailyTodo/DailyTodoItem';

const DailyTodo = () => {
  const { date } = useParams();
  const { state } = useLocation();
  const { trueNum, totalNum } = state;

  let forTodoToddleObj = {};
  let forMutateToggleObj = {};
  const { data, isLoading, isError } = useQuery('oneDayTodo', async () => {
    const response = await axios.get(`http://localhost:4001/todos?userId=1&&date=${date}`);

    // for toggle
    response.data.forEach(item => {
      forTodoToddleObj = { ...forTodoToddleObj, [item.id]: false };
      forMutateToggleObj = { ...forMutateToggleObj, [item.id]: false };
    });
    return response.data;
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러남</div>;
  }
  return (
    <>
      <h1>{date}'s TODOLIST</h1>
      <p>
        완료현황 : {trueNum}/{totalNum}
      </p>
      <StUl>
        {data.map(item => {
          return <DailyTodoItem item={item} forTodoToddleObj={forTodoToddleObj} forMutateToggleObj={forMutateToggleObj} />;
        })}
      </StUl>
    </>
  );
};

export default DailyTodo;

const StUl = styled.ul`
  padding: 20px;
  & li {
    border-bottom: 1px solid black;
    padding: 20px;
  }
`;
