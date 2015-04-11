/* global SC */

var flight = require('flightjs');

module.exports = flight.component(player);

function player() {
  var defaultAttrs = {
    clientId: '5656ba27f714e54289054c57fcc2d319'
  };

  this.attributes(defaultAttrs);
  this.after('initialize', afterInit);
  this.talkToSoundCloud = talkToSoundCloud;
  this.sound = undefined;

  //////

  function afterInit() {
    /**
     * Initialize SoundCloud SDK
     */
    SC.initialize({ client_id: this.attr.clientId });

    /**
     * Listen to sound events
     */
    this.on('sound.play', soundPlay);
    this.on('sound.stop', soundStop.bind(this));
    this.on('sound.pause', soundPause.bind(this));

    function soundPlay(e, data) {
      var trackUrl = data.trackUrl;

      this.talkToSoundCloud(trackUrl);
    }

    function soundStop(e, data) {
      if (this.sound) {
        this.sound.stop();
      }
    }

    function soundPause(e, data) {
      if (this.sound) {
        this.sound.pause();
      }
    }
  }

  /**
   * Use the SoundCloud SDK to get track data and play sounds
   */
  function talkToSoundCloud(url) {
    /**
     * Get track object from track URL
     */
    SC.get('/resolve', { url: url }, getTrack.bind(this));

    /**
     * Callback for SC.get
     *
     * The callback receives a track object resolved from the track URL.
     */
    function getTrack(track) {
      SC.stream('/tracks/' + track.id, { whileplaying: whileplaying }, streamSound.bind(this));
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
      this.sound = sound;
    }
  }
}
