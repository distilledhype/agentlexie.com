var $ = require('jquery');
// Modules
var pushable = ('history' in window && 'pushState' in window.history);

module.exports = {
  kickoff: function() {

    if (pushable) {
      $('nav')
        .find('a')
        .on('click', this.handleNavClick);
    }
  },
  handleNavClick: function(e) {
    var $this = $(this);
    var url = $this.attr('href');

    var jqxhr = $.ajax(url, {
      dataType: 'html',
      headers: {
        'X-PJAX': true
      }
    });

    jqxhr.done(function(html) {
      $('.pages').append($(html).css('left')) ;
      $('.page:last').animate({ left: $('.page:last').width() }, function() {
        // $(this).remove();
      });
    });

    e.preventDefault();
  }
};

module.exports.kickoff();
