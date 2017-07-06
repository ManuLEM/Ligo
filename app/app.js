var app = angular.module("app", ['ngRoute']);
app.constant('Config', {
  "dataFolder": "assets"
});

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: './app/templates/index.html'
  }).
  when('/data', {
    templateUrl: './app/templates/data.html',
    controller: 'homeController'
  }).
  when('/lending', {
    templateUrl: './app/templates/lending.html'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
