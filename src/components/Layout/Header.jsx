import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  return (
    <StHeader>
      <h1>I가 되고픈 P의 TODOLIST</h1>
      <button
        onClick={() => {
          navigate('/home');
        }}>
        home으로 이동
      </button>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  background-color: #c9dcf5;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
