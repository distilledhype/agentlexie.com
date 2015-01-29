var $ = require('jquery');
var pushable = require('./modules/pushable');

module.exports = {
  kickoff: kickoff,
  handleNavClick: handleNavClick
};

module.exports.kickoff();

//////

function kickoff() {
  if (pushable) {
    $('nav')
      .find('a')
      .on('click', this.handleNavClick);
  }
}

function handleNavClick(e) {
  // Prevent default behavior.
  // e.preventDefault();

  // // The functionality.
  // var $this = $(this);
  // var url = $this.attr('href');
  //
  // var jqxhr = $.ajax(url, {
  //   dataType: 'html',
  //   headers: {
  //     'X-PJAX': true
  //   }
  // });
  //
  // jqxhr.done(function(html) {
  //   console.log(html);
  //   $('.pages').append($(html).css('left'));
  //   $('.page:last').animate({ left: $('.page:first').width() }, function() {
  //     // $(this).remove();
  //   });
  // });
}
