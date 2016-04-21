
// judgement weather support this feature, if not, return
if (!window.requestAnimationFrame) {
    alert("not support requestAnimationFrame, exit");
    throw('not support requestAnimationFrame, exit')
}

// init lib
Phantom.DOMReady(function () {
    createjs.CSSPlugin.install(createjs.Tween);
});

window.BODY_WIDTH = 320;
window.choiceItemFlag = [];
window.deviceData = {};
window.submitFlag = false;
window.SetupOption = {
    time: null,
    weekdays: null,
    bulb_ids: null
};

(function () {

    window.page_one_frame_1 = function () {
        //红色背景弹出
        var el = document.getElementById('bgRed');
        createjs.Tween.get(el).to({height: 340}, 1000, createjs.Ease.bounceOut).call(function () {
            el.className = el.className + " animation-done";
            frame_2();
        });
    };

    function frame_2() {
        //中心椭圆
        var el = document.getElementById('ellipsoid');
        el.style.left = BODY_WIDTH / 2 + 'px';
        createjs.Tween.get(el).to({
            width: 200,
            left: (BODY_WIDTH - 200) / 2
        }, 500, createjs.Ease.quintOut).call(function () {
            frame_3();
        });
    }

    function frame_3() {

        //圆公共部分
        var circleMovePublic = function (circleAreaName, circleAreaBg, circleBgWidth, circleBgHeight) {
            var circleName = document.getElementById(circleAreaName);
            var circleBg = document.getElementById(circleAreaBg);
            circleBg.style.width = circleBgWidth + 'px';
            circleBg.style.height = circleBgHeight + 'px';
            circleName.style.left = (BODY_WIDTH / 2 - circleBg.offsetWidth / 2) + 'px';
            circleName.style.top = (280 - circleBg.offsetHeight / 2) + 'px';
            return {
                name: circleName,
                svgName: circleAreaBg,
                svgBgWidth: circleBg.offsetWidth,
                svgBgHeight: circleBg.offsetHeight
            };
        };

        //第一个圆
        var circle_one = function (callback) {
            var circleInfo = circleMovePublic('firstCircle', 'firstCircleBg', 65, 65);
            circleWave('firstCircleBg', 0.1, '#99B3FF');
            createjs.Tween.get(circleInfo.name).to({
                width: circleInfo.svgBgWidth,
                height: circleInfo.svgBgHeight,
                left: circleInfo.svgBgWidth * 0.4,
                top: 105,
                opacity: 1
            }, 300, createjs.Ease.quadOut)
                .to({top: 115}, 500, createjs.Ease.bounceOut).call(callback);
        };

        //第二个圆
        var circle_two = function (callback) {
            var circleInfo = circleMovePublic('secondCircle', 'secondCircleBg', 126, 126);
            circleWave('secondCircleBg', 0.1, '#99B3FF');
            createjs.Tween.get(circleInfo.name)
                .to({
                    width: circleInfo.svgBgWidth,
                    height: circleInfo.svgBgHeight,
                    left: (BODY_WIDTH / 2 - circleInfo.svgBgWidth / 2),
                    top: 70,
                    opacity: 1
                }, 300, createjs.Ease.quadOut)
                .to({top: 80}, 500, createjs.Ease.bounceOut).call(callback);
        };


        //第三个圆
        var circle_three = function (callback) {
            var circleInfo = circleMovePublic('thirdCircle', 'thirdCircleBg', 74, 74);
            circleWave('thirdCircleBg', 0.1, '#FFD24D');
            createjs.Tween.get(circleInfo.name).to({
                width: circleInfo.svgBgWidth,
                height: circleInfo.svgBgHeight,
                left: BODY_WIDTH - circleInfo.svgBgWidth * 1.4,
                top: 35,
                opacity: 1
            }, 500, createjs.Ease.quintOut)
                .to({top: 45}, 500, createjs.Ease.bounceOut).call(callback);
        };

        // callback 调用顺序：one->two->three->frame_page_font
        var step3 = function () {
            return circle_three(frame_5)
        };
        circle_one(function () {
            return circle_two(step3)
        })
    }

    function frame_5() {
        frame_page_font('page1Font', frame_6)
    }


    function frame_6() {
        frame_page_btn('page1Btn')
    }

})();

