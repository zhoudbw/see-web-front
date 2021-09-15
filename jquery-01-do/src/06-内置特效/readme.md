## 内置特效

在css3还没有普及的时候，想要实现一个普通的特效，都要借助JS去封装一些动画库。当需要运动特效，可能就涉及到数学和物理方面的知识了。在前些年，如果可以用JS实现一个动画特效，或许别人还会认为你基础很扎实。现在，jQuery帮我们封装了动画特效，再想去实现动画特效就很简单了（将一个复杂的实现直接封装成了一个函数）。

### 01 基本特效

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            color: #fff;
            font-size: 18px;
            padding: 5px 10px;
            background: green;
            border: none;
        }

        #box {
            width: 400px;
            height: 400px;
            padding: 20px;
            margin: 20px;
            background: #ccc;
            border: 10px solid green;
            position: relative;
            /* 相对定位 */
        }

        #box img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <!-- 基本特效 -->
    <button id="hide">隐藏</button>
    <button id="show">展示</button>
    <button id="toggle">隐藏/显示切换</button>
    <button id="toggle2">隐藏/显示切换2</button>
    <div id="box">
        <img src="images/img_01.jpg" alt="">
    </div>
    <script>
        // 基本特效：隐藏，有个动画效果，本质是添加display=none. 变化的时候，盒模型的尺寸都在改变。
        /**
         * hide()可以传递完全隐藏的速度/多长时间完全隐藏
         */
        $("#hide").click(function () {
            // $("#box").hide("fast"); // 快速隐藏
            // $("#box").hide("nomar"); // 中速隐藏
            // $("#box").hide("slow"); // 慢速隐藏
            // $("#box").hide(4000); // 4秒隐藏
            /**
             * 很多时候，动画执行之后，我们希望其能够执行一些其他的操作。
             * 实现这种功能，通过传递function(){}
             */
            $("#box").hide(3000, function () {
                console.log("隐藏动画特效结束... 执行方法体...");
            });
        });
    </script>

    <script>
        // 基本特效：显示
        /**
         * show()的用法和hide()一样。 show()用于显示隐藏的元素
         * 传递，fast normal(不传递参数时默认) slow 就不演示了。
         */
        $("#show").click(function () {
            $("#box").show(3000, function () {
                console.log("显示动画特效结束... 执行方法体...");
            });
        });
    </script>

    <script>
        // 基本特效：隐藏/显示切换
        $("#toggle").click(function () {
            // 如果没有这个方法，我们自己去用JS实现的话，就是通过对display属性值判断，进行来回切换。
            // 这里已经有了，我们就直接拿来用了。
            $("#box").toggle("normal", function () {
                console.log("隐藏/显示动画特效结束... 执行方法体...");
            });
        });

        // 有的时候，我们是要区分隐藏和显示的。
        // 隐藏和显示所要做的事情是不一样的。  
        var n = 0;
        $("#toggle2").click(function () {
            $("#box").toggle("normal", function () {
                var re = n++ % 2;
                console.log(n++ % 2); // 打印效果： 0 1 0 1 0 1 ...
                // 通过变量n，我们就可以判断隐藏和显示的状态了。隐藏-0，显示-1。
                if (re == 0) { // 隐藏
                    console.log("隐藏动画结束了。");
                } else if (re == 1) { // 显示
                    console.log("显示动画结束了。");
                }
            });
        });
    </script>
</body>

</html>
```

### 02 滑动特效

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            color: #fff;
            font-size: 18px;
            padding: 5px 10px;
            background: green;
            border: none;
        }

        #box {
            width: 400px;
            height: 400px;
            padding: 20px;
            margin: 20px;
            background: #ccc;
            border: 10px solid green;
            position: relative;
            /* 相对定位 */
        }

        #box img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <!-- 滑动特效 -->
    <button id="slideUp">滑动隐藏</button>
    <button id="slideDown">滑动显示</button>
    <button id="slideToggle">滑动隐藏/显示切换</button>
    <div id="box">
        <img src="images/img_01.jpg" alt="">
    </div>
    <script>
        // 滑动特效，用法和hide()、show()、toggle()一样。
        // slideUp()滑动隐藏
        $("#slideUp").click(function () {
            $("#box").slideUp("slow",function() {
                console.log("滑动隐藏动画结束...");
            });
        });
        // slideDown() 滑动显示
        $("#slideDown").click(function () {
            $("#box").slideDown("slow",function() {
                console.log("滑动显示动画结束...");
            });
        });

        // slideToggle() 滑动隐藏/显示切换
        var n = 0;
        $("#slideToggle").click(function () {
            $("#box").slideToggle("normal", function () {
                var re = n++ % 2;
                if (re == 0) { // 隐藏
                    console.log("隐藏动画结束了。");
                } else if (re == 1) { // 显示
                    console.log("显示动画结束了。");
                }
            });
        });
    </script>
</body>

</html>
```

