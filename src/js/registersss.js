$(function(){
	
	//输入框获得焦点和失去焦点
	var $input=$(".have");
	var $p=$(".reminder p");
	var $div=$(".reminder div");
	var idx;    //获得焦点时的下标
	var idx2;
	var i=0;
	
	var $show_box=$(".show_box");
	var $signs=$(".signs");
	var $checked=$(".checked");
	
	//用来验证每个输入框的值是否正确
	var arr= new Array(4);
	
	$.each($input,function(){
		
		$(this).focus(function(){
			//console.log($(this).index());
			//data-index是自定义属性,在这里是获取自定义属性
			idx=parseInt($(this).attr("data-index"));
			
			$(this).css({
				"border-color":"#f78b02",
			})
			$p.eq(idx).css({
				//设置可见的属性，不管有没有看到它所占的空间都会存在，而display不会
				"visibility":"visible",
			});
			
		});
		
		$(this).blur(function(){
			$(this).css({
				"border-color":"#e6e6e6",
			})
			
			$p.eq(idx).css({
				"visibility":"hidden",
			});
			//上次的提示框还在的话
			if($div.eq(idx2).css('display')=='block'){
				//让它隐藏
				$div.eq(idx2).css('display','none');
			}
			
			idx2=idx;
			
			if($(this).val()){
				//如果值存在 则进行正则判断
				
				//用户名验证
				if(idx2==0){
					//console.log(idx2);
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
				//图片验证
				if(idx2 ==1){
					console.log(check_code);
					if( !($(this).val() == check_code) ){
						$show_box.html("验证码输入有误");
						$(this).val('')
						var timer=setTimeout(function(){
							$show_box.html("");
						},2000)
						arr[1] = false;
					}else{
						arr[1] = true;
					}
				}
				
				//设置密码
				if(idx2==2){
					
					if(!(/^\w{6,15}$/.test( $(this).val() )) ){
						$show_box.html("密码格式不对");
						$(this).val('')
						var timer=setTimeout(function(){
							$show_box.html("");
						},2000)
						arr[2]=false;
					}else{
						arr[2] = true;
					}
				}
				
				//在确认密码
				if(idx2==3){
					var valuePwt=$input.eq(2).val();
					//sconsole.log(valuePwt)
					if( !($(this).val() == valuePwt) ){
						$show_box.html("输入的密码不一致");
						$(this).val('')
						var timer=setTimeout(function(){
							$show_box.html("");
						},2000)
						arr[3]=false;
					}else{
						arr[3] = true;
					}
				}
				
				
			}else{
				$div.eq(idx2).css({
					"display":"block",
				});
				var timer = setTimeout(function(){
					$div.eq(idx2).css({
						"display":"none",
					});
				},2000);
			}
		});
	});
	
	//点击注册
	$signs.on("click",function(){
		//全部正确时跳到登录页
		if(arr[0]&&arr[1]&&arr[2]&&arr[3]&& $checked[0].checked){
			//生成新的用户对象
			var newUser = {user:$input.eq(0).val(),psw:$input.eq(2).val()};
			
			//获取cookie里面的用户信息
			var sCookie = $.cookie('user');
			if(sCookie==undefined || sCookie==""){
				//如果cookie里的用户信息为空的时候
				
				//生成新的用户信息数组
				var aCookie = [];
				aCookie.push(newUser);
			}else{
				//如果不为空的时候
				
				//提取cookie里的用户信息,并且转为对象
				var aCookie = JSON.parse(sCookie);
				
				
				//遍历查看是否已经注册
				var bRrg = false //默认未注册
				$.each(aCookie,function(){
					if(this.user==$input.eq(0).val()){
						bRrg=true;
					}
				});
			}
			
			//为真时表示用户已注册
			if(bRrg){
				$show_box.html("用户已经被注册");
				history.go(0);
				var timer=setTimeout(function(){
						$show_box.html("");
					},2000)
			}else{
				//在用户信息数组中添加新的用户
				aCookie.push(newUser);
				alert("注册成功！")
//				console.log("应该跳转了")
				//跳转到登录页
				window.location.href= "login.html";
			}
			//将更新后的用户信息数组存入cookie
			$.cookie('user',JSON.stringify(aCookie),{expires:7 , path:"/"});
			//console.log($.cookie('user'));
			
		}else{
			console.log("hhahhahha")
			//不全对的时候就重新刷新本页面
			alert("注册失败！")
			history.go(0);
		}
		
		
		
	})
	
	//用一个数组来先保存验证码的图片
	var obj=[{src:"../img/check1.jpg",num:"w45c"},{src:"../img/check2.jpg",num:"fwbd"},{src:"../img/check3.jpg",num:"x2g3"},{src:"../img/check4.jpg",num:"e4ge"},{src:"../img/check5.jpg",num:"bayp"},{src:"../img/check6.jpg",num:"8cne"},{src:"../img/check7.jpg",num:"fabp"},{src:"../img/check8.jpg",num:"3dy8"},{src:"../img/check9.jpg",num:"d7ew"},{src:"../img/check10.jpg",num:"gc7f"},{src:"../img/check11.jpg",num:"cgan"},{src:"../img/check12.jpg",num:"ay3c"},{src:"../img/check13.jpg",num:"f7c6"},{src:"../img/check14.jpg",num:"63ed"},{src:"../img/check15.jpg",num:"pmnb"}];
	//验证码里面的数字
	var check_code=obj[0].num;
	console.log(check_code);
	
	
	//验证码的切换
	var $verify=$(".verify");
	var $btn=$(".verify-box .checked_btn");
	//图片
	var $btn_img=$(".checked_btn img");
	
	$btn_img.on("click",function(){
		//随机换图片
		var random=parseInt(Math.random()*15);
		//设置图片的属性来源
		$(this).attr("src",obj[random].src);
		//保存验证码里面的num
		check_code=obj[random].num;
		//console.log(check_code);
	})
	
	//最右边按钮点击进行切换图片
	var $change=$(".change");
	$change.on("click",function(){
		
		var random=parseInt(Math.random()*15);
		//设置图片的属性来源
		$btn_img.attr("src",obj[random].src);
		//保存验证码里面的num
		check_code=obj[random].num;
	})
})