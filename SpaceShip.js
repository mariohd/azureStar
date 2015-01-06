var SpaceShip = extend(Sprite, function(boundaries) {
  var self = this;
  this.ready = false;
  this.bullets = [];
  this.boundaries = boundaries;
  this.speed = 5;

  this.limitShooting();
  this.shotControl = true;
  this.lives = 3;
  this.score = 0;

  Cache.getImage('ship/ship.png', function(image) {
    Sprite.call(self, {
      img: image,
      position: {
        x: boundaries.width/2,
        y: boundaries.height - 100
      }
    });
    self.ready = true;
  });
});

SpaceShip.prototype.limitShooting = function() {
  var self = this;
  setInterval(function () {
    self.shootControl = true;
  }, 200);
};

SpaceShip.prototype.update = function(enemies) {
  this.bullets =
    this.bullets.map(function(bullet) {
      bullet.move(-10);
      return bullet;
    })
    .filter(function(bullet) {
      return bullet.y >  0 && !bullet.hit();
    });

  this.bullets.forEach(function(bullet) {
    enemies.forEach(function(enemy){
      if(enemy.collide(bullet)) {
        bullet.hit(true);
        enemy.hit(true);
      }
    });
  });
};

SpaceShip.prototype.hit = function() {
  // console.log('hit!');
};

SpaceShip.prototype.render = function(context) {
  if(this.ready) {
    this.parent.render.call(this, context);
    this.bullets.forEach(function(bullet){
      bullet.render(context);
    });
  }
};

SpaceShip.prototype.moveLeft = function() {
  if (this.x - this.speed > 0) {
    this.x -= this.speed;
  }
};

SpaceShip.prototype.moveUp = function() {
  if (this.y - this.speed > 0) {
    this.y -= this.speed;
  }
};

SpaceShip.prototype.moveRight = function() {
  if (this.boundaries.width >= (this.x + this.width) + this.speed) {
    this.x += this.speed;
  }
};

SpaceShip.prototype.moveDown = function() {
  if (this.boundaries.height > (this.y + this.height) + this.speed) {
    this.y += this.speed;
  }
};

SpaceShip.prototype.shoot = function() {
  if(this.shootControl) {
    this.bullets.push(new Bullet({
      x: this.x + (this.width) - 15,
      y: this.y + (this.height / 2) - 5
    }));
    this.shootControl = false;
  }
};
