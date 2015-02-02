// Global variables.
global.jQuery = global.$ = require('jquery');
global.Velocity = require('velocity-animate');
global.URI = require('URIjs');
// UI modules.
var pushable = require('./modules/ui/pushable');
var resetClasses = require('./modules/ui/cb-resetclasses');

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

window.onpopstate = function(event) {
  handleNavClick(event);
};

function handleNavClick(e) {
  console.log(event);
  var url = $(this).attr('href');
  // Remove leading slash of the URI.
  var route = URI(url).path().replace(/^\//g, '');
  var currentRoute = window.location.pathname.replace(/^\//g, '');
  var $next = $('[data-route="' + route + '"]');
  var animateContent = function() {
    // Animate .current and .next from right to left.
    $('.pages')
      .find('.current')
        .velocity({ left: -($('.next').position().left) })
        .end()
      .find('.next')
        .velocity({ left: 0 }, { complete: resetClasses });
  };

  history.pushState({ route: route }, '', route);

  // On click get the required pjax snippet if the snippet is not in DOM yet.
  if ($next.length === 0) {
    var jqxhr;
    var ajaxOptions = { dataType: 'html' };

    jqxhr = $.ajax(url, ajaxOptions);
    jqxhr.done(function insertHtml(html) {
      // Append the result to .pages.
      $(html).appendTo('.pages');
      animateContent();
    });
  } else if (route !== currentRoute) {
    $next
      .addClass('next')
      .css('left', '');
    animateContent();
  }

  // Prevent default behavior.
  e.preventDefault();
}
