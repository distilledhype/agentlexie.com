module.exports = function() {
  // Remove .current class & substitute .next class with .current.
  $('.pages')
    .find('.current')
      .removeClass('current')
      .end()
    .find('.next')
      .removeClass('next')
      .addClass('current');
};
