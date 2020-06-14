import React from 'react';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

const Home = () => {
  const history = useHistory();
  const onCreateRoom = () => {
    history.push(`/room/${uuidv4()}`);
  };

  return (
    <button onClick={onCreateRoom}>Create room</button>
  );
};

export {Home as default};
