
$(function(){
	
	
//	$enhaces.removeClass()
//	console.log($enhaces);
//	$enhaces.on("click",function(){
//		location.href="html/list.html";
//	})
	
	
	
	//头部的引入
	var $head = $("._head");
	$head.load("html/header.html" , function(){
		//console.log("加载头部");
		
		//链接到美妆个护
		var $enhaces=$(".enhaces");
		$enhaces.attr("href","html/list.html");
		
		//链接到注册
		var $register=$(".logon .register");
		$register.attr("href","html/register.html");
		
		//链接到登录
		var $login=$(".top-right .logon .login");
		$login.attr("href","html/login.html");
		
		//调用函数来使滚动条滚动到一定高度时出现吸顶菜单
		navTop();
		getHead();
		
		var $username = $("#username");
		$username.on("click","#quit",function(){
			$.cookie("user",11111,{expires:0,path:"/"});
			history.go(0);
		})
		
	})
	
	//轮播图的调用插件
	$(".lunbo").xcarousel({
		width : 955,
		height : 445,
		type : "x"
	});
	
	
	//定时器来设定时间
	var $coundown=$('.countdown em');
	var seconds=66935;
	var timer = setInterval(function(){
			seconds--;
			var hour = parseInt(seconds/(60*60));
			var minu = parseInt(seconds/60%60);
			var second= parseInt(seconds%(60));
			if(seconds<10){
				second = '0'+ second;
			}
			
			$coundown.text("00天"+hour + "时" + minu + "分" + second+ "秒");
			
			if(seconds<=0){
				clear(timer);
			}
		
		},1000);
	
	//轮播图下的图片加载
 	//数据使用ajax来请求json中的goods
	var $wp_goods = $("#wp-goods");
                	
    	$.ajax({
    		url:"Json/index.json",
    		success:function(res){
			//console.log(res);
    			
    			$.each(res, function(idx,ele) {
    				if(ele.Id == "goods"){
    					var $div = $("<div/>").addClass("items").html("<a href='#'><img src="+ele.imgUrl+" title="+ele.title+"/></a><a href='#' class='panic'><h4>"+ele.title2+"</h4><p>"+ele.content+"</p></a>");
    					var $div2 = $("<div/>").addClass("tariff").html("<span class='b5m-price'><span>¥</span>"+ele.b5m_price+"</span><span class='origin-price'>"+ele.origin_price+"</span><a href='#' class='btn-buy'>立即购买</a>");
    					$div2.appendTo($div);
    					$div.appendTo($wp_goods);
    				}
    			});
    		}
    	});
	
	//人气推荐
	//数据使用ajax来请求json中的beauty
	var $pro_list = $("#pro-list");
	$.ajax({
		url:"Json/index.json",
		success:function(res){
			//console.log(res);
			
			$.each(res, function(idx,ele) {
				if(ele.Id == "beauty"){
					var $dl =$("<dl/>").addClass("item").html("<dt class='product-img'><a href='#' class='a-img'><img src="+ele.imgUrl+"/></a><a target='_blank' class='title-link' href='#'>"+ele.title_link+"</a></dt>");
					var $dd =$("<dd/>").addClass("price-ctn").html("<span class='b5m-price'><em>¥</em>"+ele.b5m_price+"</span><span class='price'>"+ele.price+"</span>");
					$dl.append($dd).appendTo($pro_list);
				}
			});
			
			$("#pro-list dl").first().addClass("first");
			$("#pro-list dl").eq(4).addClass("first");
		}
	});
	
	//人气品牌
	//在json文件中的id是popularity
	var $col_brand=$('#col_brand');
	$.ajax({
		
		url:"Json/index.json",
		async:true,
		success:function(res){
			//console.log(res);
			$.each(res, function(idx,ele) {
				if(ele.Id == "popularity"){
					var $list_item=$("<div/>").addClass("list_item");
					var div1=$("<div/>").addClass("pro_item").html("<a href='#'><img src="+ele.imgUrl+"/></a>");
					var div2=$("<div/>").addClass("desc").html("<a target='_blank' class='title-link' href='#'>"+ele.content+" </a><span class='now-price'>"+ele.now_price+"</span><span class='original-price'><dfn>¥</dfn>"+ele.original_price+"</span>");
					 $list_item.append(div1).append(div2);
					 $col_brand.append($list_item);
				}
			});
		}
	});
	
	//新品上架
	var $show_list=$("#show_list");
	$.ajax({
		url:"Json/index.json",
		async:true,
		success:function(res){
			$.each(res, function(idx,ele) {
				if(ele.Id=="new_product"){
					var $a=$("<a/>").addClass("kinds").html("<img src="+ele.imgUrl+"/><span class='content'>"+ele.content+"</span><span class='newPrice'><em>"+ele.now_price+"</em><i>"+ele.old_price+"</i></span>");
					$show_list.append($a);
				}
				
			});
		}
	});
	
	//女装
	var $women_dressr=$("#women_dressr");
	$.ajax({
		url:"Json/index.json",
		async:true,
		success:function(res){
			//console.log(res);
			$.each(res, function(idx,ele) {
				if(ele.Id=="women_product"){
					var $li=$("<li/>");
					var $a=$(" <a href='#' title="+ele.tit+"target='_blank' </a>");
					var $div1=$("<div/>").addClass("bag_img").html(" <img src="+ele.imgUrl+" alt=''/>");
					var $h4=$("<h4/>").addClass("goods-title").html(" "+ele.goods_title+" ");
					var $div2=$("<div/>").addClass("goods-price").html(" <span class='goods-new-price'>"+ele.now_price+"</span><span class='goods-old-price'>"+ele.old_price+"</span> ");
					$a.append($div1).append($h4).append($div2).appendTo($li);
					$women_dressr.append($li);
				}
			});
		}
	});
	
	//美妆
	var $cosmetic=$("#cosmetic"); 	
	$.ajax({
		url:"Json/index.json",
		async:true,
		success:function(res){
			//console.log(res);
			$.each(res, function(idx,ele) {
				if(ele.Id =="cosmetic"){
					var $li=$("<li/>");
					var $a=$("<a href='#' title="+ele.title+ "target='_blank' </a>");
					var $div1=$("<div/>").addClass("bag_img").html("<img src="+ele.imgUrl + " alt=''/>");
					var $h4=$("<h4/>").addClass("goods-title").html(" "+ele.goods_title+" ");
					var $div2=$("<div/>").addClass("goods-price").html(" <span class='goods-new-price'>"+ele.now_price+"</span><span class='goods-old-price'>"+ele.old_price+"</span> ");
					$a.append($div1).append($h4).append($div2).appendTo($li);
					$cosmetic.append($li);
				}
			});
		}
	});
	
	//小马包
	var $pony_site=$("#pony_site");
	$.ajax({
		
		url:"Json/index.json",
		async:true,
		success:function(res){
			$.each(res, function(idx,ele) {
				if(ele.Id=="pony_site"){
					var $a=$("<a href='#'><img src="+ele.imgUrl+"/></a>");
					$pony_site.append($a);
				}
			});
		}
	});
	
	
	//尾部的引入
	var $footer=$('.foot');
	$footer.load('html/footer.html',function(){
		//console.log('加载尾部');
	})
	
	
	
});
