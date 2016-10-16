

var Navigation = require('react-router')
const CalendarBody = React.createClass({
			mixins: [Navigation],
			getMonthDays:function(){
		      
		        var year = this.props.year,
				    month = this.props.month;
				var temp = new Date(year,month+1,0); 
				return temp.getDate(); 
			},	
			getFirstDayWeek:function(){
                        
				var year = this.props.year,
				    month = this.props.month;	
				var dt = new Date(year,month,1);
				var Weekdays = dt.getDay();
			
				return Weekdays; 	
			},
		 render:function(){
				var arry1 =[],arry2 = [];
				var getDays = this.getMonthDays(),
					FirstDayWeek = this.getFirstDayWeek(),
					day = this.props.day;
					year = this.props.year;
				    month = this.props.month;
					itemWithEvents = this.props.itemWithEvents;	
					
				var temp = new Date(); 
					
					for(var i = 0 ;i < FirstDayWeek; i++ ){
						arry1[i] = i;
					}
					for(var i = 0 ;i < getDays; i++ ){
						arry2[i] = (i+1);
					}
					var tt = month + 1;
					//var id = year +'' + tt +''+day;
			//console.log(itemWithEvents.includes('1'));
				var node1 = arry1.map(function(item){return <li className ="date"></li>})
				var node2 = arry2.map(function(item){return (day == item && year == temp.getFullYear()&& month == temp.getMonth())?
					((itemWithEvents.includes(year +'.' + tt +'.'+item))?<li className ="date curDate"><a href = {'/getEvent'+year +'.' + tt +'.'+item} id ={year +'.' + tt +'.'+item}>{item}<p>*</p></a></li>:<li className ="date curDate"><a href = {'/getEvent'+year +'.' + tt +'.'+item} id ={year +'.' + tt +'.'+item}>{item}</a></li>): (itemWithEvents.includes(year +'.' + tt +'.'+item))? <li className = "date"><a href = {'/getEvent'+year +'.' + tt +'.'+item} id ={year +'.' + tt +'.'+item} >{item}<p>*</p></a></li>:
				    <li className = "date"><a href = {'/getEvent'+year +'.' + tt +'.'+item} id ={year +'.' + tt +'.'+item} >{item}</a></li>}.bind(this));
				return(
					<div>
							<ul className="weekday">
								<li className ="weekday-item">SUN</li>
								<li className ="weekday-item">MON</li>
								<li className ="weekday-item">TUE</li>
								<li className ="weekday-item">WED</li>
								<li className ="weekday-item">THU</li>
								<li className ="weekday-item">FRI</li>
								<li className ="weekday-item">SAT</li>
							</ul>
						
						 
							<ul className="CalendarDay">{node1}{node2}</ul>
						 
				    </div>
				)
			}
		});
		module.exports = CalendarBody;