(function () {

    window.page_two_frame_1 = function () {
        var hide = document.querySelectorAll('.hide');
        document.getElementById('page1Btn').style.display = 'none';
        var move = function (e, callback) {
            createjs.Tween.get(e)
                .to({opacity: 0}, 800, createjs.Ease.linear).call(function () {
                    e.style.display = 'none';
                    if (callback) callback();
                });
        };

        //其他元素隐藏
        for (var i = 0; i < hide.length - 1; i++) {
            move(hide[i]);
        }
        move(hide[hide.length - 1], frame_2);
    };

    function frame_2() {
        var clock = document.querySelector('.clock');
        var light = document.querySelector('.light');
        clock.style.display = 'none';
        createjs.Tween.get(light).to({opacity: 1}, 800, createjs.Ease.linear).call(frame_3);
    }

    function frame_3() {
        frame_3_left('#fireworksLeft .icon1', 28, 70);
        frame_3_left('#fireworksLeft .icon2', 55, 76);
        frame_3_left('#fireworksLeft .icon3', 81, 100);
        frame_3_left('#fireworksLeft .icon4', 13, 120);
        frame_3_left('#fireworksLeft .icon5', 51, 130);
        frame_3_left('#fireworksLeft .icon6', 7, 140);
        frame_3_left('#fireworksLeft .icon7', 24, 180);
        frame_3_left('#fireworksLeft .icon8', 26, 220);

        frame_3_right('#fireworksRight .icon1', 47, 90);
        frame_3_right('#fireworksRight .icon2', 30, 113);
        frame_3_right('#fireworksRight .icon3', 15, 134);
        frame_3_right('#fireworksRight .icon4', 13, 158);
        frame_3_right('#fireworksRight .icon5', 44, 171);
        frame_3_right('#fireworksRight .icon6', 32, 190);
        frame_3_right('#fireworksRight .icon7', 72, 210, frame_4);
    }

    function frame_3_left(obj, left, top) {
        var objFlowers = document.querySelector(obj);
        objFlowers.style.display = 'block';
        objFlowers.style.left = -100 + 'px';
        objFlowers.style.top = 220 + 'px';
        createjs.Tween.get(objFlowers).to({
            left: left,
            top: top,
            opacity: 1
        }, 600, createjs.Ease.circIn).call(function () {
            if (objFlowers.parentNode.className.indexOf('shake') == -1) {
                objFlowers.parentNode.className = objFlowers.parentNode.className + ' shake';
            }
        });
    }

    function frame_3_right(obj, right, top, callback){
        var objFlowers = document.querySelector(obj);
        objFlowers.style.display = 'block';
        objFlowers.style.right = '-100px';
        objFlowers.style.top = 220 + 'px';
        createjs.Tween.get(objFlowers).to({
            right: right,
            top: top,
            opacity: 1
        }, 600, createjs.Ease.circIn).call(function () {
            if (objFlowers.parentNode.className.indexOf('shake') == -1) {
                objFlowers.parentNode.className = objFlowers.parentNode.className + ' shake';
            }
            if (callback) callback();
        });
    }

    function frame_4() {
        frame_page_font('page2Font', frame_5);
    }

    function frame_5() {
        frame_page_btn('page2Btn');
    }

})();

