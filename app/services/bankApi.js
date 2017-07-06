'use strict';

app.service('bankApi', function(){
  return function () {
    return {
      accounts: function(){
        return {
          get: function(){},
          post: function(){}
        }
      },
      transactions: function(){
        return {
          get: function(){},
          post: function(){}
        }
      },
      pot: function(){
        return {
          get: function(){}
        }
      }
    }
  }
});