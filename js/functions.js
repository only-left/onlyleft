var $window = $(window),
    gardenCtx,
    gardenCanvas,
    $garden,
    garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();

$(function() {
    $loveHeart = $("#loveHeart");
    var a = $loveHeart.width() / 2;
    var b = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $("#loveHeart").width();
    gardenCanvas.height = $("#loveHeart").height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
    
    // 调整布局
    adjustContentPosition();
    
    // 设置渲染间隔
    setInterval(function() {
        garden.render()
    }, Garden.options.growSpeed)
});

// 简化后的布局调整函数
// function adjustContentPosition() {
//     $("#content").css({
//         "width": $loveHeart.width() + $("#code").width(),
//         "height": Math.max($loveHeart.height(), $("#code").height()),
//         "margin-top": Math.max(($window.height() - $("#content").height()) / 2, 10),
//         "margin-left": Math.max(($window.width() - $("#content").width()) / 2, 10)
//     });
    
//     // 调整代码位置
//     adjustCodePosition();
// }

function adjustContentPosition() {
    $("#content").css({
        "margin-top": Math.max(($window.height() - $("#content").height()) / 2, 10)
    });
}

// 窗口大小改变时的处理
$(window).resize(function() {
    var b = $(window).width();
    var a = $(window).height();
    if (b != clientWidth && a != clientHeight) {
        location.replace(location)
    }
    adjustContentPosition();
});

// 其他函数保持不变
function getHeartPoint(c) {
    var b = c / Math.PI;
    var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
    var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
    return new Array(offsetX + a, offsetY + d)
}

function startHeartAnimation() {
    var c = 50;
    var d = 10;
    var b = new Array();
    var a = setInterval(function() {
        var h = getHeartPoint(d);
        var e = true;
        for (var f = 0; f < b.length; f++) {
            var g = b[f];
            var j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
            if (j < Garden.options.bloomRadius.max * 1.3) {
                e = false;
                break
            }
        }
        if (e) {
            b.push(h);
            garden.createRandomBloom(h[0], h[1])
        }
        if (d >= 30) {
            clearInterval(a);
            showMessages()
        } else {
            d += 0.2
        }
    }, c);
    
    $("#code").typewriter();
}

function timeElapse(c) {
    var e = Date();
    var f = (Date.parse(e) - Date.parse(c)) / 1000;
    var g = Math.floor(f / (3600 * 24));
    f = f % (3600 * 24);
    var b = Math.floor(f / 3600);
    if (b < 10) {
        b = "0" + b
    }
    f = f % 3600;
    var d = Math.floor(f / 60);
    if (d < 10) {
        d = "0" + d
    }
    f = f % 60;
    if (f < 10) {
        f = "0" + f
    }
    var a = '<span class="digit">' + g + '</span> days <span class="digit">' + b + '</span> hours <span class="digit">' + d + '</span> minutes <span class="digit">' + f + "</span> seconds";
    $("#elapseClock").html(a)
}

function showMessages() {
    $("#messages").fadeIn(5000, function() {
        showLoveU()
    })
}

// function adjustCodePosition() {
//     $("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2)
// }

function showLoveU() {
    $("#loveu").fadeIn(3000)
}

(function(a) {
    a.fn.typewriter = function() {
        this.each(function() {
            var d = a(this),
                c = d.html(),
                b = 0;
            d.html("").show();
            var e = setInterval(function() {
                var f = c.substr(b, 1);
                if (f == "<") {
                    b = c.indexOf(">", b) + 1
                } else {
                    b++
                }
                d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
                if (b >= c.length) {
                    clearInterval(e)
                }
            }, 75);
        });
        return this
    }
})(jQuery);