(function () {

    window.page_three_frame_1 = function () {

        var hidePage2 = document.querySelectorAll('.hidePage2');
        var moveHide = function (e, callback) {
            createjs.Tween.get(e)
                .to({opacity: 0}, 800, createjs.Ease.linear).call(function () {
                    e.style.display = 'none';
                    if (callback) callback();
                });
        };
        //其他元素隐藏
        for (var i = 0; i < hidePage2.length - 1; i++) {
            moveHide(hidePage2[i]);
        }
        moveHide(hidePage2[hidePage2.length - 1], frame_2);

    };

    function frame_2() {
        var light = document.querySelector('.light');
        var circlePage3 = document.querySelector('#secondCircle .page3');
        light.style.display = 'none';
        circlePage3.style.display = 'block';
        createjs.Tween.get(circlePage3).to({opacity: 1}, 800, createjs.Ease.linear).call(frame_3);
    }

    function frame_3() {
        var obj = document.getElementById('choiceClock');
        obj.style.display = 'block';
        leftVal = obj.offsetWidth * 0.4;
        circleWave('choiceClockSvg', 0.1, '#ffd24d');
        obj.style.left = leftVal + 'px';
        obj.style.top = -100 + 'px';
        createjs.Tween.get(obj).to({
            left: leftVal,
            top: 343,
            opacity: 1
        }, 1200, createjs.Ease.bounceOut).call(frame_4);
    }

    function frame_4() {
        var obj = document.getElementById('choiceNova');
        obj.style.display = 'block';
        leftVal = (BODY_WIDTH - obj.offsetWidth) / 2;
        circleWave('choiceNovaSvg', 0.1, '#4dd2ff');
        obj.style.left = leftVal + 'px';
        obj.style.top = -100 + 'px';
        createjs.Tween.get(obj).to({
            left: leftVal,
            top: 343,
            opacity: 1
        }, 1200, createjs.Ease.bounceOut).call(frame_5);
    }

    function frame_5() {
        var obj = document.getElementById('choiceDay');
        obj.style.display = 'block';
        leftVal = BODY_WIDTH - obj.offsetWidth * 1.5;
        circleWave('choiceDaySvg', 0.1, '#a1a1a1');
        obj.style.left = leftVal + 'px';
        obj.style.top = -100 + 'px';
        createjs.Tween.get(obj).to({
            left: leftVal,
            top: 343,
            opacity: 1
        }, 1200, createjs.Ease.bounceOut);
    }

})();

(function () {
    //window.page_four_frame_1 = function () {
    //    var hidePage3 = document.querySelectorAll('.hidePage3');
    //    var moveHide = function (e, callback) {
    //        createjs.Tween.get(e)
    //            .to({opacity: 0}, 1000, createjs.Ease.linear).call(function () {
    //                e.style.display = 'none';
    //                if (callback) callback();
    //            });
    //    };
    //    //其他元素隐藏
    //    for (var i = 0; i < hidePage3.length - 1; i++) {
    //        moveHide(hidePage3[i]);
    //    }
    //    moveHide(hidePage3[hidePage3.length - 1], frame_2);
    //};

    function frame_2() {
        var page4Font = document.getElementById('page4Font');
        page4Font.style.display = 'block';
        createjs.Tween.get(page4Font).to({opacity: 1}, 800, createjs.Ease.linear).call(frame_3);
    }

    function frame_3() {
        var page4Btn = document.getElementById('page4Btn');
        page4Btn.style.display = 'block';
        createjs.Tween.get(page4Btn).to({opacity: 1}, 800, createjs.Ease.linear);
    }

})();

(function () {
    //window.page_five_frame1 = function () {
    //
    //    var hidePage4 = document.querySelectorAll('.hidePage4');
    //
    //    var moveHide = function (e, callback) {
    //        createjs.Tween.get(e)
    //            .to({opacity: 0}, 800, createjs.Ease.linear).call(function () {
    //                e.style.display = 'none';
    //                if (callback) callback();
    //            });
    //    };
    //    //其他元素隐藏
    //    for (var i = 0; i < hidePage4.length-1; i++) {
    //        moveHide(hidePage4[i]);
    //    }
    //    moveHide(hidePage4[hidePage4.length-1],frame_2);
    //};

    window.page_four_frame_1 = function () {
        var hidePage3 = document.querySelectorAll('.hidePage3');
        var moveHide = function (e, callback) {
            createjs.Tween.get(e)
                .to({opacity: 0}, 1000, createjs.Ease.linear).call(function () {
                    e.style.display = 'none';
                    if (callback) callback();
                });
        };
        //其他元素隐藏
        for (var i = 0; i < hidePage3.length - 1; i++) {
            moveHide(hidePage3[i]);
        }
        moveHide(hidePage3[hidePage3.length - 1], frame_2);
    };

    function frame_2() {

        var lastPageWrap = document.querySelector('.lastPage');
        var lastPageApp = document.querySelectorAll('.lastPage .app');

        lastPageWrap.style.display = 'block';

        appSvgBg('app1Svg',50,50, '#ea0177');
        appSvgBg('app3Svg',58,58, '#b9b9b9');
        appSvgBg('app4Svg',72,72, '#ffd24d');
        appSvgBg('app5Svg',72,72, '#4dd2ff');
        appSvgBg('app7Svg',92,92, '#ff7373');
        appSvgBg('app8Svg',72,72, '#ec6e00');
        appSvgBg('app9Svg',24,24, '#00b9c8');

        var moveShow = function (e, callback) {
            createjs.Tween.get(e)
                .to({opacity: 1}, 800, createjs.Ease.linear).call(function () {
                    e.style.display = 'block';
                    if (callback) callback();
                });
        };
        for (var i = 0; i < lastPageApp.length - 1; i++) {
            moveShow(lastPageApp[i]);
        }
        moveShow(lastPageApp[lastPageApp.length - 1], frame_3);
    }

    function frame_3() {
        var page5Font = document.getElementById('page5Font');
        page5Font.style.display = 'block';
        createjs.Tween.get(page5Font).to({opacity: 1}, 1000, createjs.Ease.linear).call(frame_4);
    }

    function frame_4() {
        var page5Btn = document.getElementById('page5Btn');
        page5Btn.style.display = 'block';
        createjs.Tween.get(page5Btn).to({opacity: 1}, 1000, createjs.Ease.linear);
    }

    function appSvgBg(svgId,svgWidth,svgHeight,color){
        var obj = document.getElementById(svgId);
        obj.style.width = svgWidth + 'px';
        obj.style.height = svgHeight + 'px';
        circleWave(svgId, 0.1, color);
    }

})();

