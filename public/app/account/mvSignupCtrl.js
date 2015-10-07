angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, mvError, $location, mvAuth) {

    $scope.signup = function() {
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.fname,
            lastName: $scope.lname,
            club: $scope.club,
            roles: $scope.roles,
        };

        mvAuth.createUser(newUserData).then(function() {
            mvNotifier.notify('User account created!');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        })
    }
});