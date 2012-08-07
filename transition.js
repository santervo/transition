var Transition = function(element, transform, duration, delay) {
  var self = this;
  var elem = $(element);
  var start;
  var remainingDelay = delay != undefined ? delay : 0;
  var remainingDuration = duration;
  var paused = true;

  self.pause = function() {
    self.countRemaining();
    self.unsetTransform();
    paused = true;
    console.log("Remaining delay: " +remainingDelay);
    console.log("Remaining duration: "+remainingDuration);
  };
  self.resume = function() {
    if (remainingDuration > 0) {
      start = new Date;
      self.setTransform();
      paused = false;
    }
  };
  self.toggle = function() {
    if (paused) {
      self.resume();
    }
    else {
      self.pause();
    }
  };
  self.setTransform = function() {
    elem.css('-webkit-transform', transform);
    elem.css('-webkit-transition-property','-webkit-transform');
    if (remainingDelay > 0) 
      elem.css('-webkit-transition-delay', remainingDelay + 'ms');
    if (remainingDuration > 0)
      elem.css('-webkit-transition-duration', remainingDuration + 'ms'); 
  };
  self.unsetTransform = function() {
    var transform = window.getComputedStyle(elem[0]).webkitTransform;
    elem.css('-webkit-transform', transform);
    elem.css('-webkit-transition-delay', '0ms');
    elem.css('-webkit-transition-duration', '0ms');
  };
  self.countRemaining = function() {
    var duration = new Date - start;
    if (remainingDelay > 0) {
      remainingDelay -= duration;
      duration = 0;
    }
    if (remainingDelay < 0) {
      duration = -remainingDelay;
      remainingDelay = 0;
    }
    if (duration > 0) {
      remainingDuration -= duration;
    }
  };

  self.resume();
};

