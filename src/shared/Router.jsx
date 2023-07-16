import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import DailyTodo from '../pages/DailyTodo';
import Layout from '../components/Layout/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/daily-todo" element={<DailyTodo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
