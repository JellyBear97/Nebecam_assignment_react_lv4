import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

const DailyTodo = () => {
  const { date } = useParams();
  const { state } = useLocation();
  const { trueNum, totalNum } = state;
  const [todoOpen, setTodoOpen] = useState({});

  const { data, isLoading, isError } = useQuery('oneDayTodo', async () => {
    const response = await axios.get(`http://localhost:4001/todos?userId=1&&date=${date}`);
    let forTodoToddleObj = {};
    response.data.forEach(item => {
      return (forTodoToddleObj = { ...forTodoToddleObj, [item.id]: false });
    });
    return response.data;
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (isError) {
    return <div>에러남</div>;
  }

  // if (data) {
  //   console.log(data);
  // }

  // 이건 찾아본거라 다시 써보장
  const toggleTodo = todoId => {
    setTodoOpen(prevTodoOpen => ({
      ...prevTodoOpen,
      [todoId]: !prevTodoOpen[todoId],
    }));
  };
  return (
    <>
      <h1>{date}'s TODOLIST</h1>
      <p>
        완료현황 : {trueNum}/{totalNum}
      </p>
      <StUl>
        {data.map(item => {
          return (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <button
                onClick={() => {
                  toggleTodo(item.id);
                }}>
                상세보기
              </button>
              {todoOpen[item.id] && (
                <StMoreLook>
                  <p>
                    내용 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id aspernatur magni, doloremque velit soluta, omnis aliquam provident, ipsa necessitatibus earum neque repellendus
                    natus saepe exercitationem vero. Velit enim harum aliquam?
                  </p>
                  <p>완료여부 : {item.completed ? '완료' : '미완료'}</p>
                </StMoreLook>
              )}
            </li>
          );
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

const StMoreLook = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
`;