//按钮
function frame_page_btn(btnName) {
    var pageButton = document.getElementById(btnName);
    pageButton.style.display = 'block';
    createjs.Tween.get(pageButton)
        .to({opacity: 0.3}, 300, createjs.Ease.linear)
        .to({opacity: 1}, 1200, createjs.Ease.linear);
}

//文字
function frame_page_font(fontName, callback) {
    var pageFont = document.getElementById(fontName);
    pageFont.style.display = 'block';
    createjs.Tween.get(pageFont)
        .to({opacity: 0.3}, 300, createjs.Ease.linear)
        .to({opacity: 1}, 1200, createjs.Ease.linear).call(callback);
}

Phantom.DOMReady(page_one_frame_1);

Phantom.DOMReady(function () {
    document.getElementById('page1Btn').onclick = page_two_frame_1;
    document.getElementById('page2Btn').onclick = page_three_frame_1;
    document.getElementById('page3Btn').onclick = submitConfigInfo;
    //document.getElementById('page4Btn').onclick = page_five_frame1;
    document.getElementById('page5Btn').onclick = function(){alert('关闭')};
});

Phantom.DOMReady(function () {
    //选择弹出层
    document.getElementById('choiceClock').onclick = page_three_choice_clock;
    document.getElementById('choiceNova').onclick = page_three_choice_nova;
    document.getElementById('choiceDay').onclick = page_three_choice_whichDay;
    //关闭
    document.getElementById('choiceItemBg').onclick = page_three_close_bg;
    //避免冒泡
    document.querySelector('.clockTime').onclick = page_three_avoid_propagation;
    document.querySelector('.device').onclick = page_three_avoid_propagation;
    document.querySelector('.whichDay').onclick = page_three_avoid_propagation;
    //弹出层OK btn
    document.querySelector('.clockTime .btn').onclick = page_three_btn_time;
    document.getElementById('deviceBtn').onclick = page_three_btn_device;
    document.getElementById('whichDayBtn').onclick = page_three_btn_whichDay;

});

Phantom.DOMReady(function () {
    // Phantom.Ajax({
    //     url: '/api/v3/recipe/reserve?device_type=bulb,wall_switch',
    //     complete: function (data) {
    //         if (data.success) {
    //             window.deviceData = data.data;
    //         } else {
    //             alert(data.msg);
    //         }
    //     }
    // });
    window.deviceData = {
      "bulb": [
        {
          "id": 2352,
          "name": "卧室灯"
        },
        {
          "id": 3186,
          "name": "货架灯"
        },
        {
          "id": 3737,
          "name": "灯带"
        },
        {
          "id": 3890,
          "name": "玄关"
        },
        {
          "id": 3919,
          "name": "公司测试"
        },
        {
          "id": 4264,
          "name": "吊灯"
        },
        {
          "id": 5604,
          "name": "A"
        },
        {
          "id": 5605,
          "name": "B"
        },
        {
          "id": 5606,
          "name": "C"
        }
      ]
    };
});

