// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

/**
 * flight-soundcloud
 *
 * This flight component makes use of the SoundCloud SDK
 * which is provided via the global variable SC.
 * The SDK script needs to be included and can be found
 * here: http://connect.soundcloud.com/sdk.js
 */
var flight = require('flightjs');
var Q = require('q');

module.exports = flight.component(player);

function player() {
  var defaultAttrs = {
    clientId: null,
    defaultTrackUrl: 'https://soundcloud.com/agentlexie/irule'
  };

  this.attributes(defaultAttrs);
  this.after('initialize', afterInit);

  // Functions using the SoundCloud API.
  this.getTrack = getTrack;
  this.getSound = getSound;
  this.whilePlaying = whilePlaying;

  // Functions interacting with the returned sound object.
  this.soundPlay = soundPlay;
  this.soundStop = soundStop;
  this.soundPause = soundPause;
  this.sound = undefined;

  function afterInit() {
    // Initialize SoundCloud SDK
    SC.initialize({ client_id: this.attr.clientId });

    // Listen to sound events
    this.on('sound.play', this.soundPlay);
    this.on('sound.stop', this.soundStop);
    this.on('sound.pause', this.soundPause);
  }

  /**
   * Play a SoundCloud sound.
   */
  function soundPlay(e, data) {
    var currentlyPlaying = this.$node.data('currently-playing');

    if (this.sound && data.trackUrl === currentlyPlaying) {
      this.sound.play();
    } else {
      var trackUrl = data.trackUrl || this.attr.defaultTrackUrl;

      this.$node.data('currently-playing', trackUrl);

      this.getTrack(trackUrl)
      .then(this.getSound.bind(this))
      .then(function(sound) {
        if (this.sound) {
          this.sound.stop();
        }

        this.sound = global.sound = sound;
        this.sound.play();
      }.bind(this))
      .done();
    }
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

    // Get track object from track URL
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
    var wP = { whilePlaying: this.whilePlaying.bind(this) };

    // Make the data of the current track available.
    // In order to get the track data a flight component just
    // has to subscribe to the 'sound.data' event.
    this.trigger('sound.data', { soundData: track });

    SC.stream('/tracks/' + track.id, wP, function getSoundCb(sound, err) {
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
    console.log(this.position, this.duration, this.position / this.duration);
  }
}
