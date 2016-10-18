

const CalendarHeader = require('./calendarHeader');
const CalendarBody = require('./calendarBody');
const CalendarControl = React.createClass({
	getInitialState: function () {
		var newDate = new Date();
		return {
			year: newDate.getFullYear(),
			month: newDate.getMonth(),
			day: newDate.getDate(),
			itemWithEvents: []
		};
	},

	handleFilterUpdate: function (filterYear, filterMonth) {
		var tempMonth = filterMonth + 1;
		$.ajax({
			url: "/getItemWithEvents" + filterYear + '.' + tempMonth,
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: (itemWithEvents) => {

				this.setState({ itemWithEvents: itemWithEvents });
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		});
		this.setState({
			year: filterYear,
			month: filterMonth,
		});
	},
	componentDidMount: function () {
		var tempMonth = this.state.month + 1;
		$.ajax({
			url: "/getItemWithEvents" + this.state.year + '.' + tempMonth,
			type: 'GET',
			dataType: 'json',
			cache: false,
			success: (itemWithEvents) => {

				this.setState({ itemWithEvents: itemWithEvents });
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		});
	},
	render: function () {
		return (
			<div className="calendarBorder"  >
				<CalendarHeader
					year={this.state.year}
					month={this.state.month}
					updateFilter={this.handleFilterUpdate} />
				<CalendarBody
					year={this.state.year}
					month={this.state.month}
					day={this.state.day}
					itemWithEvents={this.state.itemWithEvents}
					/>
			</div>
		)
	}
});

ReactDOM.render(
	<CalendarControl />, document.getElementById('content'));