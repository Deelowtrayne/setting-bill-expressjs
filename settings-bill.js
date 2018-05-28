"use strict";

module.exports = function() {
  var callCost = 0;
  var smsCost = 0;
  var calls = 0;
  var smses = 0;
  var totalBill = 0;
  var warningLevel = 0;
  var criticalLevel = 0;
  var billRecords =[];

  // Setters
  function setCallCost(value) {
      if (callCost !== value && value !== "") {
          callCost = parseFloat(value);
      }
  }

  function setSmsCost(value) {
      if (smsCost !== value && value !== "") {
          smsCost = parseFloat(value);
      }
  }

  function setWarningLevel(value) {
      if (warningLevel !== value && value !== "") {
          warningLevel = parseFloat(value);
      }
  }

  function setCriticalLevel(value) {
      if (criticalLevel !== value && value !== "") {
          criticalLevel = parseFloat(value);
      }
  }

  //getters
  function getCallsTotal (){
    return calls.toFixed(2);
  }

  function getSmsTotal (){
    return smses.toFixed(2);
  }

  function getTotalBill(){
    totalBill = calls + smses;
    return totalBill.toFixed(2);
  }

  function getRecords(type) {
    if (type) {
      return billRecords.filter(bill => bill.type === type);
    }
    return billRecords;
  }

  // processors
  function calculateBill(type) {
    
    if (type === 'call' || type === 'sms') {
      
      let bill = {
        type: type,
        timestamp: new Date(),
      }

      if (type === "call"){
        calls += callCost;
        bill.price = callCost.toFixed(2);
      } 
      else if (type === "sms"){
        smses += smsCost;
        bill.price = smsCost.toFixed(2);
      }
      billRecords.unshift(bill);
    }
  }


  function totalPriceAlert() {
    if(totalBill > warningLevel && totalBill < criticalLevel)
      return 'warning';
    else if (totalBill > criticalLevel)
      return 'danger';

    return;
  }
  // Returns
  return {
    callCost:     setCallCost,
    smsCost:      setSmsCost,
    warning:      setWarningLevel,
    critical:     setCriticalLevel,
    calculate:    calculateBill,
    callTotal:    getCallsTotal,
    smsTotal:     getSmsTotal,
    total:        getTotalBill,
    totalAlert:   totalPriceAlert,
    records:      getRecords
  }
}

