import React from 'react';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {Button} from '@blueprintjs/core';

const Home = () => {
  const history = useHistory();
  const onCreateRoom = () => {
    history.push(`/room/${uuidv4()}`);
  };

  return (
    <Button onClick={onCreateRoom}>Create room</Button>
  );
};

export {Home as default};
