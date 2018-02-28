import React from 'react';
import Kpi from './Kpi.jsx' 
import $ from 'jquery';
import SearchBox from './SearchBox.jsx';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['task'];
class TaskList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeKpi: null,
			isShowKpi : this.props.taskList.length ? true : false,
			search : {
				form : {
					text : ""
				}
			},
			suggetionList : []
		};
		this.updateSearchText = this.updateSearchText.bind(this);
		this.searchResult = this.searchResult.bind(this);
		this.getKpiList = this.getKpiList.bind(this);
		this.updateKpi = this.updateKpi.bind(this);
		this.getLogView = this.getLogView.bind(this);
		this.getStatusText = this.getStatusText.bind(this);
		this.getSuggetionList = this.getSuggetionList.bind(this);
		this.updateSuggetionList = this.updateSuggetionList.bind(this);
	};
	getSuggetionList(){
		if(this.state.suggetionList.length){
			return this.state.suggetionList;
		}
		else return [];
	}
	updateSearchText(e){
		this.state.search.form.text = e.target.value;
		this.setState(this.state);
	};
	searchResult(){
		var currentList = this.getKpiList(this.state.activeKpi);
		currentList.filter(createFilter(this.state.search.form.text, KEYS_TO_FILTERS)); 
	};
	componentDidMount(){
		$('[data-toggle="popover"]').popover({
			trigger : 'focus'
		});
	};
	componentDidUpdate(prevProps, prevState) {
      $('[data-toggle="popover"]').popover({
			trigger : 'focus'
		});
    };
    updateSuggetionList(search,kpi){
    	var that = this;
		var iTask = this.props.taskList.filter(function(v){
			return v.task.includes(search) && v.status != kpi;
		}); 
		if(iTask.length){
			this.state.suggetionList = [];
			$.each(iTask,function(ind,elm){
				that.state.suggetionList.push(elm);
			});
		} else{
			this.state.suggetionList = [];
		}
		//this.setState(this.state);
    }
	getKpiList(e, search) {
		var that = this,
		kpi = e ? e : this.state.activeKpi,
		search = typeof search  != "undefined" ? search : this.state.search.form.text;
		if(search && kpi){
			this.updateSuggetionList(search,kpi);
		}
		return this.props.taskList.filter(function(v){
			return ( kpi == null ? true : (v.status == kpi)) && (search ? v.task.includes(search) : true);
		});
	};
	getStatusText(e){
		if(e){
			var status = this.props.status.filter(function(v){return v.value == e})[0];
			return status.text;
		}
		else{
			return "All";
		}
		
	}
	getLogView(e){
		var html = "";
		html += "Create On "+ e.createdOn;
		html += "<br />";
		if(e.changedOn.length){
			$.each(e.changedOn,function(ind,elm){
				html += "Changed Status : "+ elm.changedStatus;
				html += "<br />";
				html += "Changed On : " + elm.time;
				html += "<br />";
			})
		}
		return html;
	}
	updateKpi(kpi) {
		this.state.activeKpi = kpi;
		this.setState(this.state);
		// this.forceUpdate();
	};
   render() {
      return (
      	<div>
      		<div className="px-5">
      			{this.props.taskList.length ? <Kpi updateKpi={this.updateKpi} status={this.props.status} getKpiList = {this.getKpiList} activeKpi= {this.state.activeKpi} tasklist = {this.props.taskList}/> : null}
      		</div>
      		<div className = "pt-5" >
      			{this.getKpiList(false, false).length && this.props.taskList.length ? <SearchBox form={this.state.search.form} updateSearchText={this.updateSearchText} searchResult={this.getKpiList} tasklist = {this.props.taskList}/> : null}
      		</div>
      		{!this.getKpiList(false, false).length && this.props.taskList.length ? <div className="alert alert-secondary">
  				{this.state.search.form.text ? "No Task found for search " +'"'+ this.state.search.form.text + '"' +"in "+ this.getStatusText(this.state.activeKpi) + " state": "No task Found in " + this.getStatusText(this.state.activeKpi)+" state"}
			</div> : null}
	      	<div className="pt-2">
		    	<ul className="list-group">
	     			{this.getKpiList().map((item,i) =>
	     				<li
	     					className="list-group-item d-flex justify-content-between align-items-center"
	     					key={i}>
	     					{item.task}
			     				<select
			     					value={item.status}
			     					className="selectpicker"
			     					data-style="btn-info"
			     					onChange={(e) => {
				     					this.props.changeStatus(item, e);
			     					}}>
			     					{this.props.status.map((elm,index)=>
			     						<option key={index} value={elm.value}>{elm.text}</option>
			     					)}
			     				</select>
			     				<div className="btn-group">
				     				<button onClick={(e) => {
				     					this.props.delete(item.id);
				     				}} className="btn btn-danger mr-2">
					     				<i className="far fa-trash-alt"></i>
				     				</button>
				     				<button className="btn px-2" data-toggle="popover" title="Logs" data-content={this.getLogView(item.logDetails)} data-html="true">
					     				<i className="far fas fa-info"></i>
				     				</button>
				     			</div>		
	     				</li>
	     			)}
	     		</ul>
		    </div>
		    {this.getSuggetionList().length && this.state.activeKpi ? <div className = "panel pull-right bg-info text-white">
	    		<div className="panel-heading">Suggestion : </div>
	    		<div className="panel-body">
  					<ul className="list-group">
  						{this.getSuggetionList().map((item,i)=>
  							<li key={i}>
  								Task {item.task} exists in  {this.getStatusText(item.status)}
  							</li>
  						)}
  					</ul>
				</div>
			</div> : null}
		</div>    	
      );
   }
}
export default TaskList;