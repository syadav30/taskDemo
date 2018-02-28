import React from 'react';
import BarChart from 'react-bar-chart';
import {reactLocalStorage} from 'reactjs-localstorage';
import $ from 'jquery';

const margin = {top: 20, right: 20, bottom: 30, left: 40};
class BChart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			width : 200
		};
		this.dynamicColor=this.dynamicColor.bind(this);
	};
	componentDidMount(){
	    window.onresize = () => {
	    	this.setState({width: this.refs.root.offsetWidth}); 
    	};
  	};
  	dynamicColor(){
		var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
	};
   render() {
   		var that = this;
   		var a = reactLocalStorage.get('taskList'),
   		uniqueArr = [],
   		data = [];
   		if(a){
   			a = JSON.parse(a);
   			$.each(a,function(ind,elm){
   				if(uniqueArr.length){
   					var a = uniqueArr.filter(function(v){return v.statusText == elm.statusText});
   					if(!a.length){
   						uniqueArr.push(elm);
   					}
   				}
   				else{
   					uniqueArr.push(elm);
   				}
   			});
   			$.each(uniqueArr,function(ind,elm){
   				var count = a.filter(function(v){return v.statusText == elm.statusText})
   				data.push({text:count[0].statusText,value:count.length,color:that.dynamicColor()});
   			});
   		}
      	return (
	      	<div ref='root'>
	            <div style={{width: '50%'}}> 
	                <BarChart ylabel='Task'
	                  width={this.state.width}
	                  height={500}
	                  margin={margin}
	                  data={data}
	                />
	            </div>
	        </div>
      	);
    }
}
export default BChart;