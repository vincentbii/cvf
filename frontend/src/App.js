import { CssBaseline, Container } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Header from './header';
import Inventory from './Inventory';
import Reorders from './Reorders';
import Sidebar from './sidebar';
import Sell from './sell';
import ProcessReorders from './ProcessReorders';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <CssBaseline />
        <Sidebar />

        <Container maxWidth="sm">
          <Route exact path='/Inventory' component={Inventory} />
          <Route exact path='/Reorders' component={Reorders} />
          <Route exact path='/Sell/:id' component={Sell} />
          <Route exact path='/ProcessReorders/:id' component={ProcessReorders} />
        </Container>



      </div>

    </Router>

  );
}

export default App;
