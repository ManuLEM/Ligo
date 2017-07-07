'use strict';

app.service('bankApi', function($http){
  return function () {
    return {
      accounts: function(){
        return {
          get: function(){},
          post: function(){}
        }
      },
      transactions: function(account_id){
        return {
          get: function(transaction_id){},
          all: function(latest,stagnate){
            if (stagnate) {
              return new Promise(function(resolve, reject) {
                resolve([{
                  "details": {
                    "completed": latest.x,
                    "new_balance": {
                      "currency": "EUR",
                      "amount": latest.y
                    }
                  }
                }]);
              });
            }
            var max = (latest) ? latest.y + 100 : 50000;
            var min = (latest) ? latest.y - 300 : 40000;
            var amount = (latest) ? Math.floor(Math.random()*(max-min+1)+min) : Math.round(Math.random()*25000)/100;
            // return $http.get('app/mocks/transactions.json')
            return $http({
              method: 'GET',
              timeout: 2000,
              url:'https://socgen-p-api.openbankproject.com/obp/v3.0.0/banks/sg05-bank-y/accounts/001/owner/transactions',
              headers: {
                'authorization':'DirectLogin token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIiOiIifQ.IU7dMn-fBq5xCC9t90vs2q3ePFaQlW4lmxNfCX-3-0Y"',
                'cache-control':'no-cache',
                'content-type':'application/json'
              }
            })
            .then(function(response) {
              return [{
                "details": {
                  "completed": moment().subtract(2, 'seconds').format(),
                  "new_balance": {
                    "currency": "EUR",
                    "amount": ""+amount
                  }
                }
              }]
              return response.data.transactions;
            })
            .catch(function(err){
              console.error(err);
              return [{
                "details": {
                  "completed": moment().subtract(2, 'seconds').format(),
                  "new_balance": {
                    "currency": "EUR",
                    "amount": ""+amount
                  }
                }
              }]
            });
          },
          post: function(){}
        }
      },
      pot: function(){
        return {
          get: function(){
            return $http.get('mocks/pot.json').then(function(response) {
              return response;
            });
          }
        }
      }
    }
  }
});