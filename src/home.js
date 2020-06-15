import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {Navbar, Button} from '@blueprintjs/core';

const Home = () => {
  const history = useHistory();
  const onCreateRoom = () => {
    history.push(`/room/${uuidv4()}`);
  };

  return (
    <Fragment>
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>Chatty</Navbar.Heading>
        </Navbar.Group>
      </Navbar>
      <div style={{padding: 20}}>
        <Button onClick={onCreateRoom}>Create room</Button>
      </div>
    </Fragment>
  );
};

export {Home as default};
