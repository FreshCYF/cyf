

$(function(){
	
	$d_header=$(".Dheader");
	$d_header.load("header.html",function(){
//		console.log("头部");

		//调用函数来当滚动条拉动时出现固定导航
		navTop();
	});
	
	//加载左边的图片
	var $products=$("#products");
	$.ajax({
		type:"get",
		url:"../Json/Details.json",
		async:false,
		success:function(res){
			$.each(res, function(idx,ele) {
				if(ele.Id=="D_good"){
					//创建a
					var $a=$("<a/>").html("<div class='imgs'><img src="+ele.imgUrl+"/></div><div class='title'>"+ele.title+"</div><div class='price'>"+ele.price+"</div>");
					$products.append($a);
				}
			});
		}
	});
	
	
	
	//找list1.json里面的href里面的数字
	var index=location.search.replace("?","");
	
	//idx是接图片后的数
	var idx;
	console.log(index);
	//小图
	var inner_img=$(".inner_img");
	//大图的盒子
	var $big_box=$(".big_img");
	
	var $goodinfo=$("#goodinfo");
	var $dist_price=$(".dist_price");
	
	$.ajax({
		type:"get",
		url:"../Json/list1.json",
		async:true,
		success:function(res){
			//console.log(res);
			//v后面的数字
			var i=parseInt(index)+1;
			
			inner_img.html("<a href='' class='select first'><img src="+res[index].smallImg_view1+"></a><a href=''><img src="+res[index].smallImg_view2+"/></a><a href=''><img src="+res[index].smallImg_view3+"/></a>");
//			console.log("../img/v"+i+"_big1.jpg");
			var $h2=$("<h2/>").html(" <span>"+res[index].h2+"</span>");
			var $sub_title_black=$("<p/>").addClass("sub-title-black").html(" "+res[index].sub_title_black+" ");
			
			$dist_price.before($h2);
			$dist_price.before($sub_title_black);
			var $super_price=$("<p/>").addClass("super_price").html("<span class='super_price_p'>价格</span><span class='yen'>"+res[index].yen+"</span><span class='market-price'>"+res[index].market_price+"</span>");
			$dist_price.append($super_price);
			
			var $big_img=$("<img/>")
			$big_img.attr("src","../img/v"+i+"_big1.jpg").appendTo($big_box);
			//获取a并遍历a
			var $inner_img_a=$(".inner_img a");
			$.each($inner_img_a,function(){
				$big_box.append($big_img);
				
				$(this).hover(function(){
					$(this).addClass("select");
					$(this).siblings("a").removeClass("select");
					idx=$(this).index()+1;
					
					//鼠标经过小图时换大图的路径
					$big_img.attr("src","../img/v"+i+"_big"+idx+".jpg");
					
					$(".big_img").xzoom({
						width:100,
						height:100,
					});
				})
			})
			
		}
	});
	
	
	
	//点击左右进行加减数量
	var $Subtractive=$(".Subtractive");
	var $input=$(".goods_nums input");
	var $addition=$(".addition");
	//获取当前的value值
	var num=$input.val();
//	console.log(num);
	$Subtractive.on("click",function(){
		if(num==1){
			$input.val(1)
		}else{
			$input.val(--num);
		}
	})
	
	$addition.on("click",function(){
		
		$input.val(num++);
		
	})
	
	//立即购买
	var $line1=$(".btn_line .line1");
	$line1.on("click",function(){
		location.href="cart.html";
		
	}).on("mouseenter",function(){
		$(this).css({
	 		"cursor":"pointer",
	 	})
	})
	
	
	//加入购物车
	var $line2=$(".btn_line .line2");
	$line2.on("click",function(){
		//获取图片
		var firestImg=$(".inner_img .first").find('img').attr("src");
		//console.log(firestImg);
		//获取标题
		var title=$(".goodinfo h2 span").html();
		//console.log(title);
		//获取价格
		var price=$(".yen").html();
		//console.log(price);
		
		//新产品的信息
		var obj={"img":firestImg,"title":title,"price":price};
		
		//strCookie 是存在cookie里面的产品信息
		var strCookie = $.cookie("goods");
		//console.log(strCookie);
		
		var  bGood = false;  //代表没有信息
		if(strCookie == undefined || strCookie =="" ){
			//如果完成没有产品信息就声明空的一个数组来保存
			var oCookie=[];
			var newGood={"img":firestImg,"title":title,"price":price,numb:1};
			oCookie.push(newGood);
		}else{
			//如果存在有产品信息,就提取出来转为对象
			var oCookie = JSON.parse(strCookie);
			
			//遍历所有产品对象
			$.each(oCookie,function(){
				//如果在cookie里面能够找到产品信息  
				//对数量+1 num+1
				
				if(this.title==title){
					var numb = parseInt(this.numb)+1;   //为了防止num是字符串 讲字符串转换成int
					this.numb = numb;
					bGood =true  ;  //表示产品有信息
				}
			})
			
			//cookie存在产品信息 但是没有当前购买的产品的信息
			if(bGood==false){
				var newGood = {"img":firestImg,"title":title,"price":price,numb:1}//新的完整的产品信息
				oCookie.push(newGood);
			}
		}
		
		
		//重新设置cookie
		$.cookie("goods",JSON.stringify(oCookie),{expires:7 , path:"/"});
		console.log($.cookie("goods"));
		
	}).on("mouseenter",function(){
		$(this).css({
			"cursor":"pointer",
		})
	})
	
	
	
	
	//引入尾部
	var $d_foot=$(".Dfooter");
	$d_foot.load("footer.html",function(){
		console.log("尾部");
	});
});
