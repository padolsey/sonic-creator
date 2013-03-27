
SonicSpriteConverter.CSS3_TEMPLATE = '@-webkit-keyframes loaderSprite {\n\
    from { background-position: 0px; }\n\
    to { background-position: -%totalWidthpx; }\n\
}\n\
\n\
@-moz-keyframes loaderSprite {\n\
    from { background-position: 0px; }\n\
    to { background-position: -%totalWidthpx; }\n\
}\n\
\n\
@keyframes loaderSprite {\n\
    from { background-position: 0px; }\n\
    to { background-position: -%totalWidthpx; }\n\
}\n\
\n\
.loader {\n\
    width: %widthpx;\n\
    height: %heightpx;\n\
    background-image: url("path/to/the/sprite.png");\n\
    -webkit-animation: loaderSprite 1s steps(%frames, end) infinite;\n\
    -moz-animation: loaderSprite 1s steps(%frames, end) infinite;\n\
    animation: loaderSprite 1s steps(%frames, end) infinite;\n\
}\n';

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
		this.css3 = SonicSpriteConverter.CSS3_TEMPLATE
			.replace(/%height/g, sonic.canvas.height)
			.replace(/%width/g, sonic.canvas.width)
			.replace(/%totalWidth/g, this.canvas.width)
			.replace(/%frames/g, this.f);
	}
};