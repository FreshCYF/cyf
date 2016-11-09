;(function($){
	$.fn.xcarousel = function(options){
		// 默认参数
		var defaults = {
			width:810,
			height:320,
			page:true,//是否显示页码
			autoPlay:true,//是否自动轮播
			type:'y',//动画类型：水平滚动x, 垂直滚动y, 渐现效果fade
			buttons:true,//是否显示前后按钮
			speed:3000,//轮播图速度
		}
		var opt = $.extend({},defaults,options);

		// 考虑this为多个元素的情况
		// 这里的this表示实例（jquery选择器得到的对象）
		this.each(function(){
			// 轮播图外框
			// 这里的this表示每一个dom节点元素
			var $self = $(this);

			// 获取当前对象下的ul
			// this.find('ul');
			var $ul = $('ul',$self);
			//图片添加一倍 , 实现无缝播放
			$ul.append($ul.html());
			var $firstImg = $ul.find('img').eq(0);
			var imgHeight,imgWidth;

			// 保证图片加载成功后才执行
			/*$firstImg.load(function(){
				imgHeight = $firstImg.height();
				imgWidth = $firstImg.width();

				// 设定外框的高度
				$self.css({
					height:imgHeight,
					width:imgWidth
				});
			});*/


			// 初始化
			var index = 0;
			var len = $ul.children().length;
			var $page;

			init();
			


			// 定时器：每个3s切换一张图片
			if(opt.autoPlay){
				var timer;

				// 鼠标移入移出
				$self.on('mouseenter',function(){
					clearInterval(timer);
				}).on('mouseleave',function(){
					timer = setInterval(function(){
						index++;
						showPic();
					},opt.speed);
				})

				// 模拟事件（手动触发一个事件）
				.trigger('mouseleave');
			}
			
			// 初始化
			function init(){
				// 生成页码
				if(opt.page){
					$page = $('<div/>').addClass('page');
					for(var i=1;i<=len/2;i++){
						var $span = $('<span/>');
						if(i==1){
							$span.addClass('active');
						}
						$span.appendTo($page);
					}
					$page.appendTo($self);

					// 点击页码切换
					$page.on('click','span',function(){
						index = $(this).index();
						showPic();
					});
				}

				// 设置样式
				$self.addClass('xcarousel').css({
					height:opt.height,
					width:opt.width
				});
				$ul.css({height:opt.height});

				// 水平移动，需要设置ul的宽度
				if(opt.type === 'x'){
					$ul.addClass('type-x').css({width:opt.width*len});
				}else if(opt.type === 'fade'){
					$ul.addClass('type-fade').children().css({opacity:0}).eq(index).css({opacity:1});
				}
				

				// 左右按钮
				if(opt.buttons){
					$('<div/>').html('&gt;').addClass('next').appendTo($self);
					$('<div/>').html('&lt;').addClass('previous').appendTo($self);
					$self.on('click','.next',function(){
						index++;
						showPic();
					}).on('click','.previous',function(){
						index--;
						showPic();
					});
				}
			}

			// 图片展示效果
			function showPic(){
				if(index > len / 2) { //当移动到  后来加上的第一张时  让index为第二张的索引  然后li移到 位置0 
						index = 1;
						$ul.css({
							left: 0,
							top: 0
						});
					} else if(index < 0) { //当移动到 最后一张(加上后)时   让index为最后一张的索引(加上之前) 然后移动到最后一张(加上之前)的位置 
						index = len / 2 - 1;
						if(opt.type === 'x') {
							$ul.css({
								left: opt.width * -len / 2
							});
						}
						if(opt.type === 'y') {
							$ul.css({
								top: opt.height * -len / 2
							});
						}

					}

				// console.log(imgHeight,index)
				if(opt.type === 'x'){
					$ul.animate({left:-opt.width*index});
				}else if(opt.type === 'y'){
					$ul.animate({top:-opt.height*index});
				}else if(opt.type === 'fade'){
					$ul.children().eq(index).animate({opacity:1}).siblings('li').animate({opacity:0});
				}
				

				// 页码高亮效果
				if(opt.page) {
						$page.children().removeClass().eq(index).addClass('active');
					}
				if(index == len / 2) {
					$page.children().removeClass().eq(0).addClass('active');
				}
			}
		})

		return this;
	}
	//$('.lbt').xcarousel()
})(jQuery);
