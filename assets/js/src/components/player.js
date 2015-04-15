/* global SC */

var flight = require('flightjs');
var Q = require('q');

module.exports = flight.component(player);

function player() {
  var defaultAttrs = {
    clientId: null
  };

  this.attributes(defaultAttrs);
  this.after('initialize', afterInit);
  // SoundCloud functions.
  this.getTrack = getTrack;
  this.getSound = getSound;
  this.whilePlaying = whilePlaying;
  // Interact with sounds.
  this.sound = undefined;
  this.soundPlay = soundPlay;
  this.soundStop = soundStop;
  this.soundPause = soundPause;
  this.waveformUrl = undefined;

  //////

  function afterInit() {
    /**
     * Initialize SoundCloud SDK
     */
    SC.initialize({ client_id: this.attr.clientId });

    /**
     * Listen to sound events
     */
    this.on('sound.play', this.soundPlay);
    this.on('sound.stop', this.soundStop);
    this.on('sound.pause', this.soundPause);
    this.on('sound.waveform', this.showWaveform);

    // Just for testing purposes;
    this.trigger('sound.play', { trackUrl: 'https://soundcloud.com/majorlazer/major-lazer-roll-the-bass' });
  }

  /**
   * Play a SoundCloud sound.
   */
  function soundPlay(e, data) {
    this.getTrack(data.trackUrl)
    .then(this.getSound.bind(this))
    .then(function(sound) {
      this.sound = global.sound = sound;
      this.sound.play();
    }.bind(this))
    .done();
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
  function getTrack(url) {
    var deferred = Q.defer();

    /**
     * Get track object from track URL
     */
    SC.get('/resolve', { url: url }, function getTrackCb(track, err) {
      if (err) {
        deferred.reject(new Error(err.message));
      } else {
        deferred.resolve(track);
      }
    });

    return deferred.promise;
  }

  /**
   * Callback for SC.get
   *
   * The callback receives a track object resolved from the track URL.
   */
  function getSound(track) {
    var deferred = Q.defer();

    this.trigger('sound.waveform', { waveformUrl: track.waveform_url });

    SC.stream('/tracks/' + track.id, { whilePlaying: this.whilePlaying.bind(this) }, function getSoundCb(sound, err) {
      if (err) {
        deferred.reject(new Error(err.message));
      } else {
        deferred.resolve(sound);
      }
    });

    return deferred.promise;
  }

  /**
   * Callback for the whileplaying method.
   */
  function whilePlaying() {
    // Remove loading ani if present.
    console.log(this.position , this.duration, this.position / this.duration);
  }

  /**
   * Show add the sound waveform to the UI.
   */
  function showWaveform(waveformUrl) {
    this.waveformUrl = waveformUrl;
    
    console.info(waveformUrl);
  }
}
