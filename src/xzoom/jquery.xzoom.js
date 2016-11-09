;(function($){
	$.fn.xzoom = function(options){
		// 插件默认参数
		var defaults = {
			width:300,
			height:300,
			gap:30,
			position:'right'
		};

		// 扩展默认值
		var opt = $.extend({},defaults,options);

		// 防止多个jQuery对象
		this.each(function(){
			var $self = $(this);

			// 全局变量
			var $big,//大图外框
				$bigImg,//大图
				$min,//放大镜
				ratio;//大图与小图的比例

			var $smallImg = $('img',$self);

			// 如果没有data-big属性，则直接使用小图的src属性
			var bigUrl = $smallImg.attr('data-big') || $smallImg.attr('src');

			// 执行初始化操作
			$smallImg.load(function(){
				init();
			});

			// 鼠标移入事件
			$self.on('mouseenter',function(e){
				
				$big.appendTo('body');

				// 把放大镜写入$self
				$min.css({
					width:opt.width/ratio,
					height:opt.height/ratio,
				}).appendTo($self);

				// 设置$min的位置
				// pageX = clientX + scrollLeft
				// pageY = clientY + scrollTop
				
			}).on('mouseleave',function(){
				$big.remove();
				$min.remove();
			}).on('mousemove',function(e){
				var top = e.pageY - $smallImg.offset().top - $min.outerHeight()/2;
				var left = e.pageX - $smallImg.offset().left - $min.outerWidth()/2;

				// 防止放大镜移出小图区域
				if(left<0){
					left = 0;
				}else if(left > $smallImg.outerWidth() - $min.outerWidth()){
					left = $smallImg.outerWidth() - $min.outerWidth();
				}

				if(top < 0 ){
					top = 0;
				}else if(top > $smallImg.outerHeight() - $min.outerHeight()){
					top = $smallImg.outerHeight() - $min.outerHeight();
				}

				$min.css({
					top:top,
					left:left
				});


				// 移动大图
				// console.log($bigImg,ratio)
				$bigImg.css({
					top:-top*ratio,
					left:-left*ratio
				})
			})

			// 初始化
			function init(){
				// 添加全局类名xzoom
				$self.addClass('xzoom').width($smallImg.outerWidth());

				// 创建大图
				$big = $('<div/>').addClass('xzoom-big');
				$bigImg = $('<img/>').attr({src:bigUrl});

				// 把大图写入页面
				$big.append($bigImg).appendTo('body');

				$bigImg.load(function(){
					ratio = $bigImg.outerWidth()/$smallImg.outerWidth();
					$big.remove();
				});

				// 把大图默认显示在右边
				var pos = {
						left:$smallImg.offset().left + $smallImg.outerWidth() + opt.gap,
						top:$smallImg.offset().top
					}
				if(opt.position == 'bottom'){
					pos.left = $smallImg.offset().left;
					pos.top = $smallImg.offset().top + $smallImg.outerHeight() + opt.gap;
				}else if(opt.position == 'left'){
					pos.left = $smallImg.offset().left - $big.outerWidth() - opt.gap;
				}
				$big.css(pos);

				// 创建放大镜
				$min = $('<span/>').addClass('xzoom-min');
			}
		});


		// 返回this，以便链式调用
		return this;
	}
})(jQuery);