function submitConfigInfo() {

    if(submitFlag) return false;
    submitFlag = true;
    alert('成功');
    document.getElementById('page3Btn').style.background = '#ccc';
    page_four_frame_1();
    // Phantom.Ajax({
    //     url: '/api/v3/recipe/morning_light/create',
    //     method: 'post',
    //     data: {
    //         bulb_ids: window.SetupOption.bulb_ids,
    //         weekdays: window.SetupOption.weekdays,
    //         time: window.SetupOption.time
    //     },
    //     complete: function (data) {
    //         if (data.success) {
    //             alert('提交成功');
    //             document.getElementById('page3Btn').style.background = '#ccc';
    //             page_four_frame_1();
    //         } else {
    //             submitFlag = false;
    //             alert(data.msg);
    //             document.getElementById('page3Btn').style.background = '#d92d36';
    //         }
    //     }
    // });

}

function page_three_choice_clock() {

    page_three_choice('choiceItem', '.clockTime', 'block');

    document.getElementById('hour').innerText = '10';
    document.getElementById('minute').innerText = '10';

    //调用clock
    new TouchClock({
        clock: 'clock',
        width: 210,
        height: 210,
        callback: function (hour, minute) {
            console.log(hour, minute);
            document.getElementById('hour').innerText = hour;
            document.getElementById('minute').innerText = minute;
        }
    });

}

function page_three_choice_nova() {
    page_three_choice('choiceItem', '.device', 'block');
    page_three_show_device();
}

function page_three_choice_whichDay() {
    page_three_choice('choiceItem', '.whichDay', 'block');
    page_three_show_day();
}

function page_three_choice(wrap, con, displayVal) {
    document.getElementById(wrap).style.display = displayVal;
    document.querySelector(con).style.display = displayVal;
}

function page_three_close_bg(e) {
    e.stopPropagation();
    document.getElementById('choiceItem').style.display = 'none';
    document.querySelector('.clockTime').style.display = 'none';
    document.querySelector('.device').style.display = 'none';
    document.querySelector('.whichDay').style.display = 'none';
}

function page_three_avoid_propagation(event) {
    event.stopPropagation();
}

