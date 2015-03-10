    <?php echo js('assets/js/build/agentlexie.js') ?>

    <!-- SoundCloud SDK -->
    <script src="//connect.soundcloud.com/sdk.js"></script>
    <script>
      SC.initialize({ client_id: '5656ba27f714e54289054c57fcc2d319' });
      SC.stream('/tracks/7562381', function(sound) {
        //sound.play();
      });

      SC.get('/resolve', {
        url: 'https://soundcloud.com/agentlexie/irule'
      }, function(track) {
        console.log(track);

        SC.stream('/tracks/' + track.id, { whileplaying: function() {
          console.log(this.position , this.duration, this.position / this.duration); }
        }, function(sound) {
          window.sound = sound;
          console.log(window.sound);
        });
      });
    </script>
  </body>
</html>
