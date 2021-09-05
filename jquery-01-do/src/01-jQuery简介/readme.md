##  jQuery简介

官网：jquery.com

```
jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.
jQuery是一个快速、小型且功能丰富的JavaScript库。它通过一个易于使用、可以跨多种浏览器工作的API，使HTML文档遍历和操作、事件处理、动画和Ajax等事情变得更加简单。jQuery结合了多功能性和可扩展性，改变了数百万人编写JavaScript的方式。
```

```abap
write less, do more.
```

中文文档：jquery123.com

### jQuery的语法及写法

#### One

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <!--使用jQuery的第一步，引入jQuery文件-->
        <script src="js/jquery-3.6.0.js"></script>
        <!--jQuery代码的书写位置-->
        <script>
            // jquery-3.6.0.js这个库为我们提供了一个对象 jQuery
            // 我们所有的操作都是jQuery这个对象身上的，所有的jQuery的属性也好，方法也好，都是这个对象身上的。
            console.log(jQuery)
            // 对jQuery对象还提供了另一种写法，这个写法也是今后经常使用的
            console.log($ == jQuery)  // true

            /*那么我们的代码应该放在哪里呢？
            jQuery给我们提供了一个方法——ready("我们的代码"),这个方法是作用在document身上的
            根据传递进去的参数的不同，jQuery做的事情是完全不一样。
            现在：$(document)，传递的是document的对象，此时就表示获取到这个document对象了。
            */                          
           $(document).ready(function() {
               var box = document.getElementById("box");
               console.log(box);
           });
           /*现在<script>标签是放置在dom元素的上方，如果我们需要获取这个dom元素需要使用window.onload(),或者说其他的方式获取，总是不能够直接获取。*/
            //    如果我们现在这么写:
            //     <script>
            //          var box = document.getElementById("box"); 
            //          console.log(box);
            //     </>是不会奏效的
           /*由此我们可以知道jQuery的ready()方法是有 window.onload()的效果的。*/

           // ** 上述方法的其他写法1：
           $().ready(function() {
               var box = document.getElementById("box");
               console.log(box);
           });

           // ** 上述方法的其他写法2：
           $(function() {
               var box = document.getElementById("box");
               console.log(box);
           });
           // 从上述代码可知，>>>>> $ <<<<< 的意义真的是十分的重大。
        </script>
    </head>

    <body>
        <div id="box"></div>
    </body>
</html>
```

#### Two

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <!--使用jQuery的第一步，引入jQuery文件-->
        <script src="js/jquery-3.6.0.js"></script>
        <!--jQuery代码的书写位置-->
        <script>
            // jquery-3.6.0.js这个库为我们提供了一个对象 jQuery
            // 我们所有的操作都是jQuery这个对象身上的，所有的jQuery的属性也好，方法也好，都是这个对象身上的。
            console.log(jQuery)
            // 对jQuery对象还提供了另一种写法，这个写法也是今后经常使用的
            console.log($ == jQuery)  // true

            /*那么我们的代码应该放在哪里呢？
            jQuery给我们提供了一个方法——ready("我们的代码"),这个方法是作用在document身上的
            根据传递进去的参数的不同，jQuery做的事情是完全不一样。
            现在：$(document)，传递的是document的对象，此时就表示获取到这个document对象了。
            */                          
           $(document).ready(function() {
               var box = document.getElementById("box");
               console.log(box);
           });
           /*现在<script>标签是放置在dom元素的上方，如果我们需要获取这个dom元素需要使用window.onload(),或者说其他的方式获取，总是不能够直接获取。*/
            //    如果我们现在这么写:
            //     <script>
            //          var box = document.getElementById("box"); 
            //          console.log(box);
            //     </>是不会奏效的
           /*由此我们可以知道jQuery的ready()方法是有 window.onload()的效果的。*/

           // ** 上述方法的其他写法1：
           $().ready(function() {
               var box = document.getElementById("box");
               console.log(box);
           });

           // ** 上述方法的其他写法2：
           $(function() {
               var box = document.getElementById("box");
               console.log(box);
           });
           // 从上述代码可知，>>>>> $ <<<<< 的意义真的是十分的重大。
        </script>
    </head>

    <body>
        <div id="box"></div>
    </body>
</html>
```

#### Three

