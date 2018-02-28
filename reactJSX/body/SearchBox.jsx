import React from 'react';
import $ from 'jquery';
import SearchInput, {createFilter} from 'react-search-input';

class SearchBox extends React.Component {
	constructor(props){
		super(props);
	};
  
   render() {
      return (
        <div>
        	<form className="form-inline" onSubmit={this.props.searchResult}>
            <div className="input-group col-md-12 mr-0 ml-0 pr-0 pl-0">    
                <input 
                   type="text" 
                   value = {this.props.form.text} 
                   onChange = {this.props.updateSearchText} className="form-control"
                   placeholder="Search Task"/>
              </div> 
          </form>
        </div>  	
      );
   }
}
export default SearchBox;