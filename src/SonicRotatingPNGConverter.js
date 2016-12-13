
SonicRotatingPNGConverter.CSS3_TEMPLATE = '@-webkit-keyframes rotateLoader {\n\
    from { transform: rotate(0deg); }\n\
    to { transform: rotate(360deg); }\n\
}\n\
\n\
@-moz-keyframes rotateLoader {\n\
    from { transform: rotate(0deg); }\n\
    to { transform: rotate(360deg); }\n\
}\n\
\n\
@keyframes rotateLoader {\n\
    from { transform: rotate(0deg); }\n\
    to { transform: rotate(360deg); }\n\
}\n\
\n\
.loader {\n\
    width: %widthpx;\n\
    height: %heightpx;\n\
    background-image: url("PNG_URI_GOES_HERE");\n\
    -webkit-animation: rotateLoader %duration linear normal infinite;\n\
    -moz-animation: rotateLoader %duration linear normal infinite;\n\
    animation: rotateLoader %duration linear normal infinite;\n\
}\n';

function SonicRotatingPNGConverter() {
	this.img = document.createElement('img');
	this.canvas = document.createElement('canvas');
	this._ = this.canvas.getContext('2d');
}

SonicRotatingPNGConverter.prototype = {
	setup: function(sonic) {
		this.f = 0;
		var width = sonic.canvas.width; // only one frame
		this.canvas.width = width;
		this.canvas.height = sonic.canvas.height;
	},
	step: function(sonic) {
		this._.drawImage(sonic.canvas, this.f++ * sonic.fullWidth, 0);
	},
	teardown: function(sonic) {
		this.img.src = this.canvas.toDataURL();
		this.css3 = SonicRotatingPNGConverter.CSS3_TEMPLATE
			.replace(/%height/g, sonic.canvas.height)
			.replace(/%width/g, sonic.canvas.width)
			.replace(/%duration/g, this.f / sonic.fps + 's');
	}
};