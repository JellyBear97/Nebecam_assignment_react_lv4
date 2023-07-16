import React from 'react';
import { styled } from 'styled-components';

const Footer = () => {
  return (
    <StFooter>
      <p>footer</p>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.footer`
  background-color: #ffb5b3;
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
