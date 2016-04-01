var App = {
  init: function() {
    var that = this;

    this.socket = io();

    var htmlEl = document.getElementById('online');
    var clicksEl = document.getElementById('clicks');

    this.socket.on('online', function(data) {
      //{data: 3}
      htmlEl.innerHTML = data.data;
    });

    this.socket.on('clicks', function(data) {
      clicksEl.innerHTML = data.clicks;
    });

    var clicker = document.getElementById('clicker');

    clicker.addEventListener('click', function(){
      that.socket.emit('click');
    });
  }
};

App.init();
