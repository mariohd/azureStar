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
  this.damage = -1;
  this.damages = [];
  Cache.getImage('ship/ship.png', function(image) {
    Sprite.call(self, {
      img: image,
      position: {
        x: boundaries.width/2,
        y: boundaries.height - 100
      }
    });
    self.ready = true;
    var damage1 = new Image();
    damage1.src = 'images/ship/damage/1.png';
    var damage2 = new Image();
    damage2.src = 'images/ship/damage/2.png';
    var damage3 = new Image();
    damage3.src = 'images/ship/damage/3.png';
    self.damages.push(damage1);
    self.damages.push(damage2);
    self.damages.push(damage3);

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
  this.damage ++;
  if (this.damage >= this.damages.length) {
    this.damage = -1;
    this.lives --;
  }
};

SpaceShip.prototype.render = function(context) {
  if(this.ready) {
    this.parent.render.call(this, context);
    this.bullets.forEach(function(bullet){
      bullet.render(context);
    });
    if (this.damage > -1) {
      context.drawImage(this.damages[this.damage], this.x, this.y, this.width, this.height);
    }
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
