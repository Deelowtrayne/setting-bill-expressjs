"use strict";
const assert = require('assert');
const SettingsBill = require('../settings-bill');

describe ("Tests the Settings-bill logic", function(){
    it('setCallCost should return 2.34', function(){
        let settingsBill = SettingsBill();
        assert.equal(settingsBill.callCost(2.34), 2.34);
    });
    it('setSmsCost should return 2.34', function(){
        let settingsBill = SettingsBill();
        assert.equal(settingsBill.smsCost(2.34), 2.34);
    });
    it('totalAlert function should return warning', function(){
        let settingsBill = SettingsBill();
        settingsBill.callCost(2.50);
        settingsBill.warning(2.00);
        settingsBill.calculate('call');
        settingsBill.calculate('call');
         settingsBill.total()
        assert.equal(settingsBill.totalAlert(), 'warning');
    });
})


//