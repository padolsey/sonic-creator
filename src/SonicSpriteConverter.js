function SonicSpriteConverter() {
	this.img = document.createElement('img');
	this.canvas = document.createElement('canvas');
	this._ = this.canvas.getContext('2d');
}

SonicSpriteConverter.prototype = {
	setup: function(sonic) {
		this.f = 0;
		this.canvas.width = sonic.canvas.width * sonic.points.length
		this.canvas.height = sonic.canvas.height;
	},
	step: function(sonic) {
		this._.drawImage(sonic.canvas, this.f++ * sonic.fullWidth, 0);
	},
	teardown: function(sonic) {
		// Buffer, grab img with correct width
		var c = document.createElement('canvas');
		c.width = this.f * sonic.fullWidth;
		c.height = sonic.fullHeight;
		c.getContext('2d').drawImage(this.canvas, 0, 0);
		this.img.src = c.toDataURL();
	}
};