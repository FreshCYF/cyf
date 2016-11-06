$(function(){
	
	var $inputHave=$(".have");
	var $log=$(".log");
	var value_idx;
	var arr= new Array(3);
	var $show_box=$(".show_box");
	
	//获得焦点还有失去焦点时的效果设置
	$.each($inputHave,function(){
		
		$(this).focus(function(){
			//console.log($(this).index());
			
			//获取自定义的属性值
			value_idx=$(this).attr("data");
//			console.log(value_idx);
			
			$(this).css({
				'background':'#f9f9f9',
				'color':'#8e8e8e'
			});
			
		});
		
		$(this).blur(function(){
			$(this).css({
				'background':'white',
				'color':'#000',
			});
			
			//如果输入的值存在
			if($(this).val()){
				
				//用户名判断
				if(value_idx==0){
					$show_box.html("");
					if( !(/^\D\w{5,}$/.test( $(this).val() ) ) ){
						$show_box.html("用户名格式不对");
						$(this).val('');
						var timer=setTimeout(function(){
							$show_box.html("");
						},2000)
						arr[0] = false;
					}else{
						arr[0] = true;
					}
				}
				
				//密码
				if(value_idx==1){
					
					if(!(/^\w{6,15}$/.test( $(this).val() )) ){
						$show_box.html("密码格式不对");
						$(this).val('');
						var timer=setTimeout(function(){
							$show_box.html("");
						},2000)
						arr[1]=false;
					}else{
						arr[1] = true;
					}
				}
				
				if(value_idx==2){
					
					if( !($(this).val() == check_code) ){
						$show_box.html("验证码输入有误");
						$(this).val('')
						var timer=setTimeout(function(){
							$show_box.html("");
						},2000)
						arr[2] = false;
					}else{
						arr[2] = true;
					}
				}
			}
		});
	});
	
	
	//用来验证每个输入框的值是否正确
	
	$log.on("click",function(){
		
//		if(arr[0]&&arr[1]&&arr[2]){
//			
//		}
//		
		if( $inputHave.eq(0).val()!="" && $inputHave.eq(1).val()!=""){
						
			//获取cookie的用户信息
			var sCookie = $.cookie('user');
			if(sCookie==undefined || sCookie==""){
				//cookie为空时表示没有注册用户
				console.log('用户没有注册');
			}else{
				
				var bRegister = false;  //表示用户没有注册
				//将cookie转换成数组
				var aCookie = JSON.parse(sCookie);
				//console.log(aCookie);
				
				//遍历数组判断输入的用户信息是否已注册
				$.each(aCookie, function() {
					
					if( this.user == $inputHave.eq(0).val() && this.psw == $inputHave.eq(1).val() ){
						//已注册修改 注册状态；
						bRegister = true;
					}
					
				});
				
				if(bRegister){
					//用户已注册
					alert("登陆成功");
					//修改登录状态
					var obj = {type:true,name:$inputHave.eq(0).val()};
					location.href="../index.html";
				}else{
					
					//用户未注册
					alert("登陆失败");
					var obj = {type:false};
					history.go(0);
				}
				//修改cookie里面的登录状态
				$.cookie('login',JSON.stringify(obj),{expires:7 , path:"/"});
				console.log($.cookie('login'));
			}
		}
				
	})
	
	
	
	var $check_btn_img=$(".check_btn img");
	//用一个数组来先保存验证码的图片
	var obj=[{src:"../img/check1.jpg",num:"w45c"},{src:"../img/check2.jpg",num:"fwbd"},{src:"../img/check3.jpg",num:"x2g3"},{src:"../img/check4.jpg",num:"e4ge"},{src:"../img/check5.jpg",num:"bayp"},{src:"../img/check6.jpg",num:"8cne"},{src:"../img/check7.jpg",num:"fabp"},{src:"../img/check8.jpg",num:"3dy8"},{src:"../img/check9.jpg",num:"d7ew"},{src:"../img/check10.jpg",num:"gc7f"},{src:"../img/check11.jpg",num:"cgan"},{src:"../img/check12.jpg",num:"ay3c"},{src:"../img/check13.jpg",num:"f7c6"},{src:"../img/check14.jpg",num:"63ed"},{src:"../img/check15.jpg",num:"pmnb"}];
	//验证码里面的数字
	var check_code=obj[1].num;
	console.log(check_code);
	$check_btn_img.on("click",function(){
		var random = parseInt(Math.random()*15);
		$(this).attr("src",obj[random].src);
		check_code = obj[random].num;
		console.log(check_code);
	});
	
	//点击换验证码
	var $change=$(".change");
	$change.on("click",function(){
		var random = parseInt(Math.random()*15);
		$check_btn_img.attr("src",obj[random].src);
		check_code = obj[random].num;
	})
	
	
	//忘记密码时的
	var $forMethod=$(".forMethod");
	var $forget_a=$(".forget a");
	$forget_a.on("mouseenter",function(){
		$forMethod.css({
			"display":"block",
		})
	}).on("mouseout",function(){
		$forMethod.css({
			"display":"none",
		})
	})
	
})



