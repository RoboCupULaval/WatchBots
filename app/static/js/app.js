var app = angular.module('app', ['common']);

app.controller('RobotsOverview', RobotsOverview);

function RobotsOverview() {
    this.list = [
        {id: 0, supply: {batt: 22, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 2}},
        {id: 1, supply: {batt: 45, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 10}},
        {id: 2, supply: {batt: 13, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 22}},
        {id: 3, supply: {batt: 98, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 1}},
        {id: 4, supply: {batt: 56, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 0.1}},
        {id: 5, supply: {batt: 72, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 5}},
    ];
}

RobotsOverview.prototype.getBattUrl = function(robot) {
    if (robot.supply.batt <= 25) {
        return 'img/batt_25.png';
    }
    else if (robot.supply.batt <= 50) {
        return 'img/batt_50.png';
    }
    else if (robot.supply.batt <= 75) {
        return 'img/batt_75.png';
    }
    else {
        return 'img/batt_100.png';
    }
};

RobotsOverview.prototype.getComUrl = function(robot) {
    if (robot.com.time_since_last_packet <= 5) {
        return 'img/com_ok.png';
    }
    else {
        return 'img/com_not_ok.png';
    }
};