import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery('allDayTodos', async () => {
    return await axios.get('http://localhost:4001/todos?userId=1');
  });

  // 필요한 거 : [{서로 다른 날짜, 해당 날짜의 completed(true/false)}]
  /*
  0. 최종으로 얻을 객체를 담은 배열 만들기
  1.유니크한 날짜만 담긴 배열 만들기 ⭐️
  2. 해당 날짜 총갯수 | 1의배열 반복하면서 => 한 요소에대해 filter return => 배열요소 인것만 담기. => length.
  3. true값 총갯수 | 2의배열 에서 filter return => 배열요소 && true 인것만 담기. => length
  4. push로 0에서 초기화한 변수에 담기 | {날짜, completed : true/false(총-true)}
  */
  let processedDailyTodos = [];
  if (data) {
    // 1.
    let uniqueDate = [];
    data.data.forEach(item => {
      if (!uniqueDate.includes(item.date)) {
        uniqueDate.push(item.date);
      }
    });
    //  2. data.data에 uniqueData 몇개?
    uniqueDate.forEach(date => {
      let oneUniqueDateArr = data.data.filter(item => {
        return item.date === date;
      });
      let trueNumArr = oneUniqueDateArr.filter(item => {
        return item.completed === true;
      });
      processedDailyTodos.push({ date: date, trueNum: trueNumArr.length, totalNum: oneUniqueDateArr.length });
    });
    // console.log('processedDailyTodos', processedDailyTodos);
  }

  if (isLoading) {
    return <div>로딩중입니당</div>;
  }

  if (isError) {
    return <div>에러남</div>;
  }
  // console.log('data.data', data.data);
  return (
    <>
      <h1>Home</h1>
      <StUl>
        {processedDailyTodos.map(item => {
          return (
            <li key={item.date}>
              <span>작성날짜 : {item.date}</span>
              <span>
                완료갯수 : {item.trueNum}/{item.totalNum}
              </span>
              <button
                onClick={() => {
                  navigate(`/daily-todo/${item.date}`, { state: { trueNum: item.trueNum, totalNum: item.totalNum } });
                }}>
                관리하러 go
              </button>
              {/* onClick시 해당 날짜로 */}
            </li>
          );
        })}
      </StUl>
      <button
        onClick={() => {
          navigate('/daily-todo');
        }}>
        dailyTodo로 이동
      </button>
    </>
  );
};

export default Home;

const StUl = styled.ul`
  padding: 20px;
  & li {
    border-bottom: 1px solid black;
    padding: 20px;
  }
`;
