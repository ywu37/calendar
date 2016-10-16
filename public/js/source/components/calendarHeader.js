
var CalendarHeader = React.createClass({
			getInitialState:function(){
				var newDate =  new Date();
				return {
					year: newDate.getFullYear(),
					month: newDate.getMonth(),
				};
			},
			
			handleLeftClick:function(){
				var newMonth = parseInt(this.state.month) - 1;
				var year = this.state.year;
				if(newMonth < 0){
					year --;
					newMonth = 11;
				}
				this.state.month = newMonth;
				this.state.year=year;
				this.setState(this.state);
				this.props.updateFilter(year,newMonth);
 
			},
			handleRightClick:function(){
				
				var newMonth = parseInt(this.state.month) + 1;
				var year = this.state.year;
				if( newMonth > 11 ){
					year ++;
					newMonth = 0;
				}
				this.state.month = newMonth;
				this.state.year=year;
				this.setState(this.state);
				this.props.updateFilter(year,newMonth);
                       },
			render:function(){
				var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
				return(
					
					<div className="calendarHeader">
						
						
						 <button  className="triangle-left glyphicon glyphicon-chevron-left" onClick={this.handleLeftClick}></button>
						 <p>&nbsp;&nbsp;&nbsp;{monthNames[this.state.month]} &nbsp;&nbsp;&nbsp;</p>
						 <p>{this.state.year}&nbsp;&nbsp;&nbsp;</p>
						
						<button  className="triangle-right glyphicon glyphicon-chevron-right" onClick={this.handleRightClick}></button>
						
					</div>
				)
			}
		});
		module.exports = CalendarHeader;