
angular.module('plannr', ['ngDragDrop','ngStorage'])
    .controller('menuCtrl', ['$scope', function ($scope) {
        $scope.subjects = [
            {title: 'Sleep', icon: 'bed', color: 'purple'},
            {title: 'Work', icon: 'briefcase', color: 'orange'},
            {title: 'Family', icon: 'group', color: 'green'},
            {title: 'Home', icon: 'home', color: 'blue'},
            {title: 'Chore', icon: 'trash', color: 'red'},
            {title: 'Children', icon: 'child', color: 'lime'},
            {title: 'Wife', icon: 'female', color: 'pink'},
            {title: 'Meal', icon: 'cutlery', color: 'yellow'},
            {title: 'Hobby', icon: 'camera-retro', color: 'cyan'},
            {title: 'Study', icon: 'graduation-cap', color: 'teal'},
            {title: 'Music', icon: 'music', color: 'light-blue'},
            {title: 'Project', icon: 'cube', color: 'indigo'},
            {title: 'TV', icon: 'tv', color: 'black'},
            {title: 'Exercise', icon: 'bicycle', color: 'grey'}
        ]
    }])
    .controller('scheduleCtrl', ['$scope','$localStorage', function ($scope, $storage) {

        $scope.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'];
        $scope.getDay = function (day, index) {
            if (index) {
                return $scope.days[$scope.days.indexOf(day) + index];
            } else {
                return $scope.days[$scope.days.indexOf(day)];
            }
        };
        $scope.update   = function (index, day) {
            console.log(index, day);
        };
        $scope.addStuff = function(e, ui){
            var sub = ui.draggable.scope().subject;
            console.log(e.target.dataset.day);
            console.log(e.target.dataset.hour);
            console.log(sub);
            $scope.plan(e.target.dataset.hour, e.target.dataset.day, sub);
        };
        $scope.plan = function (hour, day, sub) {
            console.log(hour);
            console.log(day);
            $scope.$storage.schedule[hour][day] = sub;
        };
        $scope.remove = function (time, day) {
            console.log(time, day);
            $scope.$storage.schedule[time][day] = undefined;
        };

        $scope.$storage = $storage;
        if(!$scope.$storage.schedule) {
            $scope.$storage.schedule = [];
            var startClock  = 7;
            for (var i = 0; i < 24; i++) {
                var clock = startClock + i;
                if (clock > 23) {
                    startClock = -15;
                    clock      = 0;
                }
                $scope.$storage.schedule.push({
                    clock: pad(clock, 2) + ':00',
                    index: i
                })
            }
        }


    }]);

function pad(num, length, chr) {
    if (num.length === length) {
        return num;
    }
    var str = String(num);
    if (!chr) {
        chr = '0';
    }
    while (str.length < length) {
        str = chr + str;
    }
    return str;
}