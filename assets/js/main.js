/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Spotlight rotated-contain correction.
		var updateSpotlightRotateContainScale = function() {

			var parseAngleToRadians = function(angleValue) {
				if (!angleValue)
					return 0;

				var value = angleValue.trim().toLowerCase();
				var number = parseFloat(value);

				if (!isFinite(number))
					return 0;

				if (value.indexOf('turn') !== -1)
					return number * Math.PI * 2;

				if (value.indexOf('rad') !== -1)
					return number;

				if (value.indexOf('deg') !== -1)
					return number * Math.PI / 180;

				return number * Math.PI / 180;
			};

			var applyScale = function($imageWrap) {
				var imageWrap = $imageWrap[0];
				var section = $imageWrap.closest('.spotlight.style1')[0];
				var img = $imageWrap.find('img')[0];

				if (!imageWrap || !section || !img)
					return;

				var ww = imageWrap.clientWidth;
				var wh = imageWrap.clientHeight;
				var nw = img.naturalWidth;
				var nh = img.naturalHeight;

				if (!(ww > 0 && wh > 0 && nw > 0 && nh > 0)) {
					imageWrap.style.setProperty('--spotlight-image-rotate-scale', '1');
					return;
				}

				var angleValue = getComputedStyle(section).getPropertyValue('--spotlight-image-rotate');
				var theta = parseAngleToRadians(angleValue);
				var absCos = Math.abs(Math.cos(theta));
				var absSin = Math.abs(Math.sin(theta));

				var containScale = Math.min(ww / nw, wh / nh);
				var fittedW = nw * containScale;
				var fittedH = nh * containScale;

				var rotatedW = fittedW * absCos + fittedH * absSin;
				var rotatedH = fittedW * absSin + fittedH * absCos;

				if (!(rotatedW > 0 && rotatedH > 0)) {
					imageWrap.style.setProperty('--spotlight-image-rotate-scale', '1');
					return;
				}

				var rotateContainScale = Math.min(ww / rotatedW, wh / rotatedH);
				imageWrap.style.setProperty('--spotlight-image-rotate-scale', rotateContainScale.toFixed(5));
			};

			$('.spotlight.style1 > .image.img-scale-contain.img-rotate-angle').each(function() {
				var $imageWrap = $(this);
				var img = $imageWrap.find('img')[0];

				if (!img)
					return;

				if (img.complete && img.naturalWidth > 0)
					applyScale($imageWrap);
				else
					img.addEventListener('load', function() { applyScale($imageWrap); }, { once: true });
			});

		};

		$window.on('load', function() {
			updateSpotlightRotateContainScale();
		});

		$window.on('resize', function() {
			updateSpotlightRotateContainScale();
		});

})(jQuery);