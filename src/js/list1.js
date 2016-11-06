$(function() {
	var $_header = $("._head");
	$_header.load("header.html", function() {
//		console.log("头部");
		
		//链接到注册
		var $register=$(".logon .register");
		$register.attr("href","register.html");
		
		//链接到登录
		var $login=$(".top-right .logon .login");
		$login.attr("href","login.html");
		
		//调用函数来当滚动条拉动时出现固定导航
		navTop();
	});

//	<a href="#">
//		<img src="../img/list1.jpg"/>
//		<p class="content">韩国 SNP 动物面膜 神龙 老虎 熊猫 猫咪 松鼠 流氓兔 京剧脸谱 随机发</p>
//		<div class="introduce">
//			<p class="price-l">
//	            <span class="price-red">¥<b>26</b></span>
//	            <span class="price-grey">¥&nbsp;30</span>
//	        </p>
//	        <span class="price-r">已售6422件</span>
//		</div>
//	</a>
	
	//加载中间图片
	var $product_list = $("#product_list");
	var timer=setTimeout(function(){
		$.ajax({
	
			url: "../Json/list1.json",
			async: true,
			success: function(res) {
				$.each(res, function(idx, ele) {
					//console.log("11")
					if(ele.Id == "goods") {
						//创建a
						var $a = $("<a href="+ele.href+"></a>").html("<img src=" + ele.imgUrl + "/><p class='content'>" + ele.content + "</p>");
						var $div = $("<div/>").addClass("introduce");
						var $p = $("<p/>").addClass("price-l").html(" <span class='price-red'><b>" + ele.price_red + "</b></span><span class='price-grey'>" + ele.price_grey + "</span>");
						var $span = $("<span/>").addClass("price-r").html(" " + ele.price_r + " ");
						$div.append($p).append($span);
						$a.append($div);
						$product_list.append($a);
						//console.log($product_list)
					}
				});
			}
		});
	},1000);
	
	var $_foot=$(".foot");
	$_foot.load("../html/footer.html");

})