import React, {Component, Fragment} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

import Messages from './messages';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  color: #fff;
  background: green;
  box-sizing: border-box;
  height: 40px;
`;

const ChatboxContainer = styled.form`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
  border-top: 1px solid #ccc;
  padding: 12px;

  input {
    border: 0;
    width: 100%;
    border-radius: 8px;
    background: #fff;
    padding: 10px 15px;
    border: 1px solid #ccc;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }
`;

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
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
    const {messages, message} = this.state;

    return (
      <Fragment>
        <Header>Chat</Header>
        <Messages messages={messages} />
        <ChatboxContainer onSubmit={this.onSubmit}>
          <input
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