```html
<!DOCTYPE html>
<html lang="en">
    <!--使用原生JS和jQuery分别实现按钮的控制div-->
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <button id="btn">按钮</button>
    <div id="box"></div>
    <!--JS-->
    <!-- <script>
        var btn = document.getElementById("btn");
        btn.onclick=function() {
            // 创建div元素
            var div = document.createElement("div");
            // 设置div的css样式
            div.style.width="100px";
            div.style.height="100px";
            div.style.background="green";
            // 将div元素添加到body中
            document.body.appendChild(div);
        }
    </script> -->

    <!--jQuery-->
    <script>
        // 通过jQuery选择器获取id="btn"的dom，绑定点击事件
        $("#btn").click(function() {
            // 创建div元素，并添加css样式
            $("<div>").css({
                width:"100px",
                height:"100px",
                background:"green"
            }).appendTo("body");// 将设置好的div元素添加到body中
        });  
    </script>
</body>
</html>
```

#### Four

```html
<!DOCTYPE html>
<!--jQuery特点-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>

    <!--特点1： jQuery强大的选择器 -->
    <ul id="ul-id" class="ul-class">
        <li>red</li>
        <li>green</li>
        <li name="blue">blue</li>
        <li name="yellow">yellow</li>
    </ul>
    <script>
        // 通过jQuery的选择器获取第一个li元素

        /*第一种方式*/
        var li = $("ul li:nth-child(1)");
        // 只设置一条css样式，可以不用写{},直接给key,value对即可
        li.css("background", "red");

        /*第二种方式*/
        var li2 = $("#ul-id li:first-child");
        li2.css("background", "pink");

        /*第三种方式，选择第二个li*/
        var li3 = $(".ul-class li:first-child + li");
        li3.css("background", "green");

        /*第三种方式，选择第三个li*/
        var li4 = $("li[name=blue]");
        li4.css("background", "blue");

        /**
         *其实上述写法就相当于是： document.querySelector("选择")
         * 这里的 "选择" 可以用上述写法的任何一个表达式替换
         * querySelector()中放的是css3的选择器，当然css2也没有问题
         *但是，jQuery中的选择器更加的强大，jQuery支持的选择器querySelector()是不一定支持的
         */
        var li5 = document.querySelector("li[name=yellow]");
        li5.style.background="yellow";
    </script>


    <!--特点2： 链式操作-->
    <p class="text"></p>
    <p class="content"></p>
    <script>
        // 选择class=text的元素，通过.html()【相当于innerHTML属性】设置文本
        $(".text").html("呆小甜");
        /**
         *链式操作，就是可以叠加操作。通过 .xxx的方式可以一直叠加操作。 
         */
        $(".content").html("胖小甜").css("border", "5px solid pink").width(200).height(200).css("background", "purple");
        /**
         *那么链式操作的原理是什么呢？
         * jQuery中封装的所有方法都有一个返回值，返回的就是通过选择器取到的对象。
         * 也就是说_ .html()的返回值为$(".contetent")
         *          .css()的返回值为$(".contetent")
         *          .xxx()的返回值都是选择器选择到的对象。
         * 其实链式操作的原理很简单，就是通过return来搞定的。
         */
    </script>
</body>
</html>
```

#### Five

```html
<!DOCTYPE html>
<!--原生JS获取到的对象与jQuery获取到的对象有什么不同-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <h1>Hello.</h1>

    <!--原生JS获取到的对象与jQuery取到的对象的对比-->
    <script>
        var h1 = document.querySelector("h1");
        var $h1 = $("h1");
        console.log(h1 == $h1); // false
        
        console.log(h1); // <h1>Hello.</h1>
        console.log($h1); // jQuery.fn.init [h1, prevObject: jQuery.fn.init(1)] 数组。

        h1.style.color="red"; // 原生JS设置css样式的方式
        $h1.css("color", "green"); // jQuery设置css样式的方式

        // 那么如下这么写可以吗？
        // h1.css("color", "red"); // 报错：Uncaught TypeError: h1.css is not a function。原生的JS对象不能使用jQuery里的方法
        // $h1.style.color = "green"; // 报错：Uncaught TypeError: Cannot set property 'color' of undefined。jQuery对象也不能使用原生JS的方法

        // 那么两者能不能相互转换呢？ 可以的。
        /*原生JS转jQuery，将原生JS对象放入$()中*/
        $(h1).css("color", "blue");
        /*jQuery转原生JS，由于jQuery对象是一个数组，直接通过下标的形式获取即可*/
        $h1[0].style.color="purple";
    </script>
</body>
</html>
```

