import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';

const DailyTodoItem = ({ item }) => {
  const [todoOpen, setTodoOpen] = useState({});
  // 이건 찾아본거라 다시 써보장
  const toggleTodo = todoId => {
    setTodoOpen(prevTodoOpen => ({
      ...prevTodoOpen,
      [todoId]: !prevTodoOpen[todoId],
    }));
  };
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
            내용 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id aspernatur magni, doloremque velit soluta, omnis aliquam provident, ipsa necessitatibus earum neque repellendus natus
            saepe exercitationem vero. Velit enim harum aliquam?
          </p>
          <p>완료여부 : {item.completed ? 'O' : 'X'}</p>
        </StMoreLook>
      )}
    </li>
  );
};

export default DailyTodoItem;

const StMoreLook = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
`;