### 03 渐变特效

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            color: #fff;
            font-size: 18px;
            padding: 5px 10px;
            background: green;
            border: none;
        }

        #box {
            width: 400px;
            height: 400px;
            padding: 20px;
            margin: 20px;
            background: #ccc;
            border: 10px solid green;
            position: relative;
            /* 相对定位 */
        }

        #box img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <!-- 渐变特效 -->
    <button id="fadeOut">淡出隐藏</button>
    <button id="fadeIn">淡入显示</button>
    <button id="fadeToggle">淡出隐藏/淡入显示切换</button>
    <button id="fadeTo">透明度变化</button>
    <div id="box">
        <img src="images/img_01.jpg" alt="">
    </div>
    <script>
        /* 这些特效和前面使用的动画特效，使用方式都一样。 */
        // 渐变特效

        // 淡出隐藏
        $("#fadeOut").click(function () {
            $("#box").fadeOut(function () {
                console.log("淡出隐藏动画结束...");
            });
        });
        // 淡入显示
        $("#fadeIn").click(function () {
            $("#box").fadeIn(function () {
                console.log("淡入显示动画结束...");
            });
        });
        // 淡出隐藏/淡入显示切换
        var n = 0;
        $("#fadeToggle").click(function () {
            $("#box").fadeToggle("normal", function () {
                var re = n++ % 2;
                if (re == 0) { // 隐藏
                    console.log("淡出隐藏动画结束了。");
                } else if (re == 1) { // 显示
                    console.log("淡入显示动画结束了。");
                }
            });
        });
        // 透明度变化
        $("#fadeTo").click(function () {
            // 变化速度  透明度情况  回调函数
            $("#box").fadeTo("normal", 0.5, function () {
                console.log("透明度变化完成...");
            });
        });
    </script>
</body>

</html>
```

### 04 自定义动画

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            color: #fff;
            font-size: 18px;
            padding: 5px 10px;
            background: green;
            border: none;
        }

        #box {
            width: 400px;
            height: 400px;
            padding: 20px;
            margin: 20px;
            background: #ccc;
            border: 10px solid green;
            position: relative;
            /* 相对定位 */
        }

        #box img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <!-- 自定义动画 -->
    <button id="animate">自定义动画</button>
    <button id="animate2">链式操作</button>
    <div id="box">
        <img src="images/img_01.jpg" alt="">
    </div>
    <script>
        // 自定义动画
        /**
         * animate()有很多的参数，统一将这些参数放置在对象中。
         */
        $("#animate").click(function() {
            $("#box").animate(
                // 但凡给定的css属性值是数值，那么都能够帮助去运动。都是通过运动的方式去体现改变。。
                // 该参数内放置的就是能够运动的属性。
                {
                    width: 200, // 宽运动为200px
                    left: "+=50", // 设置了相对定位，图片会向右运动
                    height: "toggle", // 高度从0变为现在大小，现在大小变为0，来回切换。
                    "border-radius":50, // 变成圆角
                }, 
                // 该参数传递运动持续的时间
                2000,
                // 该参数是回调函数，表示动画执行过后执行的方法体
                function() {
                    console.log("运动结束...");
                }
            );
        });

        /** 链式操作 */
        $("#animate2").click(function() {
            $("#box")
            .animate({width:200}, "fast")
            .animate({height:200}, "slow")
            .animate({opacity:0.5}, 1000);
        });
    </script>
</body>

</html>
```

### 05 控制动画

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            color: #fff;
            font-size: 18px;
            padding: 5px 10px;
            background: green;
            border: none;
        }

        #box {
            width: 400px;
            height: 400px;
            padding: 20px;
            margin: 20px;
            background: #ccc;
            border: 10px solid green;
            position: relative;
            /* 相对定位 */
        }

        #box img {
            width: 100%;
            height: 100%;
        }
    </style>
</head>

<body>
    <button id="animate">自定义动画</button>
    <button id="animate2">延迟动画</button>
    <!-- 控制动画 -->
    <button id="stop">暂停动画</button>
    <button id="finish">完后动画</button>
    <div id="box">
        <img src="images/img_01.jpg" alt="">
    </div>
    <script>
        $("#animate").click(function() {
            $("#box")
            .animate({width:200}, 2000)
            .animate({height:200}, 2000)
            .animate({opacity:0.5}, 3000);
        });
        /** 控制动画 */

        // 停止动画
        $("#stop").click(function() {
            $("#box").stop();
            console.log("暂停动画...");
        });
        // 完成动画
        $("#finish").click(function() {
            $("#box").finish();
            console.log("完成动画...");
        });
        // 延迟动画
        $("#animate2").click(function() {
            $("#box")
            .animate({width:200}, "fast").delay(2000)
            .animate({height:200}, "fast")
            .animate({opacity:0.5}, "fast");
        });
    </script>
</body>

</html>
```

