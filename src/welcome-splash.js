/* welcome-splash.js
  Ethan Randall 12/30/2016 */
var CSSKeyframeRule;
function supportsKeyframes() {
  return CSSKeyframeRule != undefined;
};

function WelcomeSplash(options) {  
  this.setOptions(options);
  if (supportsKeyframes()) {
    this.init();
    this.run();
  }
};

WelcomeSplash.prototype.setOptions = function(options) {
  options = options || {};
  this.imgSrc = options.imgSrc;
  this.splashFill = options.splashFill;
  this.preventCache = options.preventCache || true;
  this.fadeDelay = options.fadeDelay || 3;
  this.fadeDuration = options.fadeDuration || 2;
  this.fadeFunction = options.fadeFunction || 'linear';
  this.clickBlockDuration = options.clickBlockDuration || 4000;
  this.destroyTimeout = options.destroyTimeout || 7000;
};


WelcomeSplash.prototype.init = function() {
  var splashBg = document.createElement('div');
  splashBg.id = 'welcome-splash';
  splashBg.style.position = 'fixed';
  splashBg.style.left = splashBg.style.top = '0px';
  splashBg.style.width = splashBg.style.height = '100%';
  splashBg.style.background = this.splashFill;
  splashBg.style.textAlign = 'center';
  splashBg.style.display = 'none';
  
  var tempStyle = document.createElement('style');
  tempStyle.type = 'text/css';
  tempStyle.textContent = '#welcome-splash{opacity:1.0;transition:opacity ' + this.fadeDuration + 's ' + this.fadeFunction + ' ' + this.fadeDelay + 's;}#welcome-splash.fade{opacity:0.0;};';
  
  var liveTempStyle = document.head.appendChild(tempStyle);
  
  var splashImg = document.createElement('img');
  splashImg.style.margin = 'auto auto';
  splashImg.style.maxHeight = '100%';
  
  this.liveSplashImg = splashBg.appendChild(splashImg);
  this.liveSplashBg = document.body.appendChild(splashBg);
};

WelcomeSplash.prototype.queueBeginFade = function() {
  var myLiveSplashBg = this.liveSplashBg;
  window.setTimeout(function() {myLiveSplashBg.className = 'fade';}, 100);
};

WelcomeSplash.prototype.queueEnableClickThrough = function() {
  var myLiveSplashBg = this.liveSplashBg;
  window.setTimeout(function() {myLiveSplashBg.style.pointerEvents = 'none';}, this.clickBlockDuration);
};


WelcomeSplash.prototype.queueDestroy = function() {
  var myLiveSplashBg = this.liveSplashBg;
  var myLiveTempStyle = this.liveTempStyle;
  window.setTimeout(function(){
    document.body.removeChild(myLiveSplashBg);
    document.head.removeChild(myLiveTempStyle);
    }, this.destroyTimeout);
};

WelcomeSplash.prototype.run = function() {
  this.liveSplashBg.style.display = 'block';
  
  if (this.preventCache) {
    var timeInMs = Date.now();
    this.liveSplashImg.src = this.imgSrc + '?nocache=' + timeInMs;
  }
  else {
    this.liveSplashImg.src = this.imgSrc;
  }
  this.queueBeginFade();
  this.queueEnableClickThrough();
  this.queueDestroy();
};


