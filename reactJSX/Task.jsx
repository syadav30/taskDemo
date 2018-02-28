import React from 'react';
import $ from 'jquery';
import TaskList from './body/TaskList.jsx';
import TaskForm from './body/TaskForm.jsx';
import {reactLocalStorage} from 'reactjs-localstorage';

class Task extends React.Component {
	constructor (props) {
		super(props);
		var a = reactLocalStorage.get('taskList');
	    this.state = {
	      task : {
	        form : {
	          TaskName: ""
	        }
	      },
	      Status:[
	        {value:"0",text:"Open"},
	        {value:"1",text:"InProgress"},
	        {value:"2",text:"Complete"}
	      ],
	      taskList : a ? JSON.parse(a) : [],
	      id : 0,
	      logTemplate : {
	        createdOn : "",
	        changedOn : [],
	      }
	    }
	    this.updateForm = this.updateForm.bind(this);
	    this.addTask = this.addTask.bind(this);
	    this.changeStatus = this.changeStatus.bind(this);
	    this.delete = this.delete.bind(this);
	    this.syncLocalStorage = this.syncLocalStorage.bind(this);
	};
	updateForm(e){
	    this.state.task.form.TaskName = e.target.value;
	    this.setState(this.state);
	};
	syncLocalStorage(){
	    reactLocalStorage.set('taskList', JSON.stringify(this.state.taskList));
	};
	addTask (e){
	    this.state.id = this.state.id + 1;
	    var log = jQuery.extend(true, {}, this.state.logTemplate);
	    log.createdOn = new Date();
	    var statusObj = this.state.Status.filter(function(v){return v.value == 0})[0];
	    console.log(statusObj)
	    this.state.taskList.push(JSON.parse(JSON.stringify({task:this.state.task.form.TaskName,status:"0",statusText:statusObj.text,id:this.state.id,logDetails:log})));
	    this.state.task.form.TaskName = "";
	    this.setState(this.state);
	    this.forceUpdate();
	    e.preventDefault();
	    this.syncLocalStorage();
	};
	changeStatus(task,e){
		console.log(e);
	    var that = this;
	    $.each(this.state.taskList,function(ind,elm){
	      if(elm.id == task.id){
	        elm.status = e.target.value;
	        var cTime = new Date();
	        var status = that.state.Status.filter(function(v){return v.value == e.target.value})[0];
	        elm.logDetails.changedOn.push({time:cTime,changedStatus:status.text});
	        elm.statusText = status.text;
	      }
	    })
	    this.setState(this.state);
	    this.syncLocalStorage();
	};
	delete(e){
	    var arrIndex = null;
	    this.state.taskList = this.state.taskList.filter(function(v){return v.id != e});
	    this.setState(this.state);
	    this.syncLocalStorage();
	};
   render() {
      	return ( 
		        <div className="col-md-6 offset-md-3 ">
		        	<div className="pt-5">
		        		<TaskForm form={this.state.task.form} addTask={this.addTask} updateForm={this.updateForm}/>
		        	</div>
		        	<div className="pt-5">
		     			<TaskList taskList={this.state.taskList} status ={this.state.Status} changeStatus={this.changeStatus} delete={this.delete} showLog={this.showLog} />
		     		</div>	
		     	</div>
      	);
   	}
}
export default Task;