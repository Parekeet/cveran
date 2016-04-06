(function() {
  "use strict";

  angular
    .module("app")
    .config(appRoutes);

  appRoutes.$inject = ["$urlRouterProvider", "$stateProvider"];

  function appRoutes($urlRouterProvider, $stateProvider) {
    $stateProvider
      .state("signin", {
        url:          "/signin",
        templateUrl:  "/js/app/auth/signin.html",
        controller:   "SignInController",
        controllerAs: "vm"
      })
      .state("profile", {
        url:          "/profile",
        templateUrl:  "/js/app/users/profile.html",
        controller:   "ProfileController",
        controllerAs: "vm",
        authorized:   true
      })
      .state("home", {
        url: "/home",
        templateUrl: "js/app/layouts/home.html"
      })
      .state("about", {
        url: "/about",
        templateUrl: "js/app/layouts/about.html"
      })
      .state("menu", {
        url: "/menu",
        templateUrl: "js/app/menu/menu.html",
        controller: "MenuController",
        controllerAs: "vm"
      })
      .state("contact", {
        url: "/contact",
        templateUrl: "js/app/layouts/contact.html"
      });

    $urlRouterProvider.otherwise("/");
  }

  angular
    .module("app")
    .run(authorizeRoutes); // Register the following function to run
                           // AFTER the above configuration.

  // $state and authService you know. $rootScope is different. It's
  // the shared "scoping" object which is inherited by all bindings
  // ($scope or vm) anywhere in the app. If you add something to
  // $rootScope, it's like adding it to EVERY "vm" (view-model, ie
  // template-controller binding), directive, filter, etc. in the app.
  authorizeRoutes.$inject = ["$state", "authService", "$rootScope"];

  function authorizeRoutes($state, authService, $rootScope) {

    // $on is the Angular event listener: we are telling Angular to
    // listen to any $stateChangeStart events triggered in our app!
    $rootScope.$on("$stateChangeStart", function(event, toState) {

      // Check the new state's "authorized" property, which is not built
      // in to ui-router, it just happens to match the property I added
      // to the state definition on line #25 above!
      if (toState.authorized && !authService.isLoggedIn()) {
        $log.debug(`Attempted to go to ${toState.url} but was not logged in.`);
        $state.go("signin");    // Go here immediately, and
        event.preventDefault(); // do not let the event continue.
      }
    });
  }

})();
