'use strict';

/**
 * @ngdoc function
 * @name iichatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iichatApp
 */

angular
  .module('iichatApp')
  .controller('ChatCtrl',['$location','$scope','$window', function ($location,$scope,$window) {
    $scope.name = ( $location.search().name);
    $scope.id = ( $location.search().id);
    $scope.messeges = [];

    $scope.message = '';

    $scope.SendMessage = function(){
      if($scope.message == '')
        return;
      $window.parent.postMessage({sender:$scope.id, name: $scope.name, message:$scope.message }, "*");
      $scope.message = '';
    };

    //notify on login
    $window.parent.postMessage({sender:$scope.id, name: $scope.name, type:1 ,message:$scope.name + ' joined the conversation.'   }, "*");



    $window.addEventListener("message", function (m) {
      console.log(m.data);
      $scope.messeges[$scope.messeges.length] = m.data;
      $scope.$digest();
      var objDiv = document.getElementById("chatDiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, false);


  }]);
