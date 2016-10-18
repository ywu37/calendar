var React = require('react')
var ReactDOM = require('react-dom')
var dailyHeader = React.createClass({
    getInitialState: function () {
        return {
            year: this.props.year,
            month: this.props.month - 1,
            day: this.props.day
        };
    },

    handleLeftClick: function () {
        var newDay = parseInt(this.state.day) - 1;
        let month = this.state.month;
        let year = this.state.year;
        if (newDay < 1) {
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            newDay = new Date(year, month + 1, 0).getDate();
        }
        this.state.day = newDay;
        this.state.month = month;
        this.state.year = year;
        this.setState(this.state);
        var tempMonth = month + 1;
        $.ajax({
            url: "/getEvents" + year + '.' + tempMonth + '.' + newDay,
            type: 'GET',
            cache: false,
            success: (items) => {

                this.props.updateFilter(year, month + 1, newDay, items);
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });

    },
    handleRightClick: function () {
        let month = this.state.month;
        let year = this.state.year;
        var newDay = parseInt(this.state.day) + 1;
        if (newDay > new Date(year, month + 1, 0).getDate()) {
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            newDay = 1;
        }
        this.state.day = newDay;
        this.state.month = month;
        this.state.year = year;
        this.setState(this.state);
        var tempMonth = month + 1;
        $.ajax({
            url: "/getEvents" + year + '.' + tempMonth + '.' + newDay,
            type: 'GET',
            cache: false,
            success: (items) => {
                this.props.updateFilter(year, month + 1, newDay, items);
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });

    },
    render: function () {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return (

            <div className="dailyHeader">


                <button className="glyphicon glyphicon-chevron-left" onClick={this.handleLeftClick}></button>
                <p>&nbsp;&nbsp;{monthNames[this.state.month]}&nbsp;&nbsp;</p>
                <p>{this.state.day}&nbsp;&nbsp;&nbsp;</p><p>{this.state.year}&nbsp;&nbsp;</p>

                <button className="glyphicon glyphicon-chevron-right" onClick={this.handleRightClick}></button>

            </div>
        )
    }
});
module.exports = dailyHeader;