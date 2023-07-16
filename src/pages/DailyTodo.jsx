import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import DailyTodoItem from '../components/DailyTodo/DailyTodoItem';
import ModalPortal from '../components/common/ModalPortal';

const DailyTodo = () => {
  const { date } = useParams();
  const { state } = useLocation();
  const { trueNum, totalNum } = state;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

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
      {/* closePortal로 전해주는 handleCloseModal을 children에 태워보내면 되겠네 */}
      {isOpenModal && <ModalPortal closePortal={handleCloseModal}>여기에 form</ModalPortal>}
      <h1>{date}'s TODOLIST</h1>
      <button onClick={handleOpenModal}>새로운 todo 만들기</button>
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
