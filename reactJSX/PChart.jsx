import React from 'react';
import PieChart from "react-svg-piechart"
import {reactLocalStorage} from 'reactjs-localstorage';
import $ from 'jquery';

class PChart extends React.Component {
	constructor(props){
		super(props);
		this.dynamicColor=this.dynamicColor.bind(this);
	}
	dynamicColor(){
		var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
	}
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
   				data.push({value:count.length,title:count[0].statusText,color:that.dynamicColor()});
   			});
   		}
	    return (
	      	<div>
	  			<PieChart
	  				data={data}
	  				viewBoxSize="200"
	  				onSectorHover={(d, i, e) => {
				      if (d) {
				        console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
				      } else {
				        console.log("Mouse leave - Index:", i, "Event:", e)
				      }
	    			}}
				/>
	  		</div>
	    );
    }
}
export default PChart;