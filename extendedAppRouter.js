"use strict";

define([
  'underscore',
  'backbone',
  'marionette'
], function (_, Backbone, Marionette) {

  return Backbone.Marionette.AppRouter.extend({
    constructor: function (options) {
      options = options || {};
      var subControllers = options.subControllers || this.subControllers;
      this.controller = options.controller || this.controller || {};
      options.controller = undefined;
      if (subControllers) {
        _.each(subControllers, _.bind(this.registerSubController, this));
      }
      Backbone.Marionette.AppRouter.prototype.constructor.call(this, options);
    },
    registerSubController: function (controller, name) {
      var root = this.controller;
      _.each(controller, function (fn, action) {
        root[name + '_' + action] = fn;
      });
    },
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
  }, {
    urlFor: function (route, obj) {
      var routes = this.prototype.appRoutes,
        path = _.find(_.keys(routes), function (key, v) {
          return routes[key] === route;
        }, this);
      if (path === undefined) {
        return '*';
      }
      if (obj) {
        _.each(obj, function (v, k) {
          path = path.replace('(/:' + k + ')', '/' + v).replace(':' + k, encodeURIComponent(v));
        });
      }
      path = path.replace(/\(\/:[^\)]*\)/g, '');
      return path;
    }
  });

});