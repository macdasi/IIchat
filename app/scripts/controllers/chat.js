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
  .controller('ChatCtrl',['$location','$scope','MessageService', function ($location,$scope,MessageService) {
    $scope.name = ( $location.search().name);
    $scope.id = ( $location.search().id);
    $scope.messeges = [];
    $scope.message = '';

    $scope.SendMessage = function(){
      if($scope.message == '')
        return;
      MessageService.postMessage({sender:$scope.id, name: $scope.name, message:$scope.message });
      $scope.message = '';
    };

    //notify on login
    MessageService.postMessage({sender:$scope.id, name: $scope.name, type:1 ,message:$scope.name + ' joined the conversation.'   });

    MessageService.addListener(function(m){
      console.log(m.data);
      $scope.messeges[$scope.messeges.length] = m.data;
      $scope.$digest();
      var objDiv = document.getElementById("chatDiv");
      objDiv.scrollTop = objDiv.scrollHeight;

    });

  }]);
