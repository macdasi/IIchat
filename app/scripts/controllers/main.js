'use strict';

/**
   creates the chat windows one by one , handle add window event

 */
angular.module('iichatApp')
  .controller('MainCtrl',['$scope','$window', function ($scope,$window) {
    var wIndex = 0;
    $scope.chatWindows = [];
    $scope.AddWindow = function(){
       var newWindow = {id :'chat_w_'+wIndex , name : 'Iframe '+wIndex};
      $scope.chatWindows[$scope.chatWindows.length] = newWindow;
      wIndex ++;
    };

    $window.addEventListener('message', function (m) {
      if(m.data)
      {
        if(m.data.type) // login notify , notify all but sender
        {
          for (var i = 0; i < $scope.chatWindows.length; i++) {
            var iFrameInfo = $scope.chatWindows[i];
            if(iFrameInfo.id != m.data.sender) {
              var targetFrame = document.getElementById(iFrameInfo.id);
              m.data.name = 'System';
              targetFrame.contentWindow.postMessage(m.data, '*');
            }
          }

        }
        else {  //regular chat message , notify all
          for (var i = 0; i < $scope.chatWindows.length; i++) {
            var iFrameInfo = $scope.chatWindows[i];
            var targetFrame = document.getElementById(iFrameInfo.id);
            targetFrame.contentWindow.postMessage(m.data, '*');
          }
        }
      }
    }, false);

    $scope.getIframeSrc = function (data) {
      return '../chatFrame.html#?name=' + data.name +'&id=' + data.id;
    };
  }]);
