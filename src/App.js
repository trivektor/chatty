import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './home';
import Room from './room';

function App() {
  return (
    <div style={{padding: 20}}>
      <Router>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route path="/room/:id" children={<Room />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
