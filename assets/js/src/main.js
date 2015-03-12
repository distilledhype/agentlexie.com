/**
 * Global variables
 */
global.jQuery = global.$ = require('jquery');
global.Velocity = require('velocity-animate');
global.Velocity.UI = require('../../../node_modules/velocity-animate/velocity.ui');

/**
 * Require the SoundCloud API
 *
 * This script will expose a global variable called 'SC' which
 * can be used to access the SoundCloud API.
 */
require('soundcloud-sdk');

/**
 * Components
 */
var Navigation = require('./components/navigation');
var Pages = require('./components/pages');
var Routing = require('./components/routing');
var NProgress = require('./components/nprogress');
var Player = require('./components/player');

module.exports = { kickoff: kickoff };
module.exports.kickoff();

///

function kickoff() {
  Navigation.attachTo('nav');
  Pages.attachTo('.pages');
  Routing.attachTo(document.body);
  NProgress.attachTo(document.body);
  Player.attachTo('.player');
}
