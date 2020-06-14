import React, {Component, Fragment} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import {InputGroup} from '@blueprintjs/core';

import Messages from './messages';
import NameDialog from './name-dialog';

const ChatboxContainer = styled.form`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ccc;
  padding: 10px;
`;

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      name: "",
    };
  }

  componentDidMount() {
    this.socket = io('http://localhost:8080', {
      query: `id=${this.props.id}`,
    });

    this.socket.on('message', this.onMessageReceived.bind(this));

    this.onSubmit = this.onSubmit.bind(this);
  }

  onMessageReceived(message) {
    const {messages} = this.state;

    this.setState({
      messages: [
        ...messages,
        message,
      ],
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const {message} = this.state;

    if (!message) return;

    this.socket.emit('message', {message});
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
        <Messages messages={messages} />
        <ChatboxContainer onSubmit={this.onSubmit}>
          <InputGroup
            autoFocus
            placeholder="Enter a message..."
            value={message}
            onChange={(event) => {
              this.setState({message: event.target.value})
            }} />
        </ChatboxContainer>
      </Fragment>
    );
  }
};

export {Room as default};
