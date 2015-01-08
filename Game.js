var azureStar = ({
  boundaries: function() {
    return {
      width: (document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 930) - 30,
      height: (document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 530) - 30
    };
  },
  input: new Input(),
  paused: false,
  init: function () {
    function createGameCanvas(game, inputHandler) {
      var foreground = document.getElementById('foreground'),
          background = document.getElementById('background');

      foreground.addEventListener('blur', foreground.focus);
      foreground.addEventListener('keydown', inputHandler.keydown);
      foreground.addEventListener('keyup', inputHandler.keyup);
      foreground.focus();

      window.addEventListener('after-resize', function() {
        var boundaries = game.boundaries();
        foreground.width = boundaries.width;
        foreground.height = boundaries.height;
        background.width = boundaries.width;
        background.height = boundaries.height;
        game.state.resize(boundaries);
      });
      return {
        foreground: foreground,
        background: background
      };
    }

    var self = this,
        canvas = createGameCanvas(this, this.input);

    this.foreground = canvas.foreground.getContext('2d');
    this.background = canvas.background.getContext('2d');
    this.state = new LoadingState(this);
    this.loop();

    window.addEventListener('resize', function(e) {
      setTimeout(function() {
        window.dispatchEvent(new Event('after-resize'))
      }, 500);
    });

    window.dispatchEvent(new Event('after-resize'));
    return this;
  },

  loop: function() {
    var self = this;

    (function gameLoop() {
      if(self.state.isComplete()) {
        self.state = self.state.nextStage();
      }
      if(self.input.pressed('escape')) {
        self.paused = !self.paused;
      }
      if(!self.paused) {
        self.state.readInput(self.input);
        self.state.update();

        self.foreground.clearRect(0 ,0, self.foreground.canvas.width, self.foreground.canvas.height);
        self.state.render(self.foreground, self.background);
      }
      requestAnimationFrame(gameLoop);
    })();
  }
}).init();
