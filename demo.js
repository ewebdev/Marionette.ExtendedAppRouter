"use strict";

define([
  'extendedAppRouter',
  'controllers/home', /* some controllers for example */
  'controllers/products',
  'controllers/account'
], function (ExtendedAppRouter, homeController, productsController, accountController) {

  var Router = ExtendedAppRouter.extend({
    appRoutes: {
      '': "home_index",
      'stats': "home_stats",

      "products(/:category)(/:id)": "products_index",

      "account": "account_index",
      "account/profile": "account_profile",
      "account/security": "account_security",
      "account/subscription": "account_subscription",

      '*path': "home_notFound"
    }
  });

  return new Router({
    subControllers: {
      home: homeController,
      products: productsController,
      account: accountController
    }
  });

});