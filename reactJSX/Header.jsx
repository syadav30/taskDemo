import React from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Task from './Task.jsx';
import PChart from './PChart.jsx';
import NormalChart from './BChart.jsx';

class Header extends React.Component {
	constructor(props){
		super(props);
    this.clearStorage = this.clearStorage.bind(this);
	};
  clearStorage(){
    localStorage.removeItem("taskList");
    window.location.reload(true);
  }
   render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Task</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to={'/'}>Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to={'/PChart'}>Pie Chart</Link></li>
                <li className="nav-item"><Link className="nav-link" to={'/BChart'}>BarChart</Link></li>  
              </ul>
              <div className="my-2 my-lg-0">
                <button className="btn btn-outline-danger my-2 my-sm-0" onClick={this.clearStorage}>Clear Local Storage</button>
              </div>
            </div>
        </nav> 
      );
   }
}
export default Header;