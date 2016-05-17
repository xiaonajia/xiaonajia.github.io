$(document).ready(function(){
	/*lht*/
	var li = $('.bc_ff ul li');
	li.click(function(){
		if($(this).children().find('img').attr('src') == 'images/noselect.png'){
			$(this).children().find('img').attr('src','images/select.png');
		}else{
			$(this).children().find('img').attr('src','images/noselect.png');
		}
	});
	var all = $('.selectall .fr'),
			allt = $('.allt'),
			btn_pz = $('.btn_pz');
		all.click(function(){
			var chil = $('.mt10 img');
			if(chil.attr('src') == 'images/noselect.png'){
				chil.attr('src','images/select.png');
				$('.unselect_point').css('background','#80c269');
			}else if(chil.attr('src') == 'images/select.png'){
				chil.attr('src','images/noselect.png');
				$('.unselect_point').css('background','#dedede');
			};
		});
		allt.click(function(){
			var img = $(this).children('div').children('span').children('img');
			if(img.attr('src') == 'images/noselect.png'){
				img.attr('src','images/select.png');
			}else if(img.attr('src') == 'images/select.png'){
				img.attr('src','images/noselect.png');
			}
		});
		btn_pz.click(function(){
			$('.tc_pz').fadeIn(500).delay(1000).fadeOut(500);
		});
});