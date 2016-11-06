$(function(){
	var $load_foot=$(".load_foot");
	
	var $cart_foot_select=$(".cart-foot-select");
	//获取名称goods为产品
	var strCookie = $.cookie("goods");
	if(strCookie==undefined || strCookie==""){
		console.log("没有购买产品");
	}else{
		//刷新产品列表
		//将得到的字符串转为对象
		var oCookie=JSON.parse(strCookie);
		//console.log(oCookie);
		//遍历
		$.each(oCookie, function() {
			var pricen=this.price;
			 pricen = pricen.substring(1);
			//创建一个div
			var $div=$("<div/>").addClass("cart_children").html("<div class='top'><a href='#' class='checked_all_item selects'></a><span class='check_content'>海外直邮-韩国直邮2仓</span></div> ")
			var $cart_items=$("<div/>").addClass("cart_items");
			//创建一个ul
			var $ul=$("<ul/>").addClass("cart_items_content").html(" <em class='icon_checkbox selects'></em>");
			//放图片的li
			var imgLi=$("<li/>").addClass("items_pic").html(" <img src="+this.img+"/> ");
			//存放title的li
			var titLi=$("<li/>").addClass("items_name").html(" <a href='#'>"+this.title+"</a> ")
			
			var $postage=$("<li/>").addClass("postage").html("化妆品净含量:155g/mL");
			//存放价格的li
			var priceLi=$("<li/>").addClass("items-price").html(" "+this.price+" ");
			
			var $items_quantity=$("<li/>").addClass("items-quantity").html("  <span class='btn-subtraction'>-</span> <input id='nun' value="+this.numb+" type='text'><span class='btn-add'>+</span> ");
			//计算总价格的li
			var amountLi=$("<li/>").addClass("items-amount").html("<span>¥"+parseInt(pricen)*parseInt(this.numb)+"</span> ");
			//用于删除的Li
			var delLi=$("<li/>").addClass("items-operations").html(" <a>删除</a> ");
			
			$ul.append(imgLi).append(titLi).append($postage).append(priceLi).append($items_quantity).append(amountLi).append(delLi);
			$cart_items.append($ul);
			$div.append($cart_items);
			$cart_foot_select.before($div);
			
			
			//点击删除商品
			var $del=$(".items-operations a")
			$del.on("click",function(){
				var oldCookie = JSON.parse($.cookie("goods"));
				console.log(oldCookie);
				var $title=$(this).parent().siblings('.items_name').find("a").html();
//				console.log($title);

				//获取所点击删除的对应的要移除的盒子
				var $cart_good=$(this).parent().parent().parent().parent();
				$.each(oldCookie, function(index) {
					if($title==this.title){
						//删除对应下标的对象
						oldCookie.splice(index,1);
						
						$($cart_good).remove();						
					}
				});
				//重新设置cookie
				$.cookie("goods",JSON.stringify(oldCookie),{expires:7,path:"/"});
				console.log($.cookie("goods"));
			})
		});
	}
	
	
	//点击减少
	var $btn_subtraction=$(".btn-subtraction");
	var $input=$(".items-quantity input");
	var $btn_add=$(".btn-add");
	//获取当前的value值
	var num=$input.val();
	
	//点击减少数量
	$btn_subtraction.on("click",function(){
		//获取单价,并用空格来替换¥
		var sele=$(this).parent().prev().html().replace("¥","");
		var newsele=parseInt(sele);
		
		var mount=$(this).parent().next().find("span");
		//console.log(mount);
		var $input=$(this).next();
		
		if(num==1){
			$input.val(1)
			mount.html("¥"+num*newsele);
		}else{
			$input.val(--num);
			mount.html("¥"+num*newsele);
		}
	
	})
		
	
	//点击增加数量
	$btn_add.on("click",function(){
		//获取单价,并用空格来替换¥
		var sele=$(this).parent().prev().html().replace("¥","");
		var newsele=parseInt(sele);
		
		var mount=$(this).parent().next().find("span");
		
		var $input=$(this).prev();
		
		$input.val(num++);
		mount.html("¥"+num*newsele);
	
	})
	//全选
	var $allSelect=$(".cart_thead .check_all");
	
	//需全部选中的按钮
	var $selects=$(".selects");
	//需要计算的数量
	var $total_select_amount=$(".total-select-amount");
	
	//每个的总价
	var $items_amount=$(".items-amount span");
	
	//计算总的价格
	var $price_total=$("#price_total");
	var sumPrice=0;
	var sumNum=0;
	//点击全选
	$allSelect.on("click",function(){
		$selects.toggleClass("selected");
		
		//获取大的商品的盒子
		var $numCart_children=$(".cart_children");
		
		var $btn_orange=$(".btn-orange");
		//从一开始就清0
		sumPrice=0;
		sumNum=0;
		if($allSelect.hasClass("selected")){
			$.each($numCart_children,function(idx,ele){
				
				var mountMoney=$(this).find(".items-amount").find("span").html();
				var newMountMoney=parseInt( mountMoney.replace("¥","") );
				//console.log(typeof newMountMoney);
				sumPrice +=newMountMoney;
				$btn_orange.css({
					"background": "orange",
				});
				
				var sigleNumber=$(this).find(".items-quantity").find("#nun")[0].value;
				var newsigleNuber=parseInt(sigleNumber);
				sumNum+=newsigleNuber;
			})
			//console.log(sum);
			$price_total.html(sumPrice);
			$total_select_amount.html(sumNum);
		}else{
			
			$price_total.html("0.00");
			$total_select_amount.html("0");
			$btn_orange.css({
				"background": "#e6e6e6",
			});
		}
	})
	
	
	$load_foot.load("footer.html");
})
