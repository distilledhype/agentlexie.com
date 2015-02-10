var flight = require('flightjs');
var _ = require('lodash');

module.exports = flight.component(pages);

/**
 * Default Attributes
 *
 * The default attributes are the two class names used for
 * the current page shown and the next page comming in.
 */
function pages() {
  var defaultAttrs = {
    nextPageClass: '.next',
    currentPageClass: '.current'
  };

  this.attributes(defaultAttrs);
  this.after('initialize', afterInit);
  this.animateContent = animateContent;
  this.resetClasses = resetClasses;
  this.insertXhrHtml = insertXhrHtml;

  //////

  function afterInit() {
    /**
     * Load page fragment when navigation item is clicked.
     */
    this.on(document, 'route.change', getPage);

    function getPage(e, data) {
      var route = data.route;
      var nextPage = this.$node.find('[data-route="' + route + '"]');
      var url = 'http://' + window.location.host + '/' + route;
      var currentRoute = window.location.pathname.replace(/^\//g, '');

      if (nextPage.length > 0) {
        nextPage.addClass('next');
        this.animateContent();
      } else if (nextPage.length === 0) {
        $.ajax(url, { dataType: 'html' })
          .then(this.insertXhrHtml.bind(this))
          .fail(function() { console.error('XHR for page content failed.'); });
      }
    }
  }

  /**
   * Append the page content snippet retrieved via XHR to the component
   * and animate it.
   */
  function insertXhrHtml(html) {
    // Append the result to this node.
    this.$node.append(html);
    _.delay(this.animateContent.bind(this), 90);
  }

  /**
   * Animate the current content fragment out and the next content fragmeent in.
   */
  function animateContent() {
    var windowWidth = $(window).width();
    var $current = this.$node.find('.current');
    var $next = this.$node.find('.next');

    $current.velocity({
      p: { translateZ: 0, left: [-windowWidth, 0] },
      o: { duration: 500 }
    });

    $next.velocity({
      p: { translateZ: 0, left: [0, windowWidth] },
      o: { duration: 500, complete: this.resetClasses.bind(this), queue: false }
    });
  }

  /**
   * After the animation: remove the CSS class ".current" from last content fragment and
   * exchange the CSS class ".next" with ".current" on the new content fragment.
   */
  function resetClasses() {
    this.$node
      .find('.current')
        .removeClass('current')
        .end()
      .find('.next')
        .removeClass('next')
        .addClass('current');
  }
}
