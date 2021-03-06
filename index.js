"use strict";
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;

const timeAgo = require('node-time-ago');

const SettingsBill = require('./settings-bill');
const settingsBill = SettingsBill();

// import handlebars and body-parser
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(express.static('public'));

// handlebars
app.engine('handlebars', exphbs({ 
  defaultLayout: 'main', 
  helpers : { 
    'ago_date' : function() {
        return timeAgo(this.timestamp);
    },
    'timestamp' : function() {
        let date = this.timestamp;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        
        let am_pm = hours < 12 ? "AM" : "PM";
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        
        return hours + ":" + minutes + am_pm;
    },
  }
}));

app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  // render context
  let context = {
    totalBill: settingsBill.total(),
    callsTotal: settingsBill.callTotal(),
    smsTotal: settingsBill.smsTotal(),
    totalAlert: settingsBill.totalAlert(),
    costs: settingsBill.costs(),
  };
  res.render('home', context);
});

app.post("/settings", function (req, res) {
  // from the front-end
  let call = req.body.callCost;
  let sms = req.body.smsCost;
  let warning = req.body.warningLevel;
  let critical = req.body.criticalLevel;
  // to Factory function
  settingsBill.callCost(call);
  settingsBill.smsCost(sms);
  settingsBill.warning(warning);
  settingsBill.critical(critical);

  res.redirect('/');
});

app.post("/calculate", function (req, res) {
  let billType = req.body.billItemTypeWithSettings;
  settingsBill.calculate(billType);
  res.redirect('/');
});

app.get("/records", function(req, res){
  let context = settingsBill.records();
  res.render('records', {records:context});
});

app.get("/records/:type", function(req, res){
  let type = req.params.type;
  res.render('records', {records: settingsBill.records(type)});
});

app.listen(PORT, function (err) {
  console.log('App starting on port ', PORT);
});
