"use strict"
var React = require('react')
var ReactDOM = require('react-dom')
const DailyHeader = require('./dailyHeader');
var App = React.createClass({
	getInitialState: function () {
		//console.log(this.props.date);
		let temp = this.props.date.split('.');
		// console.log(temp[0]);
		return {
			items: this.props.items,
			date: this.props.date,
			year: temp[0],
			month: temp[1],
			day: temp[2]
		};
	},
	handleClick: function (filterYear, filterMonth, filterDay, items) {

		this.setState({
			year: filterYear,
			month: filterMonth,
			day: filterDay,
			items: items
		})
	},
	render: function () {
		let a = (this.state.items).map(function (value) {
			return (<div className="daily-Event">
				<li>Title:&nbsp;&nbsp;{value.title}</li>
				<li>Location:&nbsp;&nbsp;{value.location}</li>
				<li>Description:&nbsp;&nbsp;{value.description}</li>
				<hr />
			</div>
			)
		});
		return (
			<div>

				<DailyHeader year={this.state.year}
					month={this.state.month}
					day={this.state.day}
					updateFilter={this.handleClick} />

				<div className="mainPage"><p>Events for {this.state.month}/{this.state.day}/{this.state.year}:</p>

				</div>
				<div>{a}</div>
			</div>
		);
	}
});

module.exports = App;

