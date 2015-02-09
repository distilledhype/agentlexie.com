var router = require('../mixins/with_route');
var flight = require('flightjs');

module.exports = flight.component(routing, router);

function routing() {
  this.loadPage = function(route) {
    this.trigger('route.change', route);
  };

  this.after('initialize', function() {
    this.defineRoute({
      '/:route': 'loadPage'
    });
  });
}
