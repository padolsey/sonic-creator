function SonicGIFConverter() {
	this.img = document.createElement('img');
}

SonicGIFConverter.prototype = {
	setup: function(sonic) {
		this.encoder = new GIFEncoder();
		this.encoder.setRepeat(0); // loop forever
		// http://www.stykz.net/support/help/lessons/About_the_Animated_GIF_Format.php
		var delay = Math.max(60, 1000/sonic.fps);
		this.encoder.setDelay(delay);//delay before next frame unfortunately there's a limit
		this.encoder.start();
	},
	step: function(sonic) {
		this.encoder.addFrame(sonic._);
	},
	teardown: function(sonic) {
		this.encoder.finish();
		this.img.src = 'data:image/gif;base64,'+encode64(this.encoder.stream().getData());
		this.encoder = null;
	}
};