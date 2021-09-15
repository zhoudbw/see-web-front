## 事件

事件是很重要的，我们平时所作的交互都离不开事件。jQuery中对事件进行了很丰富的封装以及扩展，使用起来更加的方便和便捷。

### 01 绑定事件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>

<body>
    <button id="btn1">事件名称函数</button>
    <button id="btn2">通过on添加</button>
    <div id="btn3">
        <h2 class="title">标题</h2>
        <p>段落</p>
    </div>
    <div id="btn4">
        <button>通过one添加</button>
    </div>
    <script>
        // 绑定事件1：通过事件名称函数（jQuery将全部的原生事件封装成了一个个函数，这个函数的名字就是原生事件的名字）
        /* 如：事件名称函数 mouseover() 鼠标放置在该元素上时，触发事件 */
        $("#btn1").mouseover(function () {
            $(this).css(
                "background", "orange"
            ); // this表示当前对象，也就是发生事件的对象。对应的就是$("#btn")
        }) // 触发事件之后，所要做的事情通过参数传递进去。
            /* 事件名称函数 mouseout() 鼠标离开该元素时，触发事件 */
            // -->> 链式操作接着写 <<--
            .mouseout(function () {
                $(this).css("background", "grey");
            });

        // 绑定事件2：通过on添加
        /**
         * jQuery对于on的封装是非常非常充足的，很多的功能。
         * 如果我们的事件有一些非常复杂的交互的时候，建议使用on添加事件。
         * on使用方式：在选中的元素上绑定一个或者多个处理函数。
         * on可以传递的参数：
         * >>> ① 事件的名称 "string类型"
         * 
         * >>> ② 处理事件的函数 "function类型"
         * 
         * >>> ③ 事件发生时可能要丢进去一些数据，这个数据就是通过这个参数丢进去的  "object类型"
         * 比如说：处理点击事件，改事件需要数据交互请求过来的参数。传递的形式是{"k1":"v1", "k2":"v2",...}的键值形式。
         * 此时，为了可以拿到传递进来的参数，就需要对function()进行传参，传递事件对象event。
         * event.data获取到的就是传递进来的参数对象。通过event.data.属性，就拿到了想要的值。
         * 
         * >>> ④ 决定哪个子元素能够触发通过事件委托绑定在父级身上的事件  "选择器" 
         * 该参数和事件委托相关。事件委托：想要将是事件添加到某个子元素，但是添加的时候并不是直接添加到这个子元素，而是添加到父元素。
         * 通过父级触发事件之后，然后去找寻该事件源是否是我们给定的事件源，如果是，那么执行函数；如果不是，那么不执行。
         */
        // 传递参数 ① ②
        $("#btn2").on("click", function () {
            $(this).css("background", "blue");
        });
        // 传递参数 ① ② ③
        $("#btn2").on("click", { name: "tian" }, function (event) {
            console.log(event.data.name)
        });
        // 传递参数 ① ② ③ ④
        // 此时事件是添加到"#btn3"上面的，添加事件源为".title"元素，所以能够触发事件的是该子元素。
        $("#btn3").on("click", ".title", {color:"red"}, function(event) {
            // 此时this指代的是.title对应的元素, 注意1px solid 空格
            $(this).css("border", "3px solid " + event.data.color);
        });

        // on 可以添加多个事件
        $("#btn2").on({
            mouseover: function() {
                $(this).css("background", "pink");
            },
            mouseout: function() {
                $(this).css("background", "cyan");
            }
        });

        // 绑定事件3：通过.bind()，该方法在1.7的时候就被弃用了。 语法和on是一样的

        // 绑定事件4：通过one()添加事件。one()添加的时间只会被触发一次，触发完之后事件就被清除了。
        $("#btn4").one("click", "button", {color:"purple"}, function(event) {
            // 事件委托。
            $(this).css("background", event.data.color);
            console.log("Just print one time...");
        });
    </script>
</body>
</html>
```

### 02 解除事件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>

<body>
    <button id="btn1">事件名称函数</button>
    <!--解除事件-->
    <button id="btn5">解除全部事件</button>
    <button id="btn6">解除mouseover事件</button>
    <script>
        $("#btn1").mouseover(function () {
            $(this).css(
                "background", "orange"
            );
        }).mouseout(function () {
            $(this).css("background", "grey");
        });

        // 解除事件 off()
        $("#btn5").click(function() {
            $("#btn1").off(); // 没有传递参数会#btn1的所有事件全部解除
            console.log("事件已全部解除...");
        });

        $("#btn6").click(function(){
            $("#btn1").off("mouseover"); // 指定解除哪个事件
            console.log("mouseover事件已解除...")
        });
        
    </script>
</body>

</html>
```

### 03 手动触发绑定事件

#### 03-01 默认行为

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>

