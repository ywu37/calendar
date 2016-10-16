"use strict"
const fs = require('jsonfile');
const Promise = require('bluebird');

let exportedMethods = {
    getItemWithEvent(id) {
        let t = [];
  let temp = fs.readFileSync('data/events.json').events;
  for (var i in temp) {
     if(temp[i].date_id !=''&& temp[i].date_id != null && temp[i].date_id != undefined) {
      if(temp[i].date_id.split('.')[0] == id.split('.')[0]&& temp[i].date_id.split('.')[1] == id.split('.')[1]) {
          t.push(temp[i].date_id)
      }
     }
  }
        return Promise.resolve(t);
    },
    getDayEvent(id) {
       
        let t = [];
  let temp = fs.readFileSync('data/events.json').events;
  for (var i in temp) {
      if(temp[i].date_id == id) {
          t.push(temp[i])
      }
  }
        return Promise.resolve(t);
    },
    addEvent(event) {
        let date = event.date.substring(0, 10);
        let arr = date.split('/');
        let month = arr[0];
        let day = arr[1];
        if (arr[0].charAt(0) == '0') {
            month = arr[0].charAt(1);
        }
        if (arr[1].charAt(0) == '0') {
            day = arr[1].charAt(1);
        }
        let eventId = arr[2] + '.' + month + '.' + day;
        let myEvent = {
            date_id: eventId,
            date : event.date,
            title: event.title,
            location: event.location,
            description: event.description,
        };
         
  var configFile = fs.readFileSync('data/events.json');
  configFile.events.push(myEvent);
  fs.writeFileSync('data/events.json', configFile);
  let t = [];
  let temp = fs.readFileSync('data/events.json').events;
  for (var i in temp) {
      if(temp[i].date_id == eventId) {
          t.push(temp[i])
      }
  }

     return Promise.resolve(t);
    }
}

module.exports = exportedMethods;