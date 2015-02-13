var router = require('../mixins/with_route');
var flight = require('flightjs');

module.exports = flight.component(routing, router);

function routing() {
  this.loadPage = function(route) {
    this.trigger('route.change', route);
    this.trigger('page.transition.start');
  };

  this.loadSubPage = function(routes) {
    var eventRoute = {
      route: routes.route1 + '/' + routes.route2
    };

    this.trigger('route.change', eventRoute);
    this.trigger('page.transition.start');
  };

  this.after('initialize', function() {
    this.defineRoute({
      '/:route': 'loadPage',
      '/:route1/:route2': 'loadSubPage'
    });
  });
}