function page_three_show_device() {
    var str = '';
    var data = window.deviceData;
    for (var i in data) {
        for (var j = 0; j < data[i].length; j++) {
            str += "<label class='single'>" +
                "<div class='left'>" +
                "<img src='data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABLAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5RDY3RDg1MkYxMUU1QkIxRkE0NTE4NUJFMzJFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2MTc5RDY3RTg1MkYxMUU1QkIxRkE0NTE4NUJFMzJFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjYxNzlENjdCODUyRjExRTVCQjFGQTQ1MTg1QkUzMkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjYxNzlENjdDODUyRjExRTVCQjFGQTQ1MTg1QkUzMkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAwICAgICAwICAwUDAwMFBQQDAwQFBgUFBQUFBggGBwcHBwYICAkKCgoJCAwMDAwMDA4ODg4OEBAQEBAQEBAQEAEDBAQGBgYMCAgMEg4MDhIUEBAQEBQREBAQEBARERAQEBAQEBEQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/8AAEQgAKwAZAwERAAIRAQMRAf/EAJIAAAMBAQAAAAAAAAAAAAAAAAYICQcAAQACAwEBAAAAAAAAAAAAAAAGCAQFBwADEAAABQIEBAQCCwEAAAAAAAABAgMEBQAGERITByExFBZBgSII0xVRkVIjMySUVZVWGAkRAAEDAgMECAYDAQAAAAAAAAEAAgMRBCESBTFBURRxgZHRIhMGB7EyUmKSU2GhwRX/2gAMAwEAAhEDEQA/ACPfj3R7q3xfM3GwU87t63I125j2EbGqC1UVI1VMiZVwqngoYxzEEcoGApQ4YY8aELm9ke8gGgHBNJ6f9J2FraxukjbJK5oc5zhmpmFaNBwAFdtKlY+N23kJ9Qbll82ObN81e8+eP4tQPMfxPaUacnbfqZ+DO5aZtL7pd2ttbljXEhcDy4IAVkkZSFk1jOgFsocCnMgoriomoQBzFwNlHDAQ41MgvZY3CpJHAoW1j0lp97A4NjbHJQlr2DLj9wGBB2HfwVQOoS+1RjVKllKl/wC5jZ24dvN5J5rHxbp1ETaykzDuWrZZZPTdnE6qQimUwAZNUTBgPHKJR8aDry3cyU0GBxCa30trcN5psZc8B7AGOBIBq0UBx3FtOuqy7t25f2SQ/QOfh1CyO4HsRZzMH7G/k3vRtsrs9c+5m6EBaysS8bsBcJvJl2u1WRTRYtTlUVxOoQC4nwBMoeImqRbwOkkDaGm/oVFrutQWNjJMHtLqFrACCS52A2HdtPQqu5C/QH1UbpQqpFff6nelt7hW3ckbOyLWJl2CrRJq3erIIIumamc+UiRihioRUoiI8fTQ1qmdrwQTQhb97dm2ms5YnRsL2OBqWgktcMNvAg9qV/vS9v7LK/yTv4lU3mP4ntWr8ja/qZ+Le5MT7Exve6d5nko8uCSXi4KMVO+bLvXC6DhR4cEkUzkUOYo4ZTHDxxKFW2m53S1qaALNfcDlYNNaxsbA97xQhoBAbiSKDoHWqB0UJc0t3v4tck1sZ8+InmXtyRZvSqeJUVjC0V8sFgHyqp1NlYa8CtO9vLvytV8uuEjHN6x4h8FOyhRMqn0/53W4Rntvct1mD7yYlRbF4cdJggQpfLOoeibSmUjLuJ+CXv3Kuc17FDuYyvW8n/AE2FXayBD24NiwO5lmS1iXOVQ0ZMJaDrQPpqlwMBynIfAcDFMUDBwHiFeUsTZGFp2FWWm6hLY3LLiKmdhqK4jr6QplXTbewFuXLJ2+rLXkmpEu12DpuaNiFFBVbqCkIEP1JA4iHpxLyEKD3sga4irsP4HemntLrV5oGSBkFHtDgc0lKEV+k9eKpBs5tpbm0u30bZtsA4FqkBnKqz0xTOVV3I6qh1cgAQDCI8ihgHIKLbeFsTA1qWPW9Um1C8dPLSpw8PygDAAb+3FG1SFRLq5cpo7wdnf6Xnur7Z6ruBDU1+5+k1NVLDrOn/L6nLWy+jPz8aEJ8nMH5dv3f3uTR6LzP/Ejp51PKOzl81KH5M3ip9NfFRUuovSuLq5cv//Z'/>" +
                "</div>" +
                "<div class='center'>" +
                "<span>" + data[i][j].name + "</span>" +
                "</div>" +
                "<input class='checkBoxHidden' type='checkbox' name='device' value=" + data[i][j].id + " />" +
                "<img src='data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QMsaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNkYzOUQxMDg1MzExMUU1QkIxRkE0NTE4NUJFMzJFMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNkYzOUQxMTg1MzExMUU1QkIxRkE0NTE4NUJFMzJFMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2RjM5RDBFODUzMTExRTVCQjFGQTQ1MTg1QkUzMkUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjA2RjM5RDBGODUzMTExRTVCQjFGQTQ1MTg1QkUzMkUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQAAgICAgICAgICAgMCAgIDBAMCAgMEBQQEBAQEBQYFBQUFBQUGBgcHCAcHBgkJCgoJCQwMDAwMDAwMDAwMDAwMDAEDAwMFBAUJBgYJDQsJCw0PDg4ODg8PDAwMDAwPDwwMDAwMDA8MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAEAAUAwERAAIRAQMRAf/EAIIAAAMBAAAAAAAAAAAAAAAAAAYHCAkBAAIDAQAAAAAAAAAAAAAAAAAEAwUHBhAAAAMGBgIDAQAAAAAAAAAAAQIDERIEBRUGIhMUBxcIACMhYjUWEQABAQQHBQgDAAAAAAAAAAABAgAREgQhMUFRIgMGoUITFBVhcYHB4TIkBbGSFv/aAAwDAQACEQMRAD8A388GGkrsT2J4/wAuwbATru6M8cQhoaHJqKdqMKZjJgAvrnb6kmfY+FgGQnJzh4EUqOz1uHk2e6y1l074kpjml0ACmB9VFqjup8TYFA3BO+nBtP5NnHJFY/p6ZUFGNy/ztY+8897Gty834Y7j8h5TO4LozE99ex+25/Y1Z/Lfc9Gh5lXMx8SGI3eyJ9dtcMX7sF7gQvY/YS7rmmlozWZ7g2ruJERAS9ZVFaZHgIyKMIpAMOAmyVUnnUzFDKOAA8VoOhHmDOllEpJUFHvcT+Oyy9qz7lGoNPzWZmSylZ2VnPc8FcCjVhsULN1Vx9qXb1267cf5l/X+pXd0Z4+vExMQfUU7UYlClUERfXO32qt+pMLRM1JyfDxrpUdnrefJum0bo3p3y5vHNLpJNMD66bVHeV4C0qrXx9tCb//Z'/>" +
                "</label>";
        }
    }
    document.getElementById('deviceList').innerHTML = str;
}

