(function() {

	var loadedViaGallery = null;

	var gallery = window.gallery = {
		load: function(name) {

			if (!name) {
				return;
			}

			var xhr = new XMLHttpRequest();

			if ((galleryManifest.join() + ',').indexOf(name + ',') === -1) {
				return;
			}

			xhr.open('GET', 'gallery/' + name + '.js', false);
			xhr.send(null);
			inputSession.setValue(loadedViaGallery = xhr.responseText);
		},
		generateHTML: function() {
			var html = [];
			for (var i = 0, l = galleryManifest.length; i < l; ++i) {
				var script = galleryManifest[i];
				html.push('<a href="#' + script + '"><img src="gallery/' +  script + '.png"/></a>');
			}
			return html.join('');
		}
	};

	window.onhashchange = function() {
		gallery.load(window.location.hash.replace(/^#/, ''));
	};

	function CollectiveConverter(cb) {
		this.gif = new SonicGIFConverter;
		this.sprite = new SonicSpriteConverter;
		this.cb = cb;
	}

	CollectiveConverter.prototype = {
		setup: function(sonic) {
			this.gif.setup(sonic);
			this.sprite.setup(sonic);
		},
		step: function(sonic) {
			this.gif.step(sonic);
			this.sprite.step(sonic);
		},
		teardown: function(sonic) {
			this.gif.teardown(sonic);
			this.sprite.teardown(sonic);
			this.cb();
		}
	};

	var activeConverter;

	window.Sonic = (function(RealSonic) {
		return function(conf) {
			activeConverter = conf.converter = new CollectiveConverter(onConversion);
			conf.background = conf.background || '#FFF';
			// Save instance to local var
			return sonic = new RealSonic(conf);
		};
	}(Sonic));

	var sonic;
	var sc = document.getElementById('sc');
	var gif = document.getElementById('gif');
	var sprite = document.getElementById('sprite');
	var viewCSS3Button = document.getElementById('view-css3');

	var inputEditor = ace.edit('input');
	inputEditor.setTheme("ace/theme/monokai");
	inputEditor.setShowPrintMargin(false);

	var inputSession = inputEditor.getSession();
	inputSession.setMode("ace/mode/javascript");

	inputSession.on('change', debounce(update, 400));

	var galleryEl = document.getElementById('gallery');
	galleryEl.innerHTML = gallery.generateHTML();
	galleryEl.onclick = function(e) {
		if (/^(a|img)$/.test(e.target.nodeName.toLowerCase())) {
			if (loadedViaGallery !== inputSession.getValue()) {
				return confirm('Are you sure? (you have made changes!)');
			}
		}
	};

	viewCSS3Button.onclick = function() {
		var w = window.open('about:blank', '', 'width=500,height=500,location=no');
		w.document.body.style.whiteSpace = 'pre';
		w.document.body.style.font = '';
		w.document.title = 'CSS3 Sonic Sprite';
		w.document.write(
			'<style>' + 
				activeConverter.sprite.css3.replace(
					'PNG_URI_GOES_HERE',
					activeConverter.sprite.img.src
				) +
				'body{' +
					'white-space: pre;' +
					'font: .8em "Monaco", "Menlo", "Ubuntu Mono", "Droid Sans Mono", "Consolas", monospace;' +
				'}' +
			'</style>' +
			'<div class="loader"></div><br>' +
			activeConverter.sprite.css3
		);
	};

	function update() {

		if (sonic) {
			sonic.stop();
			sc.innerHTML = '';
			gif.innerHTML = '';
			sprite.innerHTML = '';
			sonic = null;
		}

		eval(inputSession.getValue());

		if (!sonic) {
			throw new Error('Invalid input, no Sonic instance produced.');
		}

		sonic.canvas.title = 'Click to pause';
		sonic.canvas.onclick = function() {
			sonic.stopped ? sonic.play() : sonic.stop();
		};

		sc.appendChild(sonic.canvas);	
		sonic.play();

	}

	function onConversion() {
		viewCSS3Button.style.display = 'block';

		gif.appendChild(activeConverter.gif.img);

		var spriteAnchor = sprite.appendChild(
			document.createElement('a')
		);

		var spriteImg = spriteAnchor.appendChild(activeConverter.sprite.img);

		spriteAnchor.onclick = function() {
			spriteAnchor.href = spriteImg.src;
		};
		spriteAnchor.target = '_blank';
	}

	function debounce(func, wait, immediate) {
		var t, result;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				t = null;
				if (!immediate) result = func.apply(context, args);
			};
			var callNow = immediate && !t;
			clearTimeout(t);
			t = setTimeout(later, wait);
			if (callNow) result = func.apply(context, args);
			return result;
		};
	}

}());