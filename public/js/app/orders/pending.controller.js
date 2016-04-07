(function() {
  'use strict';

  angular
    .module("app")
    .controller("PendingController", PendingController);

  PendingController.$inject = ["$http"];

  function PendingController($http) {
    var vm = this;
    $http.get('/api/orders')
      .then(function(res) {
        vm.orders = res.data;
      }, function(err) {
        console.log(err);
      });
  }

})();

