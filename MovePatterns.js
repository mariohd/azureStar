var MovePatterns = function() {
  this.straightAhead = function(boundaries) {
    this.x -= this.speed;
  };

  this.upAndDown = function(boundaries) {
    this.x -= this.speed;

    if(typeof this.goUp == 'undefined') {
      this.goUp = Math.random().toFixed() == 0;
    }

    if (this.goUp) {
      this.y -= this.speed;
      this.goUp = (this.y >= 0);
    }
    else {
      this.y += this.speed;
      this.goUp = (this.y + this.height >= boundaries.height);
    }
  };

  this.stairs = function(boundaries) {
    if(!this.angle) {
      this.angle = 0;
    }
    this.y += Math.floor(this.speed * (1 + Math.sin(this.angle)));
    this.x += Math.floor(this.speed * (1 + Math.cos(this.angle)));
    this.angle += Math.PI / 32;
  };

  this.circle = function(boundaries) {
    if(!this.angle) {
      this.angle = 0;
    }
    this.y += Math.floor(this.speed * (Math.sin(this.angle)));
    this.x += Math.floor(this.speed * (Math.cos(this.angle)));
    this.angle += (2 * Math.PI) / 360;
  };

  this.bouncingCircle = function(boundaries) {
    if(!this.angle) {
      this.angle = 0;
    }
    if(!this.radius || this.radius === 1) {
      this.radius = 256;
    }

    this.y += Math.floor(this.speed * (Math.sin(this.angle)));
    this.x += Math.floor(this.speed * (Math.cos(this.angle)));
    this.angle += (2 * Math.PI) / this.radius;
  };

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  this.select = function() {
    var patterns = [this.stairs, this.upAndDown, this.straightAhead];
    return patterns[randomInt(0, patterns.length)];
  }

};
