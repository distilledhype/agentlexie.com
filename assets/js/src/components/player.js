/* global SC */

var flight = require('flightjs');

module.exports = flight.component(player);

function player() {
  var defaultAttrs = {
    clientId: '5656ba27f714e54289054c57fcc2d319'
  };

  this.attributes(defaultAttrs);
  this.after('initialize', afterInit);
  // this.animateContent = animateContent;

  //////

  function afterInit() {
    SC.initialize({ client_id: this.attr('clientId') });
    SC.get('/resolve', { url: 'https://soundcloud.com/agentlexie/irule' }, getTrack);

    /**
     * Callback for SC.get
     *
     * The callback receives a track object resolved from the track URL.
     */
    function getTrack(track) {
      console.log(track);
      SC.stream('/tracks/' + track.id, { whileplaying: whileplaying }, streamSound);
    }

    /**
     * Callback for the whileplaying method.
     */
    function whileplaying() {
      // Remove loading ani if present.
      // console.log(this.position , this.duration, this.position / this.duration);
    }

    /**
     * Callback for SC.stream
     *
     * Receives a sound object on which you can call functions like `play()`, `stop()` and `pause()`.
     */
    function streamSound(sound) {
      global.sound = sound;
      console.log(global.sound);
    }
  }
}
