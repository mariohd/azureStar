var Cache = function() {
  var images = {};

  function fetchImage(url, callback) {
    var img = new Image(),
        handler = function() {
          if(callback) {
            callback(img);
          }
          img.removeEventListener('load', handler);
        };

    img.addEventListener('load', handler);
    img.src = 'images/'+url;
    return img;
  }

  return {
    getImage: function(url, callback) {
      if(!images[url]) {
        images[url] = fetchImage(url, callback);
      }
      else {
        if(callback) {
          callback(images[url]);
        }
      }
    }
  };
}();
