import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Home from './home';
import Room from './room';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" children={<Home />} />
          <Route path="/room/:id" children={<Room />} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
