require('jquery');
require('bootstrap');
require('reactjs-localstorage');
require('react-search-input');

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Task from './Task.jsx';
import Header from './Header.jsx';
import {reactLocalStorage} from 'reactjs-localstorage';
import PChart from './PChart.jsx';
import BChart from './BChart.jsx';

class App extends React.Component {
  constructor (props) {
    super(props);
  };
   render() {
      return (
        <Router>
          <div>
            <Header/>
            {/*<div className="container">
              <div
                className="row">
                  <Task/>
               </div>
             </div>*/}
          <Switch>
            <Route exact path='/' component={Task} />
            <Route exact path='/PChart' component={PChart} />
            <Route exact path='/BChart' component={BChart} />
          </Switch> 
          </div>
        </Router>       
      );
   }
}
export default App;