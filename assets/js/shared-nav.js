(function () {
	var mount = document.getElementById('site-header');

	if (!mount) {
		return;
	}

	var isLanding = document.body.classList.contains('landing');
	var headerClass = isLanding ? ' class="alt"' : '';
	var currentPage = window.location.pathname.split('/').pop() || 'index.html';
	var researchPages = [
		'research.html',
		'research-quasar-discovery.html',
		'research-highz-quasars.html',
		'research-bh-growth.html',
		'research-ml.html'
	];
	var isResearchPage = researchPages.indexOf(currentPage) !== -1;

	function activeClass(page) {
		return currentPage === page ? ' class="active"' : '';
	}

	var researchParentClass = isResearchPage ? 'has-submenu active-parent' : 'has-submenu';
	var researchAriaExpanded = 'false';

	mount.outerHTML = [
		'<header id="header"' + headerClass + '>',
		'\t<nav id="nav">',
		'\t\t<ul>',
		'\t\t\t<li><a href="index.html"' + activeClass('index.html') + '>Home</a></li>',
		'\t\t\t<li><a href="aboutme.html"' + activeClass('aboutme.html') + '>About Me</a></li>',
		'\t\t\t<li class="' + researchParentClass + '">',
		'\t\t\t\t<a href="research.html" aria-haspopup="true" aria-expanded="' + researchAriaExpanded + '"' + activeClass('research.html') + '>Research</a>',
		'\t\t\t\t<ul class="submenu">',
		'\t\t\t\t\t<li><a href="research.html"' + activeClass('research.html') + '>Overview</a></li>',
		'\t\t\t\t\t<li><a href="research-quasar-discovery.html"' + activeClass('research-quasar-discovery.html') + '>Quasar Discovery</a></li>',
		'\t\t\t\t\t<li><a href="research-highz-quasars.html"' + activeClass('research-highz-quasars.html') + '>High-z Quasars</a></li>',
		'\t\t\t\t\t<li><a href="research-jwst.html"' + activeClass('research-jwst.html') + '>JWST and the Cosmic Dawn</a></li>',
		// '\t\t\t\t\t<li><a href="research-bh-growth.html"' + activeClass('research-bh-growth.html') + '>Black Hole Growth</a></li>',
		'\t\t\t\t\t<li><a href="research-ml.html"' + activeClass('research-ml.html') + '>Machine Learning</a></li>',
		'\t\t\t\t</ul>',
		'\t\t\t</li>',
		'\t\t\t<li><a href="group.html"' + activeClass('group.html') + '>Group</a></li>',
		'\t\t\t<li><a href="software.html"' + activeClass('software.html') + '>Software</a></li>',
		'\t\t\t<li><a href="resources.html"' + activeClass('resources.html') + '>Resources</a></li>',
		'\t\t</ul>',
		'\t</nav>',
		'</header>'
	].join('');

	var researchItem = document.querySelector('#header li.has-submenu');
	var researchLink = researchItem ? researchItem.querySelector('a') : null;
	var mobileMenuQuery = window.matchMedia('(max-width: 736px), (hover: none), (pointer: coarse)');

	if (researchItem && researchLink && mobileMenuQuery.matches) {
		if (isResearchPage) {
			researchItem.classList.add('open');
			researchLink.setAttribute('aria-expanded', 'true');
		}

		researchLink.addEventListener('click', function (event) {
			if (!researchItem.classList.contains('open')) {
				event.preventDefault();
				researchItem.classList.add('open');
				researchLink.setAttribute('aria-expanded', 'true');
			}
		});

		document.addEventListener('click', function (event) {
			if (!researchItem.contains(event.target)) {
				researchItem.classList.remove('open');
				researchLink.setAttribute('aria-expanded', 'false');
			}
		});
	}
})();
