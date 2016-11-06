
function navTop(){
	var $Nav=$(".nav");
	var $wrap_nav_content=$("#wrap_nav_content");
	var iTop=$Nav.offset().top+$Nav.outerHeight();
	$(window).scroll(function(){
		var scrollTop=$(document).scrollTop();
//		console.log(scrollTop)
		if(scrollTop>=iTop ){
			$wrap_nav_content.css({
				"display":"block"
			});
		}else{
			$wrap_nav_content.css({
				"display":"none"
			});
		}
		
	});
	
}

$(function(){
	var $top=$("#rightest ul li.li-6");
	$(window).scroll(function(){
		//滚动条的高度
		var iTop=$(document).scrollTop();
		//console.log(iTop);
		//a获取最右边的top按钮，点击时就让滚动条出到上面
		$top.on("click",function(){
			iTop=0;
		})
	})
});

function getHead(){
	var user = JSON.parse($.cookie("user"));
	var $username = $("#username");
	if(user){
		$username.html("<p><a>【"+user[user.length-1].user+"】</a></p><p id='quit'><a>【退出】</a></p><p class='last'><a href='#'>手机版</a></p>");	
	}
}
