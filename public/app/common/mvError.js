angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvError', function(mvToastr) {
    return {
        notify: function (msg) {
            mvToastr.error(msg);
            console.log(msg);
        }
    }
});
