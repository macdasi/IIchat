'use strict';

/**
 enable mechanism for messaging across iframes and parent

 */

angular
  .module('iichatApp')
  .service('MessageService', ['$window', function(win) {

    var addListener = function(firstJoinMessage,callback){

      if(firstJoinMessage){
        //notify on new chat enter sender
        firstJoinMessage.name = 'System';
        postMessage(firstJoinMessage);
      }

      win.addEventListener("message", function (m) {
        if(callback)
        {
          callback(m);
        }
      }, false);
    };



    var postMessage = function(m){
      win.parent.postMessage(m, "*");
    };
    return {postMessage:postMessage,addListener:addListener};
  }]);
