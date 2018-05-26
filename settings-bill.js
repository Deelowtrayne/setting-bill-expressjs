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
      if (smsCost !== value) {
          smsCost = parseFloat(value);
      }
  }

  function setWarningLevel(value) {
      if (warningLevel !== value) {
          warningLevel = parseFloat(value);
      }
  }

  function setCriticalLevel(value) {
      if (criticalLevel !== value) {
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

  function getTotalBill (){
    totalBill = calls + smses;
    return totalBill.toFixed(2);
  }
  function getCallRecords() {
    return billRecords.filter(bill => bill.type === 'call');
  }

  function getSmsRecords() {
    return billRecords.filter(bill => bill.type === 'sms');
  }

  function getRecords() {
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
    callRecords:  getCallRecords,
    smsRecords:   getSmsRecords,
    records:      getRecords
  }
}

// settingsBill = BillWithSettings();

// function updateSettings(){
//   var call = newCallCost.value.trim();
//   var sms = newSmsCost.value.trim();
//   var criticalLevel = newCriticalLevel.value.trim();
//   var warningLevel = newWarningLevel.value.trim();
//   settingsBill.callCost(call);
//   settingsBill.smsCost(sms);
//   settingsBill.warning(warningLevel);
//   settingsBill.critical(criticalLevel);
// }

// function updateSettingsBillDisplays(){
//   txtCallTotalSettings.innerHTML = settingsBill.callTotal();
//   txtSmsTotalSettings.innerHTML = settingsBill.smsTotal();
//   txtTotalSettings.innerHTML = settingsBill.total();
//   txtTotalSettings.classList.add(settingsBill.totalAlert());
//   if (settingsBill.totalAlert() === 'danger')
//     settingsAddBtn.disabled = true;
// }

// function processSettingsBill() {
//   var checkedRadioBtn = document.querySelector("input[name='billItemTypeWithSettings']:checked");
//   if (checkedRadioBtn)
//     settingsBill.calculate(checkedRadioBtn.value);
//   updateSettingsBillDisplays();
// }

// updateSettingsBtn.addEventListener('click', updateSettings);
// settingsAddBtn.addEventListener('click', processSettingsBill);
