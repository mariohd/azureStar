var Stage01 = extend(Stage, function(game) {

  var self = this,
      enemies = [],
      enemyInterval = null,
      boundaries = game.boundaries(),
      ship = new SpaceShip(boundaries),
      movePatterns = new MovePatterns();

  Stage.call(
    this,
    'images/stages/NGC6960.jpg',
    'Witch Broom Nebula',
    boundaries.width,
    1
  );

  function deployEnemies(enemyFactory) {
    return function(amount, interval) {
      interval = interval || 300;
      var handler = setInterval(function() {
        if(amount == 0) {
          clearInterval(handler);
        }
        enemies.push(enemyFactory());
        amount--;
      }, interval)
    };
  }

  Cache.getImage('enemies/enemyBlack5.png', function(image) {
    deployEnemies(function() {
      return new Enemy(boundaries, {
               image: image,
               speed: 3,
               movePattern: movePatterns.select(),
               position: { x: boundaries.width, y: (boundaries.height + image.height)/ 2 }
             });
    })(50, 500);
  });

  Cache.getImage('enemies/enemyBlack1.png', function(image) {
    self.stairsWave = deployEnemies(function() {
      return new Enemy(boundaries, {
        image: image,
        speed: 4,
        movePattern: movePatterns.stairs
      });
    });
    // window.setTimeout(self.stairsWave, 10000, 20);
    // window.setTimeout(self.stairsWave, 30000, 20);
  });

  Cache.getImage('enemies/enemyBlack4.png', function(image) {
    self.circleWave = deployEnemies(function() {
      return new Enemy(boundaries, {
        image: image,
        speed: 5,
        movePattern: movePatterns.circle
      });
    });
    // window.setTimeout(self.circleWave, 5000, 20);
  });

  Cache.getImage('enemies/enemyBlack5.png', function(image) {
    self.bouncingCircleWave = deployEnemies(function(){
      return new Enemy(boundaries, {
        image: image,
        speed: 5,
        movePattern: movePatterns.bouncingCircle,
        position: {
          x: boundaries.width,
          y: 30
        }
      });
    });
    // window.setTimeout(self.bouncingCircleWave, 2000, 20);
  });

  window.stage = this;

  this.update = function() {
    this.parent.update.call(this);
    enemies =
      enemies.map(function(enemy){
        enemy.update(ship);
        return enemy;
      })
      .filter(function(enemy) {
        return enemy.x > -enemy.width && !enemy.isHit;
      });

    ship.update(enemies);
  };

  this.render = function(foreground, background) {
    this.parent.render.call(this, foreground, background);
    ship.render(foreground);
    enemies.forEach(function(enemy) {
      enemy.render(foreground);
    });
  };

  this.readInput = function(input) {
    if(input.pressed('left_arrow', 'a')) {
      ship.moveLeft();
    }
    if(input.pressed('right_arrow', 'd')) {
      ship.moveRight();
    }
    if(input.pressed('up_arrow', 'w')) {
      ship.moveUp();
    }
    if(input.pressed('down_arrow', 's')) {
      ship.moveDown();
    }
    if(input.pressed('space')){
      ship.shoot();
    }
  };

  this.isComplete = function() {
    return false;
  };

  this.resize = function(newBoundaries) {
    boundaries = newBoundaries;
    ship.boundaries = newBoundaries;
    enemies.forEach(function(enemy){
      enemy.boundaries = newBoundaries;
    });
  };

});
