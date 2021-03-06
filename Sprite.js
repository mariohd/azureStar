var Sprite = function(spec) {
  var self = this;

  this.x = spec.position.x;
  this.y = spec.position.y;
  this.width = spec.width || spec.img.width;
  this.height = spec.height || spec.img.height;
  this.img = spec.img;
  this.scale = spec.scale || 1;
};

Sprite.prototype.render = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Sprite.prototype.collide = function(sprite) {
  var self = this;
  function isInsideMe(point) {
    return (point.x >= self.x && point.x <= self.x + self.width) &&
           (point.y >= self.y && point.y <= self.y + self.height);
  }

  return isInsideMe({ x: sprite.x, y: sprite.y }) ||
         isInsideMe({ x: sprite.x, y: sprite.y + sprite.height }) ||
         isInsideMe({ x: sprite.x + sprite.width, y: sprite.y + sprite.height }) ||
         isInsideMe({ x: sprite.x + sprite.width, y: sprite.y });
};

Sprite.prototype.drawCollisionBox = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.stroke();
};
