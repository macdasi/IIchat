'use strict';

/**
   creates the chat windows one by one , handle add window event

 */
angular.module('iichatApp')
  .controller('MainCtrl',['$scope','MessageService', function ($scope,MessageService) {
    var wIndex = 0;
    $scope.chatWindows = [];
    $scope.AddWindow = function(){
      $scope.chatWindows[$scope.chatWindows.length] =
      {id :'Iframe'+wIndex , name : 'Iframe '+wIndex};
      wIndex ++;
    };

    MessageService.addListener(null,function(m){
      if(m.data)
      {
        var iFrameInfo,targetFrame;
        for (var i = 0; i < $scope.chatWindows.length; i++) {
            iFrameInfo = $scope.chatWindows[i];
            targetFrame = document.getElementById(iFrameInfo.id);
            targetFrame.contentWindow.postMessage(m.data, '*');
        }
      }
    });

    $scope.getIframeSrc = function (data) {
      return '../chatFrame.html#?name=' + data.name +'&id=' + data.id;
    };
  }]);
