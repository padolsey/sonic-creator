new Sonic({

	width: 100,
	height: 100,

	stepsPerFrame: 2,
	trailLength: 0.6,
	pointDistance: 0.03,
	fps: 20,

	backgroundColor: '#555',
	fillColor: 'yellow',

	path: [
		['line', 48, 48, 52, 52],
		['line', 52, 52, 48, 48]
	],
	
	setup: function() {
		this._.font = '100px monospace';
	},

	step: function(point, index, frame) { 
		this._.fillText(
			0 | frame * 10,
			point.x - 30,
			point.y + 25
		);
	}

});