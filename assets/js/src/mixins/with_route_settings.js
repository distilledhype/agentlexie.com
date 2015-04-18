var settings = {
  pushState: window.history && window.history.pushState
};

module.exports = function() {
  return settings;
};
