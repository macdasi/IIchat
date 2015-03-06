'use strict';

/**
 control a single chat box , populate messages and controls send event of a message

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

    MessageService.addListener(

      { name: $scope.name
        , message:$scope.name + ' joined the conversation.'   },

      function(m){
      console.log(m.data);
      $scope.messeges[$scope.messeges.length] = m.data;
      $scope.$digest();
      var objDiv = document.getElementById("chatDiv");
      objDiv.scrollTop = objDiv.scrollHeight;

    });

  }]);
