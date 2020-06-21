import React, {Fragment, useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import Peer from 'simple-peer';
import {Button, Intent} from '@blueprintjs/core';
import Draggable from 'react-draggable';

const VideoContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 100;
`;

const VideoButton = styled(Button)`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 100;
`;

const Video = () => {
  const ref = useRef();

  useEffect(() => {
    const peer1 = new Peer({initiator: true});
    const peer2 = new Peer();

    peer1.on('signal', (data) => {
      peer2.signal(data)
    });

    peer2.on('signal', (data) => {
      peer1.signal(data)
    });

    peer2.on('stream', (stream) => {
      ref.current.srcObject = stream;

      ref.current.play();
    });

    window.navigator
      .mediaDevices
      .getUserMedia({video: true, audio: true})
      .then((stream) => {
        peer1.addStream(stream);
      }).catch((err) => {
        console.log({err});
      });

    const current = ref.current;

    return () => {
      peer1.destroy();
      current.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
      current.pause();
      current.srcObject = null;
    };
  }, []);

  return (
    <video ref={ref} width={200} />
  );
};

const ChatVideo = () => {
  const [videoEnabled, setVideoEnabled] = useState(false);

  return (
    <Fragment>
      {videoEnabled &&
        <Draggable>
          <VideoContainer>
            <Video />
          </VideoContainer>
        </Draggable>}
      <VideoButton
        onClick={() => setVideoEnabled(!videoEnabled)}
        icon="mobile-video"
        intent={videoEnabled ? Intent.SUCCESS : null} />
    </Fragment>
  );
};

export {ChatVideo as default};
