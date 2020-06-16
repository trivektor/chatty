import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import {Navbar, Button} from '@blueprintjs/core';

const Home = () => {
  const history = useHistory();
  const onCreateRoom = async () => {
    const response = await fetch('/api/rooms', {
      method: 'POST',
    });
    const json = await response.json();

    history.push(`/room/${json._id}`);
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
