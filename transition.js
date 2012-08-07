var Transition = function(element, property, transform, duration, delay) {
  var self = this;
  var elem = $(element);
  var start;
  var remainingDelay = delay != undefined ? delay : 0;
  var remainingDuration = duration;
  var paused = true;


  // Borrowed from jquery.transit.js
  var div = document.createElement('div');
  console.log(div.style);
  function getVendorPropertyName(prop) {
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return vendorProp; }
    }
  }
  function getVendorCssPropertyName(prop) {
    var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
    var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

    if (prop in div.style) { return prop; }

    for (var i=0; i<prefixes.length; ++i) {
      var vendorProp = prefixes[i] + prop_;
      if (vendorProp in div.style) { return "-" + prefixes[i].toLowerCase() + "-" + prop; }
    }
  }


  var vendorProperty = getVendorPropertyName(property);
  var vendorCssProperty = getVendorCssPropertyName(property);
  var transitionProperty = getVendorPropertyName('transitionProperty');
  var transitionDelay = getVendorPropertyName('transitionDelay');
  var transitionDuration = getVendorPropertyName('transitionDuration');

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
    elem.css(vendorProperty, transform);
    elem.css(transitionProperty, vendorCssProperty);
    if (remainingDelay > 0) 
      elem.css(transitionDelay, remainingDelay + 'ms');
    if (remainingDuration > 0)
      elem.css(transitionDuration, remainingDuration + 'ms'); 
  };
  self.unsetTransform = function() {
    var transform = window.getComputedStyle(elem[0])[vendorProperty];
    elem.css(vendorProperty, transform);
    elem.css(transitionDelay, '0ms');
    elem.css(transitionDuration, '0ms');
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

