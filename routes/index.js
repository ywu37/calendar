"use strict";
require('babel-core/register')
var React = require('react');
var ReactDOM = require('react-dom/server');
require('node-jsx').install();
const App = require("../public/js/source/components/dailyEvent.js");
const data = require("../data/events");



//let html = ReactDOM.renderToString(React.createFactory(DailyEvent)());

const constructorMethod = (app) => {

    app.get("/", (req, res) => {
        res.render("home", {});
    });
    app.get("/getItemWithEvents:id", (req, res) => {

        data.getItemWithEvent(req.params.id).then((events) => {
            res.json(events);
        }).catch(() => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });

    });
    app.get("/getEvents:id", (req, res) => {
        data.getDayEvent(req.params.id).then((events) => {

            res.json(events);
        }).catch(() => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });

    });
    app.get("/getEvent:id", (req, res) => {
        data.getDayEvent(req.params.id).then((events) => {

            var content = ReactDOM.renderToString(React.createElement(App, { items: events, date: req.params.id }));
            res.render('partials/dailyView', { react: content, state: JSON.stringify(events), date: JSON.stringify(req.params.id) });
        }).catch(() => {
            // Something went wrong with the server!
            res.sendStatus(500);
        });

    });
    app.post("/addEvent", (req, res) => {

        data.addEvent(req.body).then((events) => {
            var content = ReactDOM.renderToString(React.createElement(App, { items: events, date: events[0].date_id }));
            res.render('partials/dailyView', { react: content, state: JSON.stringify(events), date: JSON.stringify(events[0].date_id) });
            //res.render('partials/dailyView', {html:html});
        }).catch(() => {
            // Something went wrong with the server!

            res.sendStatus(500);
        });

    });



};

module.exports = constructorMethod;