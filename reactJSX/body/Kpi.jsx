import React from 'react';
import $ from 'jquery';
class Kpi extends React.Component {
	constructor(props){
		super(props);
	};
  
   render() {
      return (
      <div>
        <label className="px-2">Task KPI: </label>
      	<div className="btn-group" role="group">
          <button className={"btn px-2 mr-2 btn-"+(this.props.activeKpi == null ? "primary" : "secondary")} onClick={(e) => { this.props.updateKpi(null); }}>All &nbsp;&nbsp; {this.props.tasklist.length}</button>
    			{this.props.status.map((item,i)=>
            <button key={i} className={"mr-2 btn btn-"+(this.props.activeKpi == item.value ? "primary" : "secondary")} onClick={(e) => { this.props.updateKpi(item.value); }}>{item.text} &nbsp;&nbsp; {this.props.getKpiList(item.value,false).length} </button>
          )}
  		  </div>
      </div>  	
      );
   }
}
export default Kpi;
