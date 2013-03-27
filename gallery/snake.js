new Sonic({

	width: 100,
	height: 100,

	stepsPerFrame: 3,
	trailLength: 0.8,
	pointDistance: 0.007,
	fps: 20,

	backgroundColor: '#272822',
	fillColor: '#FFF',

	path: [
		['arc', 50, 50, 30, 0, 360*2]
	],

	step: function(point, index, frame) {
		
		var lineWidth = 2;
		var lineHeight = 8;
		var pointY = Math.sin(index * 360) * 30 + 50;

		this._.fillRect(
			pointY,
			point.x - lineWidth/2,
			lineWidth,
			lineHeight
		);

	}

});