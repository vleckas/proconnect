angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function(mvAuth) {
            return mvAuth.authorizeCurrentUserForRoute('admin')
        }},
        user: {auth: function(mvAuth) {
            return mvAuth.authorizeAuthenticatedUserForRoute()
        }}
    }

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/player-profile', { templateUrl: '/partials/account/player-profile',
            resolve: routeRoleChecks.user
        })
        .when('/about-us', { templateUrl: '/partials/about-us/about-us'
        })
        .when('/contact-us', { templateUrl: '/partials/contact-us/contact-us'
        })

});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    })
});