(function() {
  'use strict';

  angular
    .module("app")
    .controller("MenuController", MenuController);

  MenuController.$inject = ["$http"];

  function MenuController($http) {
    var vm = this;

    vm.all = [];
    vm.getMenu = getMenu;

    getMenu();

    function getMenu() {
      $http
        .get('/api/menu')
        .then(function(data) {
          vm.all = data.data;
          console.log(data);
        }, function(err) {
          console.log(err);
        });
    }
  }

})();
