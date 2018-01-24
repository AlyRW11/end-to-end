import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './Pages/Home'
import CreateCar from './Pages/CreateCar'

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <Link to="/">Home </Link>
              <Link to="/createcar">Create Car</Link>
            </nav>

            <Route exact path="/" component={Home}/>
            <Route path="/createcar" component={CreateCar}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
