 		
 	//****************************canvas动画*********************************************
 	var COUNT = 200;//*****star
	  var masthead = document.querySelector('.masthead');
	  var canvas = document.createElement('canvas');
	  masthead.appendChild(canvas);
	  var ctx = canvas.getContext('2d');
	  var width = masthead.clientWidth;
	  var height = masthead.clientHeight;
	  var i = 0;
	  function onResize() {
	    width = masthead.clientWidth;
	    height = masthead.clientHeight;
	    canvas.width = width;
	    canvas.height = height;
	      requestAnimFrame(update);
	  }
	  var Star = function () {  //*********star构造函数**********
	    this.x = Math.random() * width;
	    this.y = Math.random() * height;
	    this.vy = Math.random()*0.05;
	    this.vx = Math.random()*0.05;
	    this.r = 1 + Math.random() *1;
	    this.o = 0.1 + Math.random() * 0.5;
	  }
	  var Liu=function(){     //************流星构造函数**************
	    this.x=800+Math.random()*700;
	    this.y=0;
	    this.vy=0.04;
	    this.vx=-0.04;
	    this.o=0.1 + Math.random() * 0.5;
	  }
	  liu=new Liu();
	  setInterval(function(){	//********每隔四秒实例化一次流星**************
	      if(liu.x>width||liu.y>height){
	          liu=null;
	      }
	      liu=new Liu();
	  },4000)
	  canvas.style.position = 'absolute';
	  canvas.style.left = canvas.style.top = '0';
	  var stars = [], star;
	  for (i = 0; i < COUNT; i++) {
	    star = new Star();
	    stars.push(star);
	  }
	  function update() {
	    ctx.clearRect(0, 0, width, height);
	    for (i = 0; i < COUNT; i++) {
	      star = stars[i];
	      star.y += star.vy;
	      star.x += star.vx;
	      if(i%2==0){	//********透明度控制
	        star.o+=0.01;
	        if(star.o>0.4){
	          star.o=0.1;
	        }
	      }
	      ctx.globalAlpha = star.o;//***********透明度变化
	      ctx.beginPath();
	      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, false);
	      ctx.closePath();
	      ctx.fillStyle = '#FFF';
	      ctx.fill();
	      if (star.y > height) {
	        new Star();
	      }
	      if (star.x > width) {
	        new Star();
	      }
	      if(liu){//**********流星移动
	        liu.x+=liu.vx;
	        liu.y+=liu.vy;
	        liu.o+=0.05;
	        if(liu.o>1){
	          liu.o=0.2;
	        }
	        ctx.beginPath();
	        ctx.moveTo(liu.x,liu.y);
	        ctx.lineTo(liu.x-90,liu.y+70);
	        ctx.closePath();
	        ctx.strokeWidth=1;
	        ctx.strokeStyle='rgba(255,255,255,0.1)';
	        ctx.globalAlpha = 0.1;
	        ctx.stroke();
	      }
	    }
	    requestAnimFrame(update);
	  }
	  window.requestAnimFrame = (function(){//*************循环执行
	    return  window.requestAnimationFrame       ||
	            window.webkitRequestAnimationFrame ||
	            window.mozRequestAnimationFrame    ||
	            function( callback ){
	              window.setTimeout(callback, 1000 / 60);
	            };
	  })();
	jQuery(function($){ 
		$.fn.onebyone = function() { //**********为jq原型对象添加onebyeone方法
			this.each(function() {
				var $ele = $(this), str = $ele.html(), index = 0;
				$ele.html('');
				var timer = setInterval(function() {
					var current = str.substr(index, 1);
					if (current == '<') {
						index = str.indexOf('>', index) + 1;
					} else {
						index++;
					}
					$ele.html(str.substring(0, index) + (index && 1 ? '_' : ''));
					if (index >= str.length) {
						clearInterval(timer);
					}
				}, 75);
			});
		return this;
	};
	var flag=false;
	$('.start').click(function(){
		var mySwiper = new Swiper ('.swiper-container', { //*****start按钮
		  onInit: function(swiper){
		    swiperAnimateCache(swiper); 
		    swiperAnimate(swiper); 
		  }, 
		  onSlideChangeEnd: function(swiper){ 
		    swiperAnimate(swiper);
		  } 
		})
		$('#mymusic').get(0).play(); //******音乐控制
		setTimeout(function(){
			$('.velas').show();
			$('.velas').css('opacity','1');
		},2000);
		setTimeout(function(){
			$('.birthday .container').css('opacity','1');
		},4000);
		setTimeout(function(){
			$('#box').css('visibility','visible');
			$('#box').show();
			$('#box').onebyone();
			onResize();
		},8000);
		setTimeout(function(){
			$('.title').show();
			$('.title').css('left','40%');
		},12000);
	})
});