function page_three_show_day() {
    var str = '';
    var weekday = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    for (var i = 0; i < weekday.length; i++) {
        str += "<label class='week'>" +
            //"<div class='wrap'>" +
            "<input class='weekCheckBox' type='checkbox' name='week' value=" + ((i + 1) % 7) + " />" +
            "<strong class='icon'><em></em></strong><span>" + weekday[i] + "</span>" +
            //"</div>" +
            "</label>";
    }
    document.getElementById('whichDayList').innerHTML = str;
}

function page_three_btn_time() {
    var hour = document.getElementById('hour');
    var minute = document.getElementById('minute');
    page_three_choice('choiceItem', '.clockTime', 'none');

    document.querySelector('.choiceClock .bot .unselect').style.display = 'none';
    document.querySelector('.choiceClock .bot .select').style.display = 'block';

    choiceItemFlag.push(1);
    sunEclipseChange(choiceItemFlag);

    window.SetupOption.time = hour.innerText + ':' + minute.innerText;
}

function page_three_btn_device() {
    var arrId = [];
    var singleArr = document.querySelectorAll('.single .checkBoxHidden');
    for (var k = 0; k < singleArr.length; k++) {
        if (singleArr[k].checked) {
            arrId.push(singleArr[k].value)
        }
    }
    if (arrId.length == 0) {
        alert('请您选择您的设备');
        return false;
    }
    page_three_choice('choiceItem', '.device', 'none');

    document.querySelector('.choiceNova .bot .unselect').style.display = 'none';
    document.querySelector('.choiceNova .bot .select').style.display = 'block';

    choiceItemFlag.push(2);
    sunEclipseChange(choiceItemFlag);

    window.SetupOption.bulb_ids = arrId.join(',');

}

function page_three_btn_whichDay() {
    var weekId = [];
    var weekArr = document.querySelectorAll('.week .weekCheckBox');
    for (var k = 0; k < weekArr.length; k++) {
        if (weekArr[k].checked) {
            weekId.push(weekArr[k].value)
        }
    }
    if (weekId.length == 0) {
        alert('请您选择哪天使用灯光唤醒功能');
        return false;
    }
    page_three_choice('choiceItem', '.whichDay', 'none');

    document.querySelector('.choiceDay .bot .unselect').style.display = 'none';
    document.querySelector('.choiceDay .bot .select').style.display = 'block';

    choiceItemFlag.push(3);
    sunEclipseChange(choiceItemFlag);
    window.SetupOption.weekdays = weekId.join(',');

}


//日食变化
function sunEclipseChange(obj) {
    var sunRed = document.querySelector('#sunEclipse .front');
    var page3OkBtn = document.getElementById('page3Btn');
    var arr = unique(obj);
    var i = arr.length;
    var left = null;
    if (i == 1) {
        left = -20;
    }
    if (i == 2) {
        left = -60;
    }
    if (i == 3) {
        left = -120;
    }
    createjs.Tween.get(sunRed).wait(200).to({
        left: left
    }, 1000, createjs.Ease.cubicInOut).call(function () {
        if (i == 3) {
            sunRed.style.display = 'none';
            page3OkBtn.style.display = 'block';
            createjs.Tween.get(page3OkBtn).to({
                opacity: 1
            }, 800, createjs.Ease.cubicInOut);
        }
    });
}

//去重数组
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
