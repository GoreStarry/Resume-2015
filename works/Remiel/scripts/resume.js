/**
* @author      Taylor Wang  <sunrise91.t3@gmail.com>
* @copyright   Copyright (c) 2015 Taylor Wang Design
*/

$(function () {

    var preloadlist = ["./images/p34.jpg"];

    var browserPass = false,
        nowPage = 0,
        loadingState = false,
        $article = $("article"),
        $runPage = $article.find(".page"),
        lastPage = ($runPage.length) - 1,
        vw = window.innerWidth,
        vh = window.innerHeight,
        screenState = vw > vh ? "land" : "port";



    deviceDetect();


    //啟動倒數--------------

    $(window).load(function () {
        loadingState = true;
        $.preload(preloadlist);
    });

    var cTime = 5;//倒數秒數
    $('.opBoxBR').addClass('starBR');
    $('.opBoxBL').addClass('starBL');
    $('.whitelineL').addClass('rowLine');


    var $countDown = $(".countDown"),
        $loading = $(".loading");

    var countDown = setInterval(function () {
        $countDown
            .removeClass('countStart')
            .html(cTime)
            .addClass('countStart');
        if (cTime == 0) {
            if (loadingState == true) {
                clearInterval(countDown);
                $loading.css("display", "none");
                opening();
            }
        } else {
            cTime--;
        }
    }, 1500);

    var $tip = $(".tip");
    //--------------

    //-----進入動態----
    $('#logoa').bind('click', function (event) {
        if (browserPass == true) {
            $("article").show();
            $("#LOGO2L,#LOGO2R").addClass("LOGOtran");
            $("#logoa").css({
                "-webkit-animation": "0",
                "-moz-animation": "0"
            });
            $("#ink").css({
                "-webkit-animation": "2.3s inka ease-out  forwards",
                "-moz-animation": "2.3s inka ease-out  forwards"
            });
            page0Default();
            $('html, body').stop();
            setTimeout(function () {
                $('html, body').stop().animate({
                    scrollTop: $article.offset().top
                }, 1000, 'easeInOutExpo');
                event.preventDefault();
                $("#bgLineS,#bgLineH").css("right", "0");
                $("#bgLineMask").css("opacity", "1");
            }, 3000);

            $("#page0").delay(12000).fadeTo(2000, 1);

            setTimeout(function () {
                $(".touch").fadeTo(500, 1);
                $(".page").addClass("tran");
                $(".menuimg,.menu").css({
                    "display": "block"
                });
                $tip.css({
                    "-webkit-animation": "tipdown .5s ease-in forwards",
                    "-moz-animation": "tipdown .5s ease-in forwards"
                });

//                resume特別解說
                setTimeout(function () {
                    swal({
                        title: "作品集快速解說",
                        text: "左上方設定可以以cookie記錄瀏覽頁數（欲節省閱讀時間直接跳到最後階段，請按繼續）",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "是，繼續下階段",
                        closeOnConfirm: false
                    }, function () {
                        var $under = $(".under");
                        $under.show();
                        $('html, body').stop().animate({
                            scrollTop: $under.offset().top
                        }, 1000, 'easeInOutExpo');
                        event.preventDefault();
                        swal("解說。", "留言是AJAX+php+mysql");
                    });
                }, 3000);

            }, 14500);
        } else {
            swal("拜託換Chrome或Safari瀏覽器啦～！", "(´ﾟдﾟ`)");
        }

    });
    //--------------

    //    分享留言安三秒歸位

    var $sticker = $(".sticker"),
        $shareB = $(".shareB"),
        hovtest;

        $("textarea,input").focus(function () {
            clearInterval(hovtest);
        })

    function hov() {
        var i = 0;
        clearInterval(hovtest);

        hovtest = setInterval(function () {
            if (i == 3) {
                $sticker.removeClass("stickerMid");
                $shareB.stop(true).animate({
                    "bottom": "-15vh"
                });
                clearInterval(hovtest);
            } else {
                i++;
            }
        }, 1000);
    }


    $(".callSti").hover(
        function () {
            $shareB.stop(true).animate({
                "bottom": "-15vh"
            }, "swing");
            $sticker.addClass("stickerMid");
        },
        function () {
            hov();
        });

    $(".share").hover(
        function () {
            $sticker.removeClass("stickerMid");
            $shareB.stop(true).animate({
                "bottom": "45vh"
            }, "swing");
        },
        function () {
            hov();
        });




    //-----選單效果----

    $(".save").click(function () {
        var pageName = window.location.pathname.split("/").pop();
        $.cookie(pageName, nowPage, {
            expires: 99
        });
        $(".bCard").css({
            "display": "block",
            "-webkit-animation": "bCards 0.5s cubic-bezier(0.320, 0.010, 0.000, 0.995) forwards"
        }).delay(1000).fadeOut(1000);
    });

    $(".load").click(function () {
        var pageName = window.location.pathname.split("/").pop();
        var loadpage = setInterval(function () {
            var savePage = $.cookie(pageName);

            if (nowPage < savePage) {
                nextpage();
                if (nowPage == savePage) {
                    clearInterval(loadpage);
                }
            } else if (nowPage > savePage) {
                prepage();
                if (nowPage == savePage) {
                    clearInterval(loadpage);
                }
            }

        }, 400);
    });

    //--------------


    //-----翻頁區----

    function nextpage() {
        if (nowPage != lastPage) {
            $runPage.eq(lastPage - nowPage).css("left", "100vw");

            nowPage++;
            var $newPage = $runPage.eq(lastPage - nowPage),
                nowPageHeigt = $newPage.innerHeight();

            $newPage.css("opacity", "1");
            window.location.href = "#article";
            if (nowPageHeigt > vh) {
                $article.innerHeight(nowPageHeigt);
            } else {
                $article.innerHeight(vh);
            }
        } else {
            var $under = $(".under");
            $under.show();
            $('html, body').stop().animate({
                scrollTop: $under.offset().top
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        }
    };

    function prepage() {
        if (nowPage != 0) {
            $runPage.eq(lastPage - nowPage).css("opacity", "0");
            nowPage--;
            var $newPage = $runPage.eq(lastPage - nowPage),
                nowPageHeigt = $newPage.innerHeight();
            $runPage.eq(lastPage - nowPage).css("left", "0");
            window.location.href = "#article";
            if (nowPageHeigt > vh) {
                $article.innerHeight(nowPageHeigt);
            } else {
                $article.innerHeight(vh);
            }
        }
    };


    document.onkeydown = function () {
        var keycode = event.which || event.keyCode;
        if (keycode == 39) {
            nextpage();
        } else if (keycode == 37) {
            prepage();
        }
    }

    $("#touchN").click(function () {
        nextpage();
    });
    $("#touchL").click(function () {
        prepage();
    });
    //--------------

    $(".know").click(function () {
        $(".tip").css({
            "-webkit-animation": "knows .5s ease-in forwards",
            "-moz-animation": "knows .5s ease-in forwards"
        });
    });

    $(window).resize(function () {
        var oldScreenState = screenState;
        vw = window.innerWidth;
        vh = window.innerHeight;
        screenState = vw > vh ? "land" : "port";

        if (screenState != oldScreenState) {
            iosDebug();
            if (screenState == "land") {
                $(".pageM").css({
                    "font-size": "1.1rem",
                    "line-height": "2rem"
                });
            } else {

            }
        };

    })


    //瀏覽器偵測
    function deviceDetect() {
        //        手機
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (navigator.userAgent.match(/FB/i)) {
                swal("抱歉，FB內建瀏覽器太過陽春了～", "請擊點右上角改以Chrome或Safari開啟喔～", "warning");
            } else {
                iosDebug();
                swal("桌上平台以獲得更佳瀏覽體驗喔!");
                browserPass = true;
                if (screenState == "land") {
                    breakPrevent();
                } else {

                }
            }
        }
        //        桌機
        else {
            if (/Firefox|MSIE|Trident\/7\./i.test(navigator.userAgent)) {
                swal("抱歉，Firefox/IE瀏覽器一直不支援中文直式排版，所以我放棄了...", "麻煩改用Chrome或Safari拜託～！", "warning");
            } else {
                browserPass = true;
                if (screenState == "land") {
                    breakPrevent();
                } else {

                }
            }
        }

    }

    // ios異常設定
    function iosDebug() {
        $("#frame,.loading,article,.under").css({
            width: vw,
            height: vh,
            "min-height": vh
        });
        $(".LOGO2").css({
            height: 0.15 * vh
        });

    }


    function page0Default() {
        if ($runPage.eq(lastPage).innerHeight() > $article.innerHeight()) {
            var thisHeight = $runPage.eq(lastPage).innerHeight();
            $article.innerHeight(thisHeight);
        }
    }


    //-----破頁保險----
    function breakPrevent() {
        var bodyWidth = ($("body").innerWidth()) - 170;
        var i = 0;

        $runPage.each(function () {
            while ($(this).find(".pageM").innerWidth() > bodyWidth) {
                $(this).find(".pageM").css({
                    "font-size": 20 - i + "px",
                    "line-height": 30 - i + "px"
                });
                i++;
            }
        });
    }
    //--------------


    //-----html初始化----
    (function () {
        //-----line分享----
        var title = document.title,
            url = "http://" + location.hostname + location.pathname,
            lineHref = "http://line.naver.jp/R/msg/text/?" + title + " " + url + "&nbsp;",
            fbHerf = "https://www.facebook.com/sharer/sharer.php?u=" + url,
            twiHerf = "https://twitter.com/intent/tweet?text=" + title + " " + url;
        //        alert(fbHerf);
        $("#lineShare").attr("href", lineHref);
        $("#fbShare").attr("href", fbHerf);
        $("#twitterShare").attr("href", twiHerf);
        //--------------

        //-----下一章----
        $("#nextChapter").click(function () {
            if ($(this).attr("href") == false) {
                event.preventDefault();
                swal("～待續～");
            }
        });

        //--------------
    })();


    function landStyle() {

    }

    function portStyle() {

    }




})
