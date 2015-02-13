var flight = require('flightjs');
var NProgress = require('nprogress');

module.exports = flight.component(nprogress);

function nprogress() {
  // Make the intervalId variable available to all methods.
  var intervalId;

  this.after('initialize', afterInitialize);

  //////

  function afterInitialize() {
    // Listen to the page transition start and end events.
    this.on(document, 'page.transition.start', nProgressStart);
    this.on(document, 'page.transition.done', nProgressDone);
  }

  function nProgressStart() {
    // Start nprogress.
    NProgress.start();
    // Increment the nprogress bar every 50ms.
    intervalId = window.setInterval(function() { NProgress.inc(); }, 50);
  }

  function nProgressDone() {
    // Clear the interval when the page transition is done.
    window.clearInterval(intervalId);
    // Tell nprogress that we're done.
    NProgress.done();
  }
}
