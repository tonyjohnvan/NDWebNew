/*!
Theme Name: TheONE
Theme URI: http://themeforest.net/user/Pooyaa/portfolio
Author: Pooyaa
Author URI: http://themeforest.net/user/Pooyaa
Description: TheONE coming soon page
*/
var $ = jQuery.noConflict();
jQuery(function($) {
	"use strict";

	//preloader
	$(window).load(function() {
		$("#preloader").delay(3500).fadeOut("slow");
		$(".loader").delay(3000).fadeOut("fast");
		$(".auto-due").delay(10).fadeOut("fast");
		setTimeout(function(){$(".home").removeClass("active")},1000);
		setTimeout(function(){$(".loading").removeClass("visible")},3000);
		setTimeout(function(){$(".home").addClass("active")},3000);
	});

	//scroll
	$("html").niceScroll({
		cursorcolor: '#fff',
		cursoropacitymin: '0',
		cursoropacitymax: '1',
		cursorwidth: '3px',
		zindex: 10000,
		horizrailenabled: false,
	});

	//video
	$(".background.video").each(function() {
		$(".stop-button").on('click', function(){
			$(".stop-button").toggleClass('fa-play').toggleClass('fa-pause');
			var videoBG = document.getElementById("video");
			if (videoBG.paused)
				videoBG.play();
			else
				videoBG.pause();
		});
		$(".volume-button").on('click', function() {
			$(".volume-button").toggleClass('fa-volume-off').toggleClass('fa-volume-up');
			$("video").prop('muted', !$("video").prop('muted'));
		});
	});

	// youtube
	$(".background.youtube").each(function() {
		$( ".volume-button" ).on('click', function() {
			$('#video').toggleVolume();
			$(".volume-button").toggleClass('fa-volume-up').toggleClass('fa-volume-off');
		});
		function sh1 () {
			$('#video').playYTP();
			$( ".stop-button" ).removeClass('fa-play');
			$( ".stop-button" ).addClass('fa-pause');
		}
		function sh2 () {
			$('#video').pauseYTP();
			$( ".stop-button" ).removeClass('fa-pause');
			$( ".stop-button" ).addClass('fa-play');
		}
		var fixpreparex = 0;
		if(fixpreparex == 0) {
		  $( ".stop-button" ).on('click', function() {
			fixpreparex = 1;
			sh2();
		  });
		}else {}
		$('#video').on("YTPPause",function(){
			if(fixpreparex == 1) {
			  $( ".stop-button" ).on('click', function() {
				fixpreparex = 2;
				sh1();
			  });
			}else {}
		});
		$('#video').on("YTPStart",function(){
			if(fixpreparex == 2) {
			  $( ".stop-button" ).on('click', function() {
				fixpreparex = 1;
				sh2();
			  });
			}else {}

		});
	});
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});
	// youtube
	$(".player").each(function() {
		$(".player").mb_YTPlayer();
	});

	//kenburn
	$(".zoom").each(function() {
		$("#slider").kenburnsy({
          fullscreen: true
        });
	});

	//bubble
	$(".bubble").each(function() {
		$(".bubble").pobubble({
			color: "#ffffff",
	        ammount: 7,
	        min: .1,
	        max: .3,
	        time: 60,
	        vertical:true,
	        horizontal:true,
	        style: 'circle'
		});
	});

	// slider
	$(".slider").each(function() {
		$('#slider').phoenix({
			delay: 6000,
			fullscreen: true,
			dots: false,
			keys: false,
		});
	});

	//textslider
	$(".textslider").each(function() {
		$('.textslider').flexslider({
			animation: "fade",
			animationLoop: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			controlNav: false,
			directionNav: false,
			keyboard: false,
		});
	});

	// Snow
	$(".snow").each(function() {
		snowBind();
	});

	//star
	$(".star").each(function() {
		postars($('.cover')[0]).init();
	});

	// rain
	$(".rain").each(function() {
		function getURLParameter(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		}
		var image = document.getElementById('background');
		image.onload = function() {
			var engine = new RainyDay('canvas','background', window.innerWidth, window.innerHeight, 1, getURLParameter("blur") || 15);

			var preset = getURLParameter("preset") || 1;
			if (preset == 1) {
				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_DROPS;
				engine.rain([ engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1) ], 100);
			} else if (preset == 2) {
				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_DROPS;
				engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
				engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
			} else if (preset == 3) {
				engine.gravity = engine.GRAVITY_NON_LINEAR;
				engine.trail = engine.TRAIL_SMUDGE;
				engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
			}
		};
		image.crossOrigin = "anonymous";
		image.src="http://placehold.it/1366x768";
	});

	// subscribe
	$("#newsletter").each(function() {
		var $form = $('#subscribe');
		$('.subscribe .submit').on('click', function(event) {
			if (event)
				event.preventDefault();
			register($form);
		});
		function register($form) {
			$.ajax({
				type: $form.attr('method'),
				url: $form.attr('action'),
				data: $form.serialize(),
				cache: false,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				error: function(err) {
					$('#newsletter .message').hide().html('<p class="error alert alert-danger"> Could not connect to server. Please try again later.</p>').fadeIn("slow");
					$("#newsletter .message").delay(1500).slideDown("slow");
				},
				success: function(data) {
					if (data.result != "success") {
						var message = data.msg.substring(4);
						$('#subscribe').attr('disabled', 'disabled');
						$('#subscribe').fadeTo("slow", 0.15, function() {
							$("#newsletter .loading-bar").addClass("visible");
							setTimeout(function() {$('#newsletter .form .message').addClass("visible");}, 2800);
							setTimeout(function() {$('#newsletter .loading-bar').removeClass("visible");}, 2800);
							setTimeout(function() {
								$("#newsletter .message").html('<p style="display:block"  class="error alert alert-danger"> ' + message + '</p>');
							}, 100);
							setTimeout(function() {$('#newsletter .message').addClass("visible");}, 2800);
						});
					} else {
						var message = data.msg.substring(4);
						$('#subscribe').attr('disabled', 'disabled');
						$('#subscribe').fadeTo("slow", 0.15, function() {
							$("#newsletter .loading-bar").addClass("visible");
							setTimeout(function() {$('#newsletter .form .message').addClass("visible");}, 2800);
							setTimeout(function() {$('#newsletter .loading-bar').removeClass("visible");}, 2800);
							setTimeout(function() {
								$('#newsletter .message').html('<p style="display:block" class="success alert alert-success"> ' + 'Awesome! We sent you a confirmation email.' + '</p>');
							}, 100);
							setTimeout(function() {$('#newsletter .message').addClass("visible");}, 2800);
						});
					}

				}
			});
		}
	});

	// contactform
	$("#contactform").each(function() {
		$('#contactform').validate({
			highlight: function(element, errorClass) {
				$(element).fadeOut(function() {
					$(element).fadeIn();
				});
			},
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true,
					minlength: 2
				},
				message: {
					required: true,
					minlength: 5
				}
			},
			messages: {
				name: "Please specify your name",
				email: {
					required: "We need your email address",
					email: " Please enter a valid email address"
				},
				subject: "Please specify your subject",
				message: "Please enter your message"
			},
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type: "POST",
					data: $(form).serialize(),
					url: "asset/inc/contact.php",
					success: function() {
						$('#contactform :input').attr('disabled', 'disabled');
						$('#contactform').fadeTo("slow", 0.15, function() {
							$(this).find(':input').attr('disabled', 'disabled');
							$(this).find('label').css('cursor', 'default');
							$("#contact .loading-bar").delay(1).addClass("visible");
							$('#contact .success').delay(10).slideDown("slow");
							setTimeout(function() {$('#contact .form .message').addClass("visible");}, 2800);
						});
					},
					error: function() {
						$('#contactform :input').attr('disabled', 'disabled');
						$('#contactform').fadeTo("slow", 0.15, function() {
							$(this).find(':input').attr('disabled', 'disabled');
							$("#contact .loading-bar").delay(1).addClass("visible");
							$('#contact .error').delay(10).slideDown("slow");
							setTimeout(function() {$('#contact .form .message').addClass("visible");}, 2800);
						});
					}
				});
			}
		});
	});

	//share
	(function() {
		[].slice.call( document.querySelectorAll( '.share' ) ).forEach( function( el ) {
			var openCtrl = el.querySelector( '.share-button' ),
				closeCtrls = el.querySelectorAll( '.share-cancel' );

			openCtrl.addEventListener( 'click', function(ev) {
				ev.preventDefault();
				classie.add( el, 'share-active' );
			} );

			[].slice.call( closeCtrls ).forEach( function( ctrl ) {
				ctrl.addEventListener( 'click', function() {
					classie.remove( el, 'share-active' );
				} );
			} );
		} );
	})();

	//material link
	$('.lnk').mousedown(function (e) {
		var target = e.target;
		var rect = target.getBoundingClientRect();
		var ripple = target.querySelector('.ripple');
		$(ripple).remove();
		ripple = document.createElement('div');
		ripple.className = 'ripple';
		ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
		target.appendChild(ripple);
		var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
		var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
		ripple.style.top = top + 'px';
		ripple.style.left = left + 'px';
		return false;
	});




});
