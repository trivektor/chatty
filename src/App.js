import React, {useEffect} from 'react';
import io from 'socket.io-client';

function App() {
  useEffect(() => {
    io('http://localhost:8080');
  }, []);

  return (
    <div style={{padding: 20}}>
      <button>Create room</button>
    </div>
  );
}

export default App;
