import React from 'react';


class TaskForm extends React.Component {
	constructor(props){
		super(props);
	}
   render() {
      return (
  			<form className="form-inline" onSubmit={this.props.addTask}>
		        <div className="input-group col-md-9">    
		        	<input 
		             type="text" 
		             value = {this.props.form.TaskName} 
		             onChange = {this.props.updateForm} className="form-control"
		             placeholder="Enter Task Name"/>
		        </div>     
		        <button className="btn-primary" disabled = {!this.props.form.TaskName}>Add Task</button>
        	</form>	
      );
   }
}
export default TaskForm;