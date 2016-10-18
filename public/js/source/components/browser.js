var React = require('react'),
    ReactDOM = require('react-dom'),
    App = require('./dailyEvent.js');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);
var initialDate = JSON.parse(document.getElementById('initial-date').innerHTML);
ReactDOM.render(<App items={initialState} date={initialDate} />, document.getElementById('react-root'));
