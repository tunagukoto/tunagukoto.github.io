$(document).ready(function() {
  $(function() {
    $('.post-contents-block .post-block-in__inner').matchHeight();
  });
  //newsページの上部のgray背景
  function news_top_gray_bg() {
    var news_top_h = $(".contents-row").height();
    if(news_top_h <= 800){
      $(".news-top-area").css('min-height', news_top_h + 'px');
    }else{
      $(".news-top-area").css('min-height','800px');
    }
  };
  news_top_gray_bg();

  //もっとみるボタンで要素出現
  $(function() {
    $(".display-none").hide();
    $(".display-more a.display-more-btn").on('click',function(){
      $(this).prev(".display-group").children(".display-block").hide();
      $(this).prev(".display-group").children(".display-none").fadeIn();
      $(this).hide();
      $(this).prev(".display-group").css("margin-bottom" , "130px");
    });
  });
  $(function() {
    // SPメニューアコーディオン
    $(".sp_accordion").each(function() {
      var accordion = $(this);
      $(this).find(".sp_switch").click(function() {
        //$("> .switch", this).click(function() { // 上段の別の書き方
        var targetContentWrap = $(this).next(".sp_contentWrap");
        if ( targetContentWrap.css("display") === "none" ) {
          accordion.find(".sp_contentWrap").slideUp();
          accordion.find(".sp_switch.open").removeClass("open");
        }
        targetContentWrap.slideToggle();
        $(this).toggleClass("open");
      });
    });
  });
  $(function() {
    // アコーディオン
    $(".accordion").each(function() {
      var accordion = $(this);
      $(this).find(".switch").click(function() {
        //$("> .switch", this).click(function() { // 上段の別の書き方
        var targetContentWrap = $(this).next(".contentWrap");
        if ( targetContentWrap.css("display") === "none" ) {
          accordion.find(".contentWrap").slideUp();
          accordion.find(".switch.open").removeClass("open");
        }
        targetContentWrap.slideToggle();
        $(this).toggleClass("open");
      });
    });
  });
  //SNS シェアボタンモーダル
    $('.modal_wrap input[name="sns-check"]').change(function() {
      if ( $(this).is(':checked') ){
        $('.fixed-sns-btn-list').addClass('fixed-sns-open');
        $('.open_button').addClass('sns-close_button');
      }else{
        $('.fixed-sns-btn-list').removeClass('fixed-sns-open');
        $('.open_button').removeClass('sns-close_button');
      }
    });

  ////youtube Modal
  $(function() {
    $(".js-modal-btn").modalVideo();
  });
  //スクロールしたらヘッダーにclass付与
  $(function() {
    var c = $(".container-header");
    var s = $("header");
    var sns_btn = $(".sns-btn-group");
    $(window).scroll(function() {
      if ($(this).scrollTop() > 10) {
        c.addClass("scrolled-header");
        s.addClass("scrolled");
        sns_btn.addClass("scrolled-sns");
      } else {
        c.removeClass("scrolled-header");
        s.removeClass("scrolled");
        sns_btn.removeClass("scrolled-sns");
      }
    });
  });
  //SP用ハンバーガーメニュー
  $(document).on("click", ".js-hamburger", function() {
    var topscroll = $(window).scrollTop() * -1 + "px";
    var result = $("body").hasClass("scroll-prevent");
    //body.css('top' , scrollnum );
    if (result) {
      var toppos = $(".scroll-prevent").offset().top * -1;
    } else {
      $("body").css("top", topscroll);
    }
    $("body").toggleClass("nav-open");
    $("body").toggleClass("scroll-prevent");
    $(window).scrollTop(toppos);
  });
  //メガメニュー
  function morphDropdown(element) {
    this.element = element;
    this.mainNavigation = this.element.find(".main-nav");
    this.mainNavigationItems = this.mainNavigation.find(".has-dropdown");
    this.dropdownList = this.element.find(".dropdown-list");
    this.dropdownWrappers = this.dropdownList.find(".dropdown");
    this.dropdownItems = this.dropdownList.find(".content");
    this.dropdownBg = this.dropdownList.find(".bg-layer");
    this.mq = this.checkMq();
    this.bindEvents();
  }
  morphDropdown.prototype.checkMq = function() {
    //check screen size
    var self = this;
    return window
      .getComputedStyle(self.element.get(0), "::before")
      .getPropertyValue("content")
      .replace(/'/g, "")
      .replace(/"/g, "")
      .split(", ");
  };
  morphDropdown.prototype.bindEvents = function() {
    var self = this;
    this.mainNavigationItems
      .mouseenter(function(event) {
        self.showDropdown($(this));
      })
      .mouseleave(function() {
        setTimeout(function() {
          if (
            self.mainNavigation.find(".has-dropdown:hover").length == 0 &&
            self.element.find(".dropdown-list:hover").length == 0
          )
            self.hideDropdown();
        }, 50);
      });
    //クリックでオープン クリックでクローズ
    /*
		this.mainNavigationItems.click(function(event){
			if($(this).hasClass("active")){
				self.hideDropdown();
				$('#body-overlay').fadeOut();
			}else{
				self.showDropdown($(this));
				$('#body-overlay').fadeIn();
			}
		})
		*/
    //ドロップダウンメニューからマウスを外すとドロップダウンメニューが消える
    this.dropdownList.mouseleave(function() {
      setTimeout(function() {
        self.mainNavigation.find(".has-dropdown:hover").length == 0 &&
          self.element.find(".dropdown-list:hover").length == 0 &&
          self.hideDropdown();
      }, 50);
    });
    //click on an item in the main navigation -> open a dropdown on a touch device
    this.mainNavigationItems.on("touchstart", function(event) {
      var selectedDropdown = self.dropdownList.find(
        "#" + $(this).data("content")
      );
      if (
        !self.element.hasClass("is-dropdown-visible") ||
        !selectedDropdown.hasClass("active")
      ) {
        event.preventDefault();
        self.showDropdown($(this));
      }
    });
    //on small screens, open navigation clicking on the menu icon
    this.element.on("click", ".nav-trigger", function(event) {
      event.preventDefault();
      self.element.toggleClass("nav-open");
    });
  };
  morphDropdown.prototype.showDropdown = function(item) {
    this.mq = this.checkMq();
    if (this.mq == "desktop") {
      var self = this;
      var selectedDropdown = this.dropdownList.find("#" + item.data("content")),
        selectedDropdownHeight = selectedDropdown.innerHeight(),
        selectedDropdownWidth = selectedDropdown
          .children(".content")
          .innerWidth(),
        selectedDropdownLeft =
          item.offset().left +
          item.innerWidth() / 2 -
          selectedDropdownWidth / 2;
      //update dropdown position and size
      this.updateDropdown(
        selectedDropdown,
        parseInt(selectedDropdownHeight),
        selectedDropdownWidth,
        parseInt(selectedDropdownLeft)
      );
      //add active class to the proper dropdown item
      this.element.find(".active").removeClass("active");
      selectedDropdown
        .addClass("active")
        .removeClass("move-left move-right")
        .prevAll()
        .addClass("move-left")
        .end()
        .nextAll()
        .addClass("move-right");
      item.addClass("active");
      //show the dropdown wrapper if not visible yet
      if (!this.element.hasClass("is-dropdown-visible")) {
        setTimeout(function() {
          self.element.addClass("is-dropdown-visible");
        }, 0);
      }
    }
    $("#body-overlay").fadeIn();
  };
  morphDropdown.prototype.updateDropdown = function(
    dropdownItem,
    height,
    width,
    left
  ) {
    this.dropdownList.css({
      "-moz-transform": "translateX(0px)",
      "-webkit-transform": "translateX(0px)",
      "-ms-transform": "translateX(0px)",
      "-o-transform": "translateX(0px)",
      transform: "translateX(0px)",
      width: "100%",
      height: height + "px"
    });
    this.dropdownBg.css({
      "-moz-transform": "scaleX(100%) scaleY(100%)",
      "-webkit-transform": "scaleX(100%) scaleY(100%)",
      "-ms-transform": "scaleX(100%) scaleY(100%)",
      "-o-transform": "scaleX(100%) scaleY(100%)",
      transform: "scaleX(100%) scaleY(100%)"
    });
  };
  morphDropdown.prototype.hideDropdown = function() {
    this.mq = this.checkMq();
    if (this.mq == "desktop") {
      this.element
        .removeClass("is-dropdown-visible")
        .find(".active")
        .removeClass("active")
        .end()
        .find(".move-left")
        .removeClass("move-left")
        .end()
        .find(".move-right")
        .removeClass("move-right");
    }
    $("#body-overlay").fadeOut();
  };
  morphDropdown.prototype.resetDropdown = function() {
    this.mq = this.checkMq();
    if (this.mq == "mobile") {
      this.dropdownList.removeAttr("style");
    }
  };
  var morphDropdowns = [];
  if ($(".cd-morph-dropdown").length > 0) {
    $(".cd-morph-dropdown").each(function() {
      //create a morphDropdown object for each .cd-morph-dropdown
      morphDropdowns.push(new morphDropdown($(this)));
    });
    var resizing = false;
    //on resize, reset dropdown style property
    updateDropdownPosition();
    $(window).on("resize", function() {
      if (!resizing) {
        resizing = true;
        !window.requestAnimationFrame
          ? setTimeout(updateDropdownPosition, 300)
          : window.requestAnimationFrame(updateDropdownPosition);
      }
    });
    function updateDropdownPosition() {
      morphDropdowns.forEach(function(element) {
        element.resetDropdown();
      });
      resizing = false;
    }
  }
  //How To Enjoy ホバーで背景変更
  $(function() {
    var giveName;
    $(".ht-e-layout02 div").mouseover(function(){
      $(this).addClass("ht-items-active");
      //.ht-activeを付与
      $('.ht-change-bg').addClass("ht-active");
      $data = $(this).data('item');
      giveName = "ht-b-" + $data;
      $('.ht-change-bg').addClass(giveName);
      /*
      setTimeout(function(){
        $('.ht-change-bg').addClass(giveName);
      },300);
      */
    $(".ht-overlay").addClass('ht-overlay-active');
    }).mouseout(function(){
      //.ht-activeを取る
      $('.ht-change-bg').removeClass("ht-active");
      $('.ht-change-bg').removeClass(giveName);
      $(".ht-overlay").removeClass('ht-overlay-active');
      $(this).removeClass("ht-items-active");
    });
  });
  //#で始まるページ内アンカーリンク
  $('a[href^="#"]').click(function() {
    var speed = 400;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - 100;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
  //▼別ページからの遷移時にスムーススクロール（?id=で指定）
	$(window).on('load', function() {
    var headerHeight = 100;
	  var url = $(location).attr('href');
	  if(url.indexOf("?id=") != -1){
	    var id = url.split("?id=");
	    var $target = $('#' + id[id.length - 1]);
	    if($target.length){
	      var pos = $target.offset().top-headerHeight;
	      $("html, body").animate({scrollTop:pos}, 400);
	    }
	  }
  });
  




});





