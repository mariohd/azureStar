var Stage = function(imageURL, name, exibitionArea, speed) {
  var self = this;
  this.iteration = 0;
  this.isReady = false;
  this.currentHeight = 0;
  this.exibitionArea = exibitionArea;
  this.speed = speed;
  this.background = new Image();
  this.currentWidth = 0;
  this.background.addEventListener('load', function () {
    self.isReady = true;
    self.ratio = (16 * this.height)/this.width;
  });
  this.background.src = imageURL;

  this.showName = function (context) {
    var canvas = document.createElement('canvas'),
        context2 = canvas.getContext('2d');
    canvas.width = context.canvas.width;
    canvas.height = context.canvas.height;


    context2.fillStyle = "#D30035";
    context2.font = '40px Guardians';
    context2.textAlign = 'center';
    context2.fillText(name, canvas.width / 2, canvas.height/ 5);
    context.drawImage(canvas, 0, 0);
    canvas = null;
    context2 = null;
  };
};
Stage.prototype.update = function() {
  if (this.currentWidth <= this.background.width/2 ) {
    this.currentWidth += this.speed;
  }
};

Stage.prototype.render = function(foreground, background) {
  if (this.isReady ) {
    background.drawImage(
      this.background,
      this.currentWidth,
      0,
      this.background.width/16,
      this.background.height,
      0,
      0,
      background.canvas.width,
      background.canvas.width * this.ratio
    );

    if (this.currentWidth < 120 ) {
      this.showName(foreground);
    }
  }

};
