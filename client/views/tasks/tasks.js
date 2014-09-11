(function(){
  'use strict';

  angular.module('kwiktask')
  .controller('TasksCtrl', ['$scope', 'Priority', 'Task', function($scope, Priority, Task){
    $scope.sort = 'name';
    $scope.task = {};
    $scope.tasks = [];

    Priority.all().then(function(response){
      $scope.priorities = response.data.priorities;
    });

    Task.all().then(function(tasks){
      $scope.tasks = tasks;
    });

    $scope.add = function(){
      Task.create($scope.task).then(function(response){
        $scope.tasks.push(response.data.task);
        $scope.task = {};
      });
    };
  }]);
})();
