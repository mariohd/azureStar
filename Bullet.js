var Bullet = extend(Sprite, function(point) {
  var didHit = false,
      self = this;

  Cache.getImage('ship/bullet.png', function(image) {
    Sprite.call(self, {
      img: image,
      position: point
    });
  });

  this.damage = 5;

  this.hit = function(hit) {
    if(typeof hit !== 'undefined') {
      didHit = hit;
    }
    return didHit;
  };
});

Bullet.prototype.move = function(step) {
  this.x -= step;
}
