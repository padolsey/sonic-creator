function SonicSpriteConverter() {
	this.img = document.createElement('img');
	this.canvas = document.createElement('canvas');
	this._ = this.canvas.getContext('2d');
}

SonicSpriteConverter.prototype = {
	setup: function(sonic) {
		this.f = 0;
		var width = sonic.canvas.width * Math.ceil(sonic.points.length / sonic.stepsPerFrame);
		this.canvas.width = width;
		this.canvas.height = sonic.canvas.height;
	},
	step: function(sonic) {
		this._.drawImage(sonic.canvas, this.f++ * sonic.fullWidth, 0);
	},
	teardown: function(sonic) {
		this.img.src = this.canvas.toDataURL();
	}
};