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

// Player components.
var Player = require('./components/player');
var PlayerPlayButton = require('./components/player-play-button');

function kickoff() {
  Navigation.attachTo('nav');
  Pages.attachTo('.pages');
  Routing.attachTo(document.body);
  NProgress.attachTo(document.body);

  // Add player components.
  Player.attachTo('.player', { clientId: '5656ba27f714e54289054c57fcc2d319' });
  PlayerPlayButton.attachTo('.player-play-button');
}

module.exports = { kickoff: kickoff };
module.exports.kickoff();
