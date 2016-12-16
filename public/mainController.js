angular.module('app').controller('mainController', function($scope, $http){
    $scope.broken = 'working';

    $http.get('http://localhost:3000/api/users/5').then(function(response){
        console.log(response)
    })
})
