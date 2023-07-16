import { useState } from 'react';

const useInput = () => {
  const [state, setState] = useState('');

  const handler = e => {
    setState(e.target.value);
  };

  return [state, handler];
};

export default useInput;
