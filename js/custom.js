$(document).ready(function(){
	var subMenu;

	$('.btn-menu').click(function(){
		$(".btn-menu,.menu,.content").toggleClass("closed", 1000, "easeOutSine");
		
	});
	$('a').click(function(){
		$('a').removeClass('active');
		$(this).addClass('active');
	});

	subMenu = $('li.sub-menu > a');
	subMenu.click(function(){
		$(this).next().toggle();
	});
});