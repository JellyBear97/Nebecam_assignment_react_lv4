import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { HiDotsHorizontal } from 'react-icons/hi';
import axios from 'axios';

const DailyTodoItem = ({ item, forTodoToddleObj, forMutateToggleObj }) => {
  const queryClient = useQueryClient();
  const [todoOpen, setTodoOpen] = useState(forTodoToddleObj);
  const [meatballOpen, setMeatballOpen] = useState(forMutateToggleObj);
  // 이건 찾아본거라 다시 써보장
  const toggleTodo = todoId => {
    setTodoOpen(prevTodoOpen => ({
      ...prevTodoOpen,
      [todoId]: !prevTodoOpen[todoId],
    }));
  };
  const toggleMeatball = todoId => {
    setMeatballOpen(MeatballOpen => ({
      ...MeatballOpen,
      [todoId]: !MeatballOpen[todoId],
    }));
  };

  const deletingMutation = useMutation({
    mutationFn: async todoId =>
      await axios.delete(`http://localhost:4001/todos/${todoId}`).then(() => {
        queryClient.invalidateQueries('oneDayTodo');
      }),
  });
  const handleDeletePost = todoId => {
    deletingMutation.mutate(todoId);
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
          <HiDotsHorizontal onClick={() => toggleMeatball(item.id)} />
          {meatballOpen[item.id] && (
            <div>
              <button>수정</button>
              <button onClick={() => handleDeletePost(item.id)}>삭제</button>
            </div>
          )}
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