<body>
    <button id="btn1">事件名称函数</button>
    <!--解除事件-->
    <button id="btn5">解除全部事件</button>
    <button id="btn6">解除mouseover事件</button>
    <script>
        $("#btn1").mouseover(function () {
            $(this).css(
                "background", "orange"
            );
        }).mouseout(function () {
            $(this).css("background", "grey");
        });

        // 解除事件 off()
        $("#btn5").click(function() {
            $("#btn1").off(); // 没有传递参数会#btn1的所有事件全部解除
            console.log("事件已全部解除...");
        });

        $("#btn6").click(function(){
            $("#btn1").off("mouseover"); // 指定解除哪个事件
            console.log("mouseover事件已解除...")
        });
        
    </script>
</body>

</html>
```

#### 03-02 执行事件的元素数量

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>

<body>
    <!-- 区别2：执行事件的元素数量 -->
    <ul id="color">
        <li>red</li>
        <li>green</li>
        <li>blue</li>
        <li>yellow</li>
    </ul>
    <script>
        // 区别2：trigger()会执行所有选中元素的事件。triggerHandler()只会执行第一个元素的事件。
        $("#color li").click(function () {
            // index()方法可以获取到元素的索引。
            console.log($(this).html() + " " + $(this).index())
        });
        // 使用trigger()手动触发
        setTimeout(function () {
            $("#color li").trigger("click");
        }, 2000);
        // 使用triggerHandler()手动触发
        setTimeout(function () {
            $("#color li").triggerHandler("click");
        }, 2500);
    </script>
</body>

</html>
```

#### 03-03 是否冒泡

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>

<body>
    <!-- 区别3：是否冒泡 -->
    <div id="bubble">
        <h2><span>呆小甜</span></h2>
    </div>
    <script>
        // 区别3：trigger()会冒泡；triggerHandler()不会冒泡
        $("#bubble h2").click(function() {
            console.log("h2被点击了")
        });
        $("#bubble span").click(function() {
            console.log("span被点击了")
        });
        /**
         * 点击“呆小甜”后的执行效果：
         *     span被点击了
         *     h2被点击了
         * 事件会跟着事件流式的一层一层的往上冒泡。
         */
        
         // 通过trigger()触发的效果
         setTimeout(() => {
             $("#bubble span").trigger("click");
         }, 2000);
         // 通过triggerHandler()触发的效果
         setTimeout(() => {
             $("#bubble span").triggerHandler("click");
         }, 2000);
    </script>
</body>

</html>
```

#### 03-04 链式操作

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>

<body>
    <!-- 区别4：链式操作 -->
    <button id="btn">链式操作</button>
    <br>
    <br>
    <button id="btn2">triggerHandler支持链式法则</button>
    <script>
        // 区别4：trigger()可以使用链式操作，triggerHandler()不可以使用链式操作。
        $("#btn").on({
            mouseover: function() {
                $(this).css("width", "200px");
                console.log("become wide...");
            },
            mouseout: function() {
                $(this).css("height", "200px");
                console.log("become high...");
            }
        });

        // trigger()支持链式操作
        setTimeout(() => {
            $("#btn").trigger("mouseover").trigger("mouseout");
            console.log("trigger() 链式操作可执行...");
        }, 2000);

        // // triggerHandler()不支持链式操作
        // setTimeout(() => {
        //     $("#btn").triggerHandler("mouseover").triggerHandler("mouseout");
        //     // 链式法则不可用，因为trigger()执行完之后返回的是选择到的元素，
        //     // 而triggerHandler()执行后返回的并不是选中的对象，而是最后一个方法执行的返回值，
        //     // 在本例中也就是css()执行后返回的对象。
        // }, 3000);

        /**
         * 链式法则的关键就在于方法执行完之后，返回的对象还是本身。
         * 所以想要triggerHandler()能够满足链式法则很简单，就是返回自身对象。
         */
         $("#btn2").on({
            mouseover: function() {
                $(this).css("width", "200px");
                console.log("become wide...");
                return $(this)  // 返回当前对象。没有return返回的就是undefined
            },
            mouseout: function() {
                $(this).css("height", "200px");
                console.log("become high...");
            }
        });
        // 让triggerHandler()支持链式法则
        setTimeout(() => {
            $("#btn2").triggerHandler("mouseover").triggerHandler("mouseout");
            console.log("triggerHandler() 链式操作可执行...");
        }, 3000);

    </script>
</body>

</html>
```

### 04 事件对象

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        button {
            font-size: 20px;
            color: #fff;
            line-height: 40px;
            padding: 0 15px;
            background: green;
            border: 1px solid grey;
        }
    </style>
</head>
<!-- 事件对象 -->
<!-- 在jQuery中，对JS中的事件对象进行了重新的封装。添加了一些属性，改变了很多的东西。-->
<button id="btn">jQuery事件对象</button>
<button id="btn2">JS事件对象</button>

<script>
    // jQuery事件对象
    $("#btn").click(function(event) {
        console.log(event);
    });
    // JS事件对象
    $("#btn2")[0].onclick=function(ev) {
        console.log(ev);
    };
</script>
<body>
  
</body>
</html>
```

