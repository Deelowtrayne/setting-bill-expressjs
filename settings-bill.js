 "use strict";

module.exports = function () {

  var billRecords = [];
  var costValues = {
    warning: 30,
    critical: 50,
  };
  var totals = {
    call: 0,
    sms: 0,
  };

  // Setters
  function setCallCost(value) {
    if (value && value !== "") {
      costValues.call = parseFloat(value);
    }
    return costValues['call'];
  }

  function setSmsCost(value) {
    if (value && value !== "") {
      costValues.sms = parseFloat(value);
    }
    return costValues['sms'];
  }

  function setWarningLevel(value) {
    if (value && value !== "") {
      costValues.warning = parseFloat(value);
    }
    return costValues['warning'];
  }

  function setCriticalLevel(value) {
    if (value && value !== "") {
      costValues.critical = parseFloat(value);
    }
    return costValues['critical'];
  }

  //getters
  function getCostValues(){
    return costValues;
  }

  function getCallsTotal() {
    return totals['call'].toFixed(2);
  }

  function getSmsTotal() {
    return totals['sms'].toFixed(2);
  }

  function getTotalBill() {
    totals.total = totals.call + totals.sms;
    return totals.total.toFixed(2);
  }

  function getRecords(type) {
    if (type) {
      return billRecords.filter(bill => bill.type === type);
    }
    return billRecords;
  }

  // processors
  function calculateBill(type) {
    if (costValues[type]) {
      var bill = {
        type: type,
        timestamp: new Date(),
      }
      totals[type] += costValues[type];

      if (costValues[type] > 0) {
        bill.price = costValues[type];
      }
      billRecords.unshift(bill);
    }
  }

  function totalPriceAlert() {
    if (totals.total > costValues.critical) {
      return 'danger';
    } 
    else if (totals.total > costValues.critical) {
      return 'warning';
    }
    // else just return nothing  
    return;
  }

  // Returns
  return {
    callCost: setCallCost,
    smsCost: setSmsCost,
    warning: setWarningLevel,
    critical: setCriticalLevel,
    calculate: calculateBill,
    costs: getCostValues,
    callTotal: getCallsTotal,
    smsTotal: getSmsTotal,
    total: getTotalBill,
    totalAlert: totalPriceAlert,
    records: getRecords
  }
}
