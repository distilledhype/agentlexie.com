var router = require('../mixins/with_route');
var flight = require('flightjs');

module.exports = flight.component(routing, router);

function routing() {
  this.after('initialize', afterInit);
  this.loadHome = loadHome;
  this.loadPage = loadPage;
  this.loadSubPage = loadSubPage;

  //////

  function afterInit() {
    this.defineRoute({
      '/': 'loadHome',
      '/:route': 'loadPage',
      '/:route1/:route2': 'loadSubPage'
    });
  }

  function loadHome() {
    this.trigger('route.change', { route: 'home' });
    this.trigger('page.transition.start');
  }

  function loadPage(route) {
    this.trigger('route.change', route);
    this.trigger('page.transition.start');
  }

  function loadSubPage(routes) {
    var eventRoute = {
      route: routes.route1 + '/' + routes.route2
    };

    this.trigger('route.change', eventRoute);
    this.trigger('page.transition.start');
  }
}
