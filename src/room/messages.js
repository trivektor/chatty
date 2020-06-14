import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';

const MessagesContainer = styled.section`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 40px;
  overflow: auto;
  background: #fafafa;
`;

const Messages = ({messages}) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <MessagesContainer ref={ref}>
      {messages.map((msg, index) => <div key={index} style={{padding: 4}}>{msg}</div>)}
    </MessagesContainer>
  );
};

export {Messages as default};
