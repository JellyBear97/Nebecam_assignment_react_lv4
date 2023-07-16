import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { styled } from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <StWrapper>
      <Header />
      <StWidth>
        <Outlet />
      </StWidth>
      <Footer />
    </StWrapper>
  );
};

export default Layout;

const StWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const StWidth = styled.div`
  background-color: beige;
  width: 1200px;
  min-height: calc(100vh - 200px);
  margin: 100px auto;
`;
