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
      {id :'chat_w_'+wIndex , name : 'Iframe '+wIndex};
      wIndex ++;
    };

    MessageService.addListener(function(m){
      if(m.data)
      {
        var iFrameInfo,targetFrame;
        if(m.data.type === 1) // login notify , notify all but sender
        {

          for (i = 0; i < $scope.chatWindows.length; i++) {
            iFrameInfo = $scope.chatWindows[i];
            if(iFrameInfo.id != m.data.sender) {
              targetFrame = document.getElementById(iFrameInfo.id);
              m.data.name = 'System';
              targetFrame.contentWindow.postMessage(m.data, '*');
            }
          }

        }
        else {  //regular chat message , notify all
          for (var i = 0; i < $scope.chatWindows.length; i++) {
            iFrameInfo = $scope.chatWindows[i];
            targetFrame = document.getElementById(iFrameInfo.id);
            targetFrame.contentWindow.postMessage(m.data, '*');
          }
        }
      }

    });

    $scope.getIframeSrc = function (data) {
      return '../chatFrame.html#?name=' + data.name +'&id=' + data.id;
    };
  }]);
