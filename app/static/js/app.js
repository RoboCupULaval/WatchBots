var app = angular.module('app', ['common']);

app.controller('RobotsOverview', RobotsOverview);

function RobotsOverview (socket, $http) {
    var that = this;
    this.view_mode = 'list'; // list or grid
    this.order_by = 'info.name';
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

    this.robots_list = [];

    $http.get('get_robots_list').success(function (list) {
        that.robots_list = list;
    });

    socket.emit('ping', 'The Data');
    socket.on('ping', function (data) {
        console.log('ping : ', data)
    });

    socket.on('robots_insert', function (robot_data) {
        that.robots_list.push(robot_data);
    });

    socket.on('robots_remove', function (robot_name) {
        that.robots_list.forEach(function (robot, id) {
            if (robot.info.name === robot_name) {
                that.robots_list.splice(id, 1);
            }
        });
    });

    socket.on('robots_update', function (robot_data) {
        that.robots_list.forEach(function (robot) {
            if (robot.info.name === robot_data.info.name) {
                robot.com = robot_data.com;
                robot.supply = robot_data.supply;
            }
        });
    });
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