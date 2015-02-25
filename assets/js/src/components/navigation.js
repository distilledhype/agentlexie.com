var flight = require('flightjs');
var URI = require('URIjs');
var router = require('../mixins/with_route');

module.exports = flight.component(navigation, router);

function navigation() {
  this.attributes({
    navItemSelector: '.nav-link',
    subnavSelector: '.nav.nav__sub',
    activeClassname: 'active'
  });

  this.after('initialize', afterInitialize);

  /////////

  function afterInitialize() {
    this.on(this.select('navItemSelector'), 'click', onNavClick);
  }

  function onNavClick(event) {
    var target = $(event.target);
    var url = target.attr('href');
    var data = { url: url };
    var route = URI(url).path();
    var submenu = target.parents(this.attr.subnavSelector);
    var activeClassname = this.attr.activeClassname;

    // Remove the active class from all navitems.
    this.select('navItemSelector').removeClass(activeClassname);

    // If the clicked link is on a submenu set the target to main navitem.
    if (submenu.length > 0) {
      target = submenu.prev();
    }

    // Set active class on the target.
    target.addClass(activeClassname);

    // Navigate to route.
    this.navigate(route);

    // Prevent default click behavior.
    event.preventDefault();
  }
}
