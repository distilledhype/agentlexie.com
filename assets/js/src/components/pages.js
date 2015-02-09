var flight = require('flightjs');

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
      var nextPage = this.select('nextPageClass');
      var route = data.route;
      var url = 'http://' + window.location.host + '/' + route;
      var currentRoute = window.location.pathname.replace(/^\//g, '');

      if (nextPage.length === 0) {
        $.ajax(url, { dataType: 'html' })
          .done(this.insertXhrHtml.bind(this))
          .fail(function() { console.error('XHR for page content failed.'); });
      } else if (route !== currentRoute) {
        nextPage
          .addClass('next')
          .css('left', '');

        this.animateContent();
      }
    }
  }

  /**
   * Append the page content snippet retrieved via XHR to the component
   * and animate it.
   */
  function insertXhrHtml(html) {
    // Append the result to this node.
    $(html).appendTo(this.$node);
    this.animateContent();
  }

  /**
   * Animate the current content fragment out and the next content fragmeent in.
   */
  function animateContent() {
    var windowWidth = $(window).width();
    var $current = this.$node.find('.current');
    var $next = this.$node.find('.next');

    var mySequence = [
      {
        e: $current,
        p: { translateZ: 0, left: [-windowWidth, 0] },
        o: { duration: 500 }
      },
      {
        e: $next,
        p: { translateZ: 0, left: [0, windowWidth] },
        o: { duration: 500, complete: this.resetClasses.bind(this), sequenceQueue: false }
      }
    ];

    $.Velocity.RunSequence(mySequence);

    // this.$node
    //   .find('.current')
    //     .velocity({ translateZ: 0, left: [-windowWidth, 0] }, { duration: 500 })
    //     .end()
    //   .find('.next')
    //     .velocity({ translateZ: 0, left: [0, windowWidth] }, { duration: 500, complete: this.resetClasses.bind(this) });
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
