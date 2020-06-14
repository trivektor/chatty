import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.section`
  position: absolute;
  top: 49px;
  left: 0;
  right: 0;
  bottom: 51px;
  overflow: auto;
  background: #fafafa;
  padding: 10px 15px;
`;

const MessageItem = styled.div`
  padding: 5px 0;

  .content {
    background: #e0e0e0;
    border-radius: 15px;
  }

  &.alternate {
    text-align: right;

    .content {
      background: #147efb;
      color: #fff;
    }
  }
`;

const MessageContent = styled.span`
  display: inline-block;
  padding: 4px 10px;
`;

const Messages = ({messages, name}) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  console.log({messages});

  return (
    <MessagesContainer ref={ref}>
      {
        messages.map((messageObj, index) => (
          <MessageItem
            key={index}
            className={messageObj.name !== name && 'alternate'}>
            <MessageContent className="content">
              {messageObj.message}
            </MessageContent>
          </MessageItem>
        ))
      }
    </MessagesContainer>
  );
};

export {Messages as default};
