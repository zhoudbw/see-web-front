## 自定义插件

众多的jQuery插件，这些插件都是我们的小伙伴写的，小伙伴可以写，当然我们也可以写。

在我们的项目中，有些功能的使用频率可能是非常的高，这个时候我们就可以将这个功能写成一个插件。在用的地方，引入这个文件，然后调用方法，传递一些必要的参数，这个功能就出现了，用起来66的，这样可以提高我们的工作效率，重复的东西就不用重复的去写。

### jQuery拓展方法的两种方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <script>
        /**
         * 自定义插件有两种方式：
         *  1. 给jQuery对象本身拓展方法 —— jQuery本身加方法 （使用方式：$.method()）
         *  2. 给jQuery DOM对象拓展方法 —— 页面上获取到的DOM对象加方法 （使用方式： $("选择器").method()）
         */
    </script>

    <script>
        // 给jQuery本身拓展方法，通过extend()方法
        // 参数为对象，传递需要拓展的方法即可。
        $.extend({
            lg: function(value) {
                console.log(value);
            },
            lg2: function(value2) {
                console.log(value2);
            }
        });
        // 调用extend()拓展的方法
        $.lg("胖小甜");
        $.lg2("呆小甜");
    </script>

    <h1>肥小甜</h1>
    <script>
        // 方式1：给DOM对象拓展方法，通过$.fn.extend()方法
        // 参数为对象，传递需要拓展的方法即可
        $.fn.extend({
            changeColor: function() {
                // $(this) 指向使用的DOM对象，更加的灵活
                $(this).css("color", "red");
                return $(this); // 返回该对象，支持链式调用 
            }
        })
        // 方式2：给DOM对象拓展方法，通过$.fn.method= function(){}方法
        $.fn.changeSize = function() {
            $(this).css("fontSize", 50);
            return $(this);
        }

        // 调用fn拓展的方法
        $("h1").changeColor().changeSize();
    </script>
</body>
</html>
```

### 封装一个拖拽的插件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- html演示结构 -->
    <style>
        #box, #drag{
            width: 200px;
            height: 200px;
            background: green;
        }

        #drag {
            background: skyblue;
        }
    </style>
    <div id="box"></div>
    <div id="drag"></div>

    <!-- 封装拖拽的插件 -->
    <script>
        $.fn.draggable = function (options) {
            // 处理options不传参的情况，用户如果传参那么值为options，否则为空对象{}
            options = options || {};
            // 处理options传参，但是传参不完全的情况
            options.limit = options.limit || false;

            /*将this存储起来,确保每次使用的都是我们需要的DOM对象*/
            var This = $(this);

            // 修改DOM元素的样式,拖拽需要left值和top值,就要用到定位
            // 但是为了用户简单,给我一个div我来处理其他的东西
            $(this).css({
                position: "absolute",
                left: 0,
                top: 0,
                cursor: "move", // 改变鼠标的样式
            });

            // 记录鼠标点击下的位置,使用鼠标移动的位置,然后做减法,就可以知道拖拽到哪里了.
            $(this).mousedown(function (ev) {
                // ev.pageX是jQuery内封装好的获取鼠标距离左边距的距离
                // ev.pageY是jQuery内封装好的获取鼠标距离上边距的距离
                var disX = ev.pageX - $(this).offset().left;
                var disY = ev.pageY - $(this).offset().top;

                // 严谨:让移动在我们可见范围内,使用$(document)
                $(document).mousemove(function (ev) {
                    // 移动过程中需要使用事件对象ev,因为需要获取移动的位置
                    var l = ev.pageX - disX;
                    var t = ev.pageY - disY;

                    /* 限制有范围的拖拽,对l和t进行处理 */
                    // 如果用户传递了limit:true,就要处理拖拽的范围了
                    if (options.limit) {
                        if (l < 0) {
                            l = 0; // 限制左边的范围
                        } else if (l > $(document).innerWidth() - This.outerWidth) {
                            l = $(document).innerWidth() - This.outerWidth(); // 限制右边的范围
                        }

                        if (t < 0) {
                            t = 0; // 限制上边的范围
                        } else if (t > $(document).innerHeight() - This.outerHeight) {
                            t = $(document).innerHeight() - This.outerHeight(); // 限制右边的范围
                        }
                    }

                    // $(this) // 这个this是指document,而不是DOM对象,不可用
                    This.css({
                        left: l,
                        top: t,
                    });

                }); // 鼠标移动事件

                // 鼠标抬起事件
                $(document).mouseup(function () {
                    // 接触事件
                    $(this).off();
                });
                // 清除事件的默认行为,拖拽文字的时候可能会出现这个问题
                return false;

            }); // 鼠标按压事件
        };
    </script>

    <script>
        // 调用封装的拖拽插件
        $("#box").draggable({
            // 扩展一个参数，限制拖拽范围
            limit: true,
        });

        // 调用封装的拖拽插件
        $("#drag").draggable();
    </script>

</body>

</html>
```

### 结语

虽然写了很多的内容，但是不能面面俱到。所谓“授人以鱼不如授人以渔”，在今后如果遇到jQuery中陌生的API，要学会看文档，找资料。相信有了上述基础，再看jQuery对你来说，应该不在晦涩难懂。