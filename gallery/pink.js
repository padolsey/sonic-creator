new Sonic({
	
	width: 100,
	height: 100,

	stepsPerFrame: 1,
	trailLength: 1,
	pointDistance: 0.05,

	backgroundColor: '#222',
	strokeColor: '#FF2E82',

	fps: 20,

	setup: function() {
		this._.lineWidth = 4;
	},
	step: function(point, index) {

		var cx = this.padding + 50,
			cy = this.padding + 50,
			_ = this._,
			angle = (Math.PI/180) * (point.progress * 360);

		_.beginPath();
		_.moveTo(point.x, point.y);
		_.lineTo(
			(Math.cos(angle) * 25) + cx,
			(Math.sin(angle) * 25) + cy
		);
		_.closePath();
		_.stroke();

	},
	path: [
		['arc', 50, 50, 40, 0, 360]
	]

});