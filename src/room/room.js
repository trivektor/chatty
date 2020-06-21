import React, {Component, Fragment} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import {InputGroup, ButtonGroup, Button, Navbar, Alignment} from '@blueprintjs/core';
import {withRouter} from 'react-router';

import Messages from './messages';
import NameDialog from './name-dialog';
import ChatVideo from './chat-video';

const ChatboxContainer = styled.form`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ccc;
  padding: 10px;

  .bp3-button-group {
    width: 100%;
  }

  .bp3-input-group {
    flex: 1;
    background: #fafafa;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 0 4px 4px 0;

    .bp3-input {
      background: inherit;
      box-shadow: none;

      &:focus {
        background: inherit;
        box-shadow: none;
      }
    }
  }
`;

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      name: sessionStorage.getItem('name') || '',
    };
  }

  componentDidMount() {
    const {match} = this.props;

    this.socket = io('/chatty', {
      query: `id=${match.params.id}`,
    });

    this.socket.on('message', this.onMessageReceived.bind(this));

    this.onSubmit = this.onSubmit.bind(this);

    fetch(`/api/room/${match.params.id}`).then((response) => response.json()).then((json) => {
      this.setState({messages: json.messages});
    });
  }

  onMessageReceived({message, name}) {
    const {messages} = this.state;

    this.setState({
      messages: [
        ...messages,
        {message, name},
      ],
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const {message, name} = this.state;

    if (!message) return;

    const {match} = this.props;

    this.socket.emit('message', {message, name, roomId: match.params.id});
    this.setState({message: ''});
  }

  render() {
    const {messages, message, name} = this.state;

    if (!name) {
      return (
        <NameDialog
          onNameConfirm={(confirmedName) => this.setState({name: confirmedName})} />
      );
    }

    return (
      <Fragment>
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>Chatty</Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
          </Navbar.Group>
        </Navbar>
        <Messages name={name} messages={messages} />
        <ChatboxContainer onSubmit={this.onSubmit}>
          <ButtonGroup>
            <Button>{name}</Button>
            <InputGroup
              autoFocus
              placeholder="Enter a message..."
              value={message}
              onChange={(event) => {
                this.setState({message: event.target.value})
              }} />
          </ButtonGroup>
        </ChatboxContainer>
        <ChatVideo />
      </Fragment>
    );
  }
};

export default withRouter(Room);
