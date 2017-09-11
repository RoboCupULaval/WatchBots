var app = angular.module('app', ['common']);

app.controller('RobotsOverview', RobotsOverview);

function RobotsOverview () {
    this.view_mode = 'list'; // list or grid
    this.order_by = 'info.name';
    this.robots_list = [
        {info: {id: 0, name: 'Robot 0'}, supply: {batt: 22, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 2}},
        {info: {id: 1, name: 'Robot 1'}, supply: {batt: 45, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 10}},
        {info: {id: 2, name: 'Robot 2'}, supply: {batt: 13, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 22}},
        {info: {id: 3, name: 'Robot 3'}, supply: {batt: 98, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 1}},
        {info: {id: 4, name: 'Robot 4'}, supply: {batt: 56, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 0.1}},
        {info: {id: 5, name: 'Robot 5'}, supply: {batt: 72, voltage: 15.6, current: 1.3, power: 20.28}, com: {time_since_last_packet: 5}}
    ];
    this.params_list = [
        {name: 'name', category: 'info', display_name: 'Robot name', unit: ''},
        {name: 'batt', category: 'supply', display_name: 'Batt. percentage', unit: '%'},
        {name: 'voltage', category: 'supply', display_name: 'Batt. voltage', unit: 'V'},
        {name: 'current', category: 'supply', display_name: 'Total current', unit: 'A'},
        {name: 'power', category: 'supply', display_name: 'Power used', unit: 'W'},
        {name: 'time_since_last_packet', category: 'com', display_name: 'Time since last packet', unit: 's'}
    ];
    this.categories_list = [
        {name: 'info', display_name: 'Info'},
        {name: 'supply', display_name: 'Supply'},
        {name: 'com', display_name: 'Communication'}
    ];
}

RobotsOverview.prototype.getBattUrl = function (robot) {
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

RobotsOverview.prototype.getComUrl = function (robot) {
    if (robot.com.time_since_last_packet <= 5) {
        return 'img/com_ok.png';
    }
    else {
        return 'img/com_not_ok.png';
    }
};

RobotsOverview.prototype.changeViewModeToList = function () {
    this.view_mode = 'list';
};


RobotsOverview.prototype.changeViewModeToGrid = function () {
    this.view_mode = 'grid';
};

RobotsOverview.prototype.setOrderBy = function (param) {
    new_order_by = param.category + '.' + param.name;
    if(this.order_by === new_order_by) {
        this.order_by = '-' + new_order_by;
    } else {
        this.order_by = new_order_by;
    }
    console.log(this.order_by)
};