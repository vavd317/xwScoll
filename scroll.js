window.animating = false;
$(function() {
	initPage();
	$(window).resize(function() {
		initPage();
	});
	if (document.addEventListener) {
		document.addEventListener('DOMMouseScroll', windowScroll, false);
	}
	window.onmousewheel = document.onmousewheel = windowScroll;
});

window.hashJSON = {
	'#about': {
		next: '#products'
	},
	'#products': {
		next: '#jobs',
		last: '#about'
	},
	'#jobs': {
		next: '#contact',
		last: '#products'
	},
	'#contact': {
		last: '#jobs'
	}
};

function windowScroll(e) {
	return (e.wheelDelta||e.detail) > 0 ? scrollUp():scrollDown();
}

function scrollUp(){
	if (!window.animating) {
		var hashObject = window.hashJSON[window.location.hash || '#about'] || {};
		if (hashObject.last) {
			$('#leftbar').find('a[href="' + hashObject.last + '"]')[0].click();
			window.animating = !0;
		}
	}
}

function scrollDown(){
	if (!window.animating) {
		var hashObject = window.hashJSON[window.location.hash || '#about'] || {};
		if (hashObject.next) {
			$('#leftbar').find('a[href="' + hashObject.next + '"]')[0].click();
			window.animating = !0;
			if(hashObject.next == '#products' && !$('#down_line1').hasClass('show')) {
				$('#down_line1').addClass('show').animate({'height': $('#down_line1').data('height')}, 800);
			}
			if(hashObject.next == '#jobs' && !$('#down_line2').hasClass('show')) {
				$('#down_line2').addClass('show').animate({'height': $('#down_line2').data('height')}, 800);
			}
		}
	}
}

function initPage() {
	var dh = Math.min($(window).height(), 1200);
	$('#about, #products, #jobs, #contact').css('height', dh);
	$('#products_content').css('height', dh * 0.70);
	$('#products_title').css('top', (dh * 0.3 - 100)/2 - 34);
	var down_line1 = $('#down_line1');
	down_line1.css({'top': (dh - 600)/2 + 610});
	if(down_line1.hasClass('show')) {
		down_line1.css('height', (dh - (dh - 600)/2 - 610) + (dh * 0.3 - 100)/2 - 24);
	}
	else {
		down_line1.data('height', (dh - (dh - 600)/2 - 610) + (dh * 0.3 - 100)/2 - 24);
	}
	if(window.location.hash) {
		$('#leftbar').find('a[href="' + window.location.hash + '"]')[0].click();
	}
	var down_line2 = $('#down_line2');
	down_line2.css({'top': dh + dh * 0.3 + 455});
	if(down_line2.hasClass('show')) {
		down_line2.css('height', (dh - (dh * 0.3 + 455)) + (dh - 440)/2 - 90);
	}
	else {
		down_line2.data('height', (dh - (dh * 0.3 + 455)) + (dh - 440)/2 - 90);
	}
	if(window.location.hash) {
		$('#leftbar').find('a[href="' + window.location.hash + '"]')[0].click();
	}
}

window.scrollCompleted = function(anchor) {
	$('#slidebar').find('a').removeClass('active');
	$('#slidebar').find('a[href="#' + anchor + '"]').addClass('active');
	window.animating = !1;
};