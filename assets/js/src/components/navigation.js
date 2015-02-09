var flight = require('flightjs');
var URI = require('URIjs');
var router = require('../mixins/with_route');

module.exports = flight.component(navigation, router);

function navigation() {
  this.attributes({
    navItemSelector: '.navitem'
  });

  this.after('initialize', afterInitialize);

  /////////

  function afterInitialize() {
    this.on(this.select('navItemSelector'), 'click', onNavClick);
  }

  function onNavClick(event) {
    var url = $(event.target).attr('href');
    var data = {url: url};
    var route = URI(url).path();

    this.navigate(route);
    event.preventDefault();
  }
}
