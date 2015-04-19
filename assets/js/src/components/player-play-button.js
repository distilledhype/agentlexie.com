var flight = require('flightjs');

module.exports = flight.component(playerPlayButton);

function playerPlayButton() {
  var attrs = {
    playBtn: '.player-play',
    pauseBtn: '.player-pause'
  };

  this.attributes(attrs);
  this.after('initialize', afterInit);
  this.pressPlay = pressPlay;
  this.pressPause = pressPause;
  this.toggleButton = toggleButton;
  this.trackUrl = undefined;

  function afterInit() {
    var playBtn = this.select('playBtn');
    var pauseBtn = this.select('pauseBtn');

    this.on(playBtn, 'click', this.pressPlay);
    this.on(pauseBtn, 'click', this.pressPause);
    this.on('sound.play', this.toggleButton);
    this.on('sound.pause', this.toggleButton);
  }

  function pressPlay() {
    this.trackUrl = this.$node.data('track') || undefined;
    this.trigger('sound.play', { trackUrl: this.trackUrl });
  }

  function pressPause() {
    this.trigger('sound.pause');
  }

  function toggleButton(e) {
    if (e.namespace === 'play') {
      this.select('playBtn').addClass('hide');
      this.select('pauseBtn').removeClass('hide');
    } else if (e.namespace === 'pause') {
      this.select('playBtn').removeClass('hide');
      this.select('pauseBtn').addClass('hide');
    }
  }
}
