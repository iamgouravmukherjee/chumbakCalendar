import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import './App.css';
import Calendar from './components/Calendar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/" component={Calendar} exact={true}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    months: state.months,
    active: state.active,
    showPopup: state.showPopup
  }
}
export default connect(mapStateToProps)(App);
