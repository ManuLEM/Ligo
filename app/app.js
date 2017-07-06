var app = angular.module("app", ['ngRoute']);
app.constant('Config', {
  "dataFolder": "assets"
});

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: './app/templates/home.html',
    controller: 'homeController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);