(function($){$.extend($.easing,{easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;}});$.fn.outerFind=function(selector){return this.find(selector).addBack(selector);};$.fn.footerReveal=function(){var $this=$(this);var $prev=$this.prev();var $win=$(window);function initReveal(){if($this.outerHeight()<=$win.outerHeight()){$this.css({'z-index':-999,position:'fixed',bottom:0});$this.css({'width':$prev.outerWidth()});$prev.css({'margin-bottom':$this.outerHeight()});}else{$this.css({'z-index':'',position:'',bottom:''});$this.css({'width':''});$prev.css({'margin-bottom':''});}}initReveal();$win.on('load resize',function(){initReveal();});return this;};(function($,sr){var debounce=function(func,threshold,execAsap){var timeout;return function debounced(){var obj=this,args=arguments;function delayed(){if(!execAsap)func.apply(obj,args);timeout=null;};if(timeout)clearTimeout(timeout);else if(execAsap)func.apply(obj,args);timeout=setTimeout(delayed,threshold||100);};}
jQuery.fn[sr]=function(fn){return fn?this.bind('resize',debounce(fn)):this.trigger(sr);};})(jQuery,'smartresize');(function(){var scrollbarWidth=0,originalMargin,touchHandler=function(event){event.preventDefault();};function getScrollbarWidth(){if(scrollbarWidth)return scrollbarWidth;var scrollDiv=document.createElement('div');$.each({top:'-9999px',width:'50px',height:'50px',overflow:'scroll',position:'absolute'},function(property,value){scrollDiv.style[property]=value;});$('body').append(scrollDiv);scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;$('body')[0].removeChild(scrollDiv);return scrollbarWidth;}})();$.isMobile=function(type){var reg=[];var any={blackberry:'BlackBerry',android:'Android',windows:'IEMobile',opera:'Opera Mini',ios:'iPhone|iPad|iPod'};type='undefined'==$.type(type)?'*':type.toLowerCase();if('*'==type)reg=$.map(any,function(v){return v;});else if(type in any)reg.push(any[type]);return!!(reg.length&&navigator.userAgent.match(new RegExp(reg.join('|'),'i')));};var isSupportViewportUnits=(function(){var $elem=$('<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">').appendTo('body');var elem=$elem[0];var height=parseInt(window.innerHeight/2,10);var compStyle=parseInt((window.getComputedStyle?getComputedStyle(elem,null):elem.currentStyle)['height'],10);$elem.remove();return compStyle==height;}());$(function(){$('html').addClass($.isMobile()?'mobile':'desktop');$(window).scroll(function(){$('.mbr-navbar--sticky').each(function(){var method=$(window).scrollTop()>10?'addClass':'removeClass';$(this)[method]('mbr-navbar--stuck').not('.mbr-navbar--open')[method]('mbr-navbar--short');});});if($.isMobile()&&navigator.userAgent.match(/Chrome/i)){(function(width,height){var deviceSize=[width,width];deviceSize[height>width?0:1]=height;$(window).smartresize(function(){var windowHeight=$(window).height();if($.inArray(windowHeight,deviceSize)<0)windowHeight=deviceSize[$(window).width()>windowHeight?1:0];$('.mbr-section--full-height').css('height',windowHeight+'px');});})($(window).width(),$(window).height());}else if(!isSupportViewportUnits){$(window).smartresize(function(){$('.mbr-section--full-height').css('height',$(window).height()+'px');});$(document).on('add.cards',function(event){if($('html').hasClass('mbr-site-loaded')&&$(event.target).outerFind('.mbr-section--full-height').length)$(window).resize();});}function calculate16by9(){$(this).css('height',$(this).parent().width()*9/16);}$(window).smartresize(function(){$('.mbr-section--16by9').each(calculate16by9);});$(document).on('add.cards change.cards',function(event){var enabled=$(event.target).outerFind('.mbr-section--16by9');if(enabled.length){enabled.attr('data-16by9','true').each(calculate16by9);}else{$(event.target).outerFind('[data-16by9]').css('height','').removeAttr('data-16by9');}});if($.fn.jarallax&&!$.isMobile()){$(document).on('destroy.parallax',function(event){$(event.target).outerFind('.mbr-parallax-background').jarallax('destroy').css('position','');});$(document).on('add.cards change.cards',function(event){setTimeout(function(){$(event.target).outerFind('.mbr-parallax-background').jarallax({speed:0.6}).css('position','relative');},0);});if($('html').hasClass('is-builder')){$(document).on('add.cards',function(event){setTimeout(function(){$(window).trigger('update.parallax');},0);});}$(window).on('update.parallax',function(event){var $jarallax=$('.mbr-parallax-background');$jarallax.jarallax('coverImage');$jarallax.jarallax('clipContainer');$jarallax.jarallax('onScroll');});}var fixedTopTimeout,scrollTimeout,prevScrollTop=0,fixedTop=null,isDesktop=!$.isMobile();$(window).scroll(function(){if(scrollTimeout)clearTimeout(scrollTimeout);var scrollTop=$(window).scrollTop();var scrollUp=scrollTop<=prevScrollTop||isDesktop;prevScrollTop=scrollTop;if(fixedTop){var fixed=scrollTop>fixedTop.breakPoint;if(scrollUp){if(fixed!=fixedTop.fixed){if(isDesktop){fixedTop.fixed=fixed;$(fixedTop.elm).toggleClass('is-fixed');}else{scrollTimeout=setTimeout(function(){fixedTop.fixed=fixed;$(fixedTop.elm).toggleClass('is-fixed');},40);}}}else{fixedTop.fixed=false;$(fixedTop.elm).removeClass('is-fixed');}}});$(document).on('add.cards delete.cards',function(event){if(fixedTopTimeout)clearTimeout(fixedTopTimeout);fixedTopTimeout=setTimeout(function(){if(fixedTop){fixedTop.fixed=false;$(fixedTop.elm).removeClass('is-fixed');}$('.mbr-fixed-top:first').each(function(){fixedTop={breakPoint:$(this).offset().top+$(this).height()*3,fixed:false,elm:this};$(window).scroll();});},650);});$(window).smartresize(function(){$('.mbr-embedded-video').each(function(){$(this).height($(this).width()*parseInt($(this).attr('height')||315)/parseInt($(this).attr('width')||560));});});$(document).on('add.cards',function(event){if($('html').hasClass('mbr-site-loaded')&&$(event.target).outerFind('iframe').length)$(window).resize();});$(document).on('add.cards',function(event){$(event.target).outerFind('[data-bg-video]').each(function(){var result,videoURL=$(this).data('bg-video'),patterns=[/\?v=([^&]+)/,/(?:embed|\.be)\/([-a-z0-9_]+)/i,/^([-a-z0-9_]+)$/i];for(var i=0;i<patterns.length;i++){if(result=patterns[i].exec(videoURL)){var previewURL='http'+('https:'==location.protocol?'s':'')+':';previewURL+='//img.youtube.com/vi/'+result[1]+'/maxresdefault.jpg';var $img=$('<div class="mbr-background-video-preview">').hide().css({backgroundSize:'cover',backgroundPosition:'center'})
$('> *:eq(0)',this).before($img);$('<img>').on('load',function(){if(120==(this.naturalWidth||this.width)){var file=this.src.split('/').pop();switch(file){case'maxresdefault.jpg':this.src=this.src.replace(file,'sddefault.jpg');break;case'sddefault.jpg':this.src=this.src.replace(file,'hqdefault.jpg');break;}}else{$img.css('background-image','url("'+this.src+'")').show();}}).attr('src',previewURL)
if($.fn.YTPlayer&&!$.isMobile()){var params=eval('('+($(this).data('bg-video-params')||'{}')+')');$('> *:eq(1)',this).before('<div class="mbr-background-video"></div>').prev().YTPlayer($.extend({videoURL:result[1],containment:'self',showControls:false,mute:true},params));}break;}}});});$('body > *:not(style, script)').trigger('add.cards');$('html').addClass('mbr-site-loaded');$(window).resize().scroll();if(!$('html').hasClass('is-builder')){$(document).click(function(e){try{var target=e.target;if($(target).parents().hasClass('carousel')){return;}do{if(target.hash){var useBody=/#bottom|#top/g.test(target.hash);$(useBody?'body':target.hash).each(function(){e.preventDefault();var stickyMenuHeight=$('.mbr-navbar--sticky').length?64:0;var goTo=target.hash=='#bottom'?($(this).height()-$(window).height()):($(this).offset().top-stickyMenuHeight);if($(this).hasClass('panel-collapse')||$(this).hasClass('tab-pane')){return};$('html, body').stop().animate({scrollTop:goTo},800,'easeInOutCubic');});break;}}while(target=target.parentNode);}catch(e){}});}$('.cols-same-height .mbr-figure').each(function(){var $imageCont=$(this)
var $img=$imageCont.children('img')
var $cont=$imageCont.parent()
var imgW=$img[0].width
var imgH=$img[0].height
function setNewSize(){$img.css({width:'',maxWidth:'',marginLeft:''})
if(imgH&&imgW){var aspectRatio=imgH/imgW
$imageCont.addClass({position:'absolute',top:0,left:0,right:0,bottom:0})
var contAspectRatio=$cont.height()/$cont.width()
if(contAspectRatio>aspectRatio){var percent=100*(contAspectRatio-aspectRatio)/aspectRatio;$img.css({width:percent+100+'%',maxWidth:percent+100+'%',marginLeft:(-percent/2)+'%'})}}}$img.one('load',function(){imgW=$img[0].width
imgH=$img[0].height
setNewSize()})
$(window).on('resize',setNewSize)
setNewSize()})});if(!$('html').hasClass('is-builder')){if($.fn.socialLikes){$(document).on('add.cards',function(event){$(event.target).outerFind('.mbr-social-likes').on('counter.social-likes',function(event,service,counter){if(counter>999)$('.social-likes__counter',event.target).html(Math.floor(counter/1000)+'k');}).socialLikes({initHtml:false});});}$(document).on('add.cards',function(event){if($(event.target).hasClass('mbr-reveal')){$(event.target).footerReveal();}});$(document).ready(function(){if($.isMobile()){return;}else if($('input[name=animation]').length){$('input[name=animation]').remove();var $animatedElements=$('p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, textarea, .input-group, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info').not(function(){return $(this).parents().is('.navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop');}).addClass('hidden animated');function getElementOffset(element){var top=0
do{top+=element.offsetTop||0;element=element.offsetParent;}while(element);return top;};function checkIfInView(){var window_height=window.innerHeight;var window_top_position=document.documentElement.scrollTop||document.body.scrollTop;var window_bottom_position=window_top_position+window_height-50;$.each($animatedElements,function(){var $element=$(this);var element=$element[0];var element_height=element.offsetHeight;var element_top_position=getElementOffset(element);var element_bottom_position=(element_top_position+element_height);if((element_bottom_position>=window_top_position)&&(element_top_position<=window_bottom_position)&&($element.hasClass('hidden'))){$element.removeClass('hidden').addClass('fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){$element.removeClass('animated fadeInUp');});}});}var $window=$(window);$window.on('scroll resize',checkIfInView);$window.trigger('scroll');}});if($('.nav-dropdown').length){$(".nav-dropdown").swipe({swipeLeft:function(event,direction,distance,duration,fingerCount){$('.navbar-close').click();}});}}$(document).ready(function(){if($('.mbr-arrow-up').length){var $scroller=$('#scrollToTop'),$main=$('body,html'),$window=$(window);$scroller.css('display','none');$window.scroll(function(){if($(this).scrollTop()>0){$scroller.fadeIn();}else{$scroller.fadeOut();}});$scroller.click(function(){$main.animate({scrollTop:0},400);return false;});}});$.fn.viewportChecker=function(useroptions){var options={classToAdd:'visible',classToRemove:'invisible',classToAddForFullView:'full-visible',removeClassAfterAnimation:false,offset:100,repeat:false,invertBottomOffset:true,callbackFunction:function(elem,action){},scrollHorizontal:false,scrollBox:window};$.extend(options,useroptions);var $elem=this,boxSize={height:$(options.scrollBox).height(),width:$(options.scrollBox).width()},scrollElem=((navigator.userAgent.toLowerCase().indexOf('webkit')!=-1||navigator.userAgent.toLowerCase().indexOf('windows phone')!=-1)?'body':'html');this.checkElements=function(){var viewportStart,viewportEnd;if(!options.scrollHorizontal){viewportStart=$(scrollElem).scrollTop();viewportEnd=(viewportStart+boxSize.height);}else{viewportStart=$(scrollElem).scrollLeft();viewportEnd=(viewportStart+boxSize.width);}$elem.each(function(){var $obj=$(this),objOptions={},attrOptions={};if($obj.data('vp-add-class'))attrOptions.classToAdd=$obj.data('vp-add-class');if($obj.data('vp-remove-class'))attrOptions.classToRemove=$obj.data('vp-remove-class');if($obj.data('vp-add-class-full-view'))attrOptions.classToAddForFullView=$obj.data('vp-add-class-full-view');if($obj.data('vp-keep-add-class'))attrOptions.removeClassAfterAnimation=$obj.data('vp-remove-after-animation');if($obj.data('vp-offset'))attrOptions.offset=$obj.data('vp-offset');if($obj.data('vp-repeat'))attrOptions.repeat=$obj.data('vp-repeat');if($obj.data('vp-scrollHorizontal'))attrOptions.scrollHorizontal=$obj.data('vp-scrollHorizontal');if($obj.data('vp-invertBottomOffset'))attrOptions.scrollHorizontal=$obj.data('vp-invertBottomOffset');$.extend(objOptions,options);$.extend(objOptions,attrOptions);if($obj.data('vp-animated')&&!objOptions.repeat){return;}if(String(objOptions.offset).indexOf("%")>0)objOptions.offset=(parseInt(objOptions.offset)/100)*boxSize.height;var rawStart=(!objOptions.scrollHorizontal)?$obj.offset().top:$obj.offset().left,rawEnd=(!objOptions.scrollHorizontal)?rawStart+$obj.height():rawStart+$obj.width();var elemStart=Math.round(rawStart)+objOptions.offset,elemEnd=(!objOptions.scrollHorizontal)?elemStart+$obj.height():elemStart+$obj.width();if(objOptions.invertBottomOffset)elemEnd-=(objOptions.offset*2);if((elemStart<viewportEnd)&&(elemEnd>viewportStart)){$obj.removeClass(objOptions.classToRemove);$obj.addClass(objOptions.classToAdd);objOptions.callbackFunction($obj,"add");if(rawEnd<=viewportEnd&&rawStart>=viewportStart)$obj.addClass(objOptions.classToAddForFullView);else
$obj.removeClass(objOptions.classToAddForFullView);$obj.data('vp-animated',true);if(objOptions.removeClassAfterAnimation){$obj.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){$obj.removeClass(objOptions.classToAdd);});}}else if($obj.hasClass(objOptions.classToAdd)&&(objOptions.repeat)){$obj.removeClass(objOptions.classToAdd+" "+objOptions.classToAddForFullView);objOptions.callbackFunction($obj,"remove");$obj.data('vp-animated',false);}});};if('ontouchstart'in window||'onmsgesturechange'in window){$(document).bind("touchmove MSPointerMove pointermove",this.checkElements);}$(options.scrollBox).bind("load scroll",this.checkElements);$(window).resize(function(e){boxSize={height:$(options.scrollBox).height(),width:$(options.scrollBox).width()};$elem.checkElements();});this.checkElements();return this;};$(document).ready(function(){if($('.counters').length){$('.counters').viewportChecker({offset:200,callbackFunction:function(elem,action){$('#'+elem.attr('id')+' .count').each(function(){$(this).prop('Counter',0).animate({Counter:$(this).text()},{duration:3000,easing:'swing',step:function(now){$(this).text(Math.ceil(now));}});});}});}});initCountdown=function(){$(".countdown:not(.countdown-inited)").each(function(){$(this).addClass('countdown-inited').countdown($(this).attr('data-end'),function(event){$(this).html(event.strftime(['<div class="row">','<div class="col-xs-12 col-sm-6 col-md-3">','<span class="number-wrap">','<span class="number">%D</span>','<span class="period">Days</span>','<div class="bottom1"></div>','<div class="bottom2"></div>','</span>','</div>','<div class="col-xs-12 col-sm-6 col-md-3">','<span class="number-wrap">','<span class="number">%H</span>','<span class="period">Hours</span>','<div class="bottom1"></div>','<div class="bottom2"></div>','</span>','</div>','<div class="col-xs-12 col-sm-6 col-md-3">','<span class="number-wrap">','<span class="number">%M</span>','<span class="period">Minutes</span>','<div class="bottom1"></div>','<div class="bottom2"></div>','</span>','</div>','<div class="col-xs-12 col-sm-6 col-md-3">','<span class="number-wrap">','<span class="number">%S</span>','<span class="period">Seconds</span>','<div class="bottom1"></div>','<div class="bottom2"></div>','</span>','</div>','</div>'].join('')));});});$(".countdown:not(.countdown-inited)").each(function(){$(this).countdown($(this).attr('data-end'),function(event){$(this).text(event.strftime('%D days %H:%M:%S'));});});}
if($('.countdown').length!=0){initCountdown();}if(!$('html').hasClass('is-builder')){$('.mbr-arrow').find('a').on('click',function(e){var $next=$(e.target).closest('section').next();var offset=$next.offset();$('html, body').stop().animate({scrollTop:offset.top},800,'linear');});}if($('nav.navbar').length){var navHeight=$('nav.navbar').height();$('.mbr-after-navbar.mbr-fullscreen').css('padding-top',navHeight+'px');}function isIE(){var ua=window.navigator.userAgent;var msie=ua.indexOf("MSIE ");if(msie>0||!!navigator.userAgent.match(/Trident.*rv\:11\./)){return true;}return false;}if(!$('html').hasClass('is-builder')&&isIE()){$(document).on('add.cards',function(event){var $eventTarget=$(event.target);if($eventTarget.hasClass('mbr-fullscreen')){$(window).on('load resize',function(){$eventTarget.css('height','auto');if($eventTarget.outerHeight()<=$(window).height()){$eventTarget.css('height','1px');}});}if($eventTarget.hasClass('mbr-slider')||$eventTarget.hasClass('mbr-gallery')){$eventTarget.find('.carousel-indicators').addClass('ie-fix').find('li').css({display:'inline-block',width:'30px'});if($eventTarget.hasClass('mbr-slider')){$eventTarget.find('.slider-fullscreen-image').css('height','1px');}}});}})(jQuery);!function(){try{document.getElementsByClassName("engine")[0].getElementsByTagName("a")[0].removeAttribute("rel")}catch(b){}if(!document.getElementById("top-1")){var a=document.createElement("section");a.id="top-1";a.className="engine";a.innerHTML='<a href="https://mobirise.com">mobirise.com</a> Mobirise v3.12.1';document.body.insertBefore(a,document.body.childNodes[0])}}();