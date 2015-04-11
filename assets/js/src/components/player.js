/* global SC */

var flight = require('flightjs');

module.exports = flight.component(player);

function player() {
  var defaultAttrs = {
    clientId: null
  };

  this.attributes(defaultAttrs);
  this.after('initialize', afterInit);
  this.talkToSoundCloud = talkToSoundCloud;
  this.sound = undefined;
  this.soundPlay = soundPlay;
  this.soundStop = soundStop;
  this.soundPause = soundPause;

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

    // Just for testing purposes;
    this.soundPlay({}, { trackUrl: 'https://soundcloud.com/majorlazer/major-lazer-roll-the-bass' });
  }

  /**
   * Play a SoundCloud sound.
   */
  function soundPlay(e, data) {
    var trackUrl = data.trackUrl;

    this.talkToSoundCloud(trackUrl);
  }

  /**
   * Stop a SoundCloud sound.
   */
  function soundStop(e, data) {
    if (this.sound) {
      this.sound.stop();
    }
  }

  /**
   * Pause a SoundCloud sound.
   */
  function soundPause(e, data) {
    if (this.sound) {
      this.sound.pause();
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
      this.sound = global.sound = sound;
    }
  }
}
