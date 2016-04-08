(function() {
  'use strict';

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$http", "$scope", "$log", "$state"];

  function ProfileController($http, $scope, $log, $state) {
    var vm = this;

    vm.all        = [];
    vm.category;
    vm.submit     = submit;
    vm.remove     = remove;
    vm.order      = [];
    vm.total      = 0;
    vm.deleteItem = deleteItem;

    selectFood();

    vm.placeOrder = function() {
      $http.post('/api/orders', {
        items: vm.order,
        total: vm.total,
        phoneNumber: vm.order.phoneNumber || 'n/a'
      })
      .then(function(order) {
        // possibly show new order message

        $state.go('pending');
      });
    };


    function selectFood() {
      $http
        .get('/api/profile')
        .then(function(data) {
          vm.all = data.data;
          vm.categories = []
          vm.all.forEach(function (item) {
            if (vm.categories.indexOf(item.category) < 0) {
              vm.categories.push(item.category);
            }
          })
          console.log(data);
        }, function(err) {
          console.log(err);
        });
    }


    function submit(itemId) {
      //push stuff to an array
      if (itemId) {
        var item = _.find(vm.all, {_id: itemId});
        vm.order.push(item);
        vm.total += item.cost;
      }
    };

    function remove() {
      console.log("I'm working");
    };


    function deleteItem (itemId, index) {
      if (itemId) {
        var item = _.find(vm.all, {_id: itemId});
        console.log(item);
        vm.order.splice(itemId, 1);
      }
    };





    document.getElementById("category-selection").addEventListener("change", function (evt) {
      document.getElementById('order').value = ''
      vm.item = null
    })

  }

})();


console.log("PROFILE CONTROLLER HERE!");



