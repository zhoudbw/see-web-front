## jQuery选择器

### 01 基础选择器

```html
<!DOCTYPE html>
<!--基础选择器-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        ul{
            width: 500px;
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li{
            padding: 20px;
            margin-top: 10px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <!--基础选择器-->
    <ul id="list1">
        <li>red</li>
        <li class="red">red</li>
        <li>red</li>
        <li>red</li>
        <li>red</li>
    </ul>
    <ul id="list2">
        <li>red</li>
        <li>red</li>
        <li class="red">red</li>
        <li>red</li>
        <li>red</li>
    </ul>
    <p class="red">red</p>

    <script src="js/jquery-3.6.0.js"></script>
    <!--/*选择器都是放在$()中*/-->
    <script>
        // 基础选择器
        // 注意选择器选择到的对象是一个集合（数组），即使id选择器只选择中了一个，那也是集合。
        $("#list1").css("background", "green");    // id选择器，       表达式为 #id值
        $(".red").css("background", "grey");       // class选择器，    表达式为 .class值
        $("li").css("border", "5px solid pink");   // 标签选择器，    　表达式为 标签值
        // $("*").css("border", "2px solid orange");  // 通配符选择器，    表达式为 *
        $("li, p").css("color", "hotpink");         // 群组选择器 　     表达式为 选择器表达式1,选择器表达式2,选择器表达式3,...
    </script>
</body>
</html>
```

### 02 层级选择器

```html
<!DOCTYPE html>
<!--层级选择器-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        body{
            padding-bottom: 1000px;
        }
    </style>
</head>
<body>
    <!--层级选择器-->
    <div>
        <a href="#" class="link">链接</a>
        <a href="#">链接</a>
        <a href="#">链接</a>
        <a href="#">链接</a>
        <p>
            <a href="#">链接</a>
        </p>
    </div>
    <script>
        // 层级选择器、 包含选择器、子元素选择器
        $("div a").css("color", "green"); // 表示选择div下的a元素。               空格表示下级的含义。可以是下一级，下两级，下三级...
        $("div>a").css("color", "red");   // 表示选择div下一级的a元素（儿子）。     大于表示下级的含义。只可以是下一级。
        $("div a.link + a + a").css("color", "purple");//表示选择div下的class=link的a元素的下一个a元素。 加号表示同级且同类型（换言之也就是将选中的a元素向后平移1个）
        $("div a.link ~ a").css("color", "blue");//表示选择div a.link下的所有同级的a元素。 波浪号表示选择同级(兄弟)标签下的所有指定元素
    </script>
</body>
</html>
```

### 03 属性选择器

```html
<!DOCTYPE html>
<!--属性选择器-->
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        li {
            padding: 20px;
            margin-top: 10px;
            border: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <!--属性选择器-->
    <ul id="ulColor">
        <li class="red">color</li>
        <li title="blue">color</li>
        <li title="css-1">color</li>
        <li id="color1-green">color</li>
        <li id="red-1color">color</li>
        <li lang="encnhk">color</li>
        <li lang="en cn">color</li>
        <li class="cl" name="tianben">color</li>
    </ul>

    <script>
        // 属性选择器
        $("#ulColor li[class]").css("background", "pink"); // 找到id=ulColor下有class属性的li
        $("#ulColor li[title=blue]").css("background", "blue"); // 找到id=ulColor下属性class等于blue的li
        $("#ulColor li[title!=blue]").css("background", "yellowgreen"); // 找到id=ulColor下属性title不等于blue的li
        $("#ulColor li[title|=css]").css("background", "darkgreen"); // 找到id=ulColor下属性title的值以css为前缀的li。前缀 xxx- 必须有横线才是前缀
        $("#ulColor li[id^=color]").css("background", "hotpink"); // 找到id=ulColor下的id的值以color开头的li。
        $("#ulColor li[id$=color]").css("background", "purple"); // 找到id=ulColor下的id的值以color结尾的li。
        $("#ulColor li[lang*=cn]").css("background", "olive"); // 找到id=ulColor下的属性lang的值包含cn的li。
        $("#ulColor li[lang~=cn]").css("background", "skyblue"); // 找到id=ulColor下的属性lang的值包含cn这个单词(也就是说必须有空格分隔)的li。
        $("#ulColor li[class=cl][name=tianben]").css("background", "teal"); // 找到id=ulColor下的属性class=cn且name=tianben的li。-> 条件更严格了。
    </script>
</body>
</html>
```

### 04 基础过滤选择器

```html
<!DOCTYPE html>
<!--基础过滤选择器-->
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        li {
            padding: 20px;
            margin-top: 10px;
            border: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <!--基础过滤选择器  相当于if(){if(){}}if中又嵌套了一个if条件。
    从一堆中再过滤。-->
    <ol id="olColor">
        <li>color</li>
        <li>color</li>
        <li>color</li>
        <li lang="en">color</li>
        <li id="tar">color</li>
        <li>color</li>
        <li>color</li>
        <li>color</li>
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
    </ol>
    <script>
        // 基础过滤选择器 /* 格式：选择到的元素:过滤条件 */
        // 索引值从0开始， eq = equal、gt = great than、 lt = less than
        $("#olColor li:eq(1)").css("border", "5px solid pink"); // 得到id=olColor元素下的所有li元素 :(过滤) 索引值等于1的li元素
        $("#olColor li:gt(1)").css("border", "5px solid grey"); // 得到id=olColor元素下的所有li元素 :(过滤) 索引值大于1的li元素
        $("#olColor li:lt(1)").css("border", "5px solid yellowgreen"); // 得到id=olColor元素下的所有li元素 :(过滤) 索引值小于1的li元素
        // 过滤选择器其实就是冒号(:)，左边是选择到的元素，右边是过滤的条件。

        $("#olColor li:not(#olColor li:eq(2))").css("border", "5px solid darkgreen"); // not(选择中的元素)，表示排除。排除传递在not(选择中的元素)。这里除了索引为2的li，其他的都被选择中了。
        $("#olColor li:even").css("border", "5px solid hotpink"); // 选择索引为偶数的li元素
        $("#olColor li:odd").css("border", "5px solid purple"); // 选择索引为奇数的li元素
        $("#olColor li:first").css("border", "5px solid olive"); // 选择第一个li元素
        $("#olColor li:last").css("border", "5px solid skyblue"); // 选择最后一个li元素
        $("#olColor li:lang(en)").css("border", "5px solid teal"); // 选择指定语言的所有元素，也就是有通过lang属性指定语言。
        $("#olColor li:target(tar)").css("border", "5px solid yellow"); // 选择锚点，通过id属性来定位。想要看到锚点效果，访问：http://127.0.0.1:5500/src/02-jQuery选择器/index4.html#tar

        $(":root").css("border", "8px solid blue"); // 选择根节点，也就是html元素。
        $(":header").css("border", "5px solid darkgreen"); // 选择h元素，也就是<h1><h2>...
    </script>
</body>
</html>
```

### 05 子元素过滤选择器

```html
<!DOCTYPE html>
<!--子元素过滤器-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--子元素过滤器-->
    <div id="paragraph">
        <p>1 段落</p>
        <p>2 段落</p>
        <span>3 段落</span>
        <p>4 段落</p>
        <span>5 段落</span>
        <p>6 段落</p>
        <span>7 段落</span>
    </div>
    <div id="only">
        <p>唯一的一个子元素</p>
    </div>
    <div id="only-two">
        <span>span</span>
        <p>p</p>
    </div>
    
    <script>
        // 子元素过滤器 格式： 选择中的元素:过滤条件
        $("#paragraph p:first-child").css("color", "pink"); // 从选择中的p元素中选择第一个子元素，而且这个子元素在原位置中是第一位。（条件很严格） 
        $("#paragraph span:first-of-type").css("color", "yellowgreen"); // 选择到父级下的第一个span元素，不需要严格第一位，是第一个出现的就行。

        $("#paragraph span:last-child").css("color", "darkgreen"); // 最后一个span元素。（条件很严格） 
        $("#paragraph p:last-of-type").css("color", "hotpink"); // 最后一个p元素。（条件不严格）

        $("#paragraph p:nth-child(2)").css("color", "purple"); // 选择到第二个子元素，但是第二个子元素必须是p元素（条件严格）
        $("#paragraph span:nth-of-type(2)").css("color", "olive"); // 选择到第二个子元素（条件不严格）

        $("#only p:only-child").css("color", "skyblue"); // 当该父级元素的子元素只有唯一一个时，该子元素可以被选择（挑剔）。

        $("#only-two span:only-of-type").css("color", "teal"); // 该父级元素的子元素可以有多个，但是被选择的子元素只能有一个（宽松挑剔）。
    </script>
</body>
</html>
```

### 06 内容过滤选择器

```html
<!DOCTYPE html>
<!--内容过滤选择器-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--内容过滤选择器-->
    <div id="content">tian</div>
    <div></div>
    <div id="has">
        <div>
            <p>段落</p>
        </div>
    </div>
    <div>
        <h1 id="title">大标题</h1>
    </div>

    <script>
        // 内容过滤选择器
        $("#content:contains(tian)").css("color","blue"); // 选择id=content的元素，并且该元素包含 “tian”这个内容
        $("div:empty").css({
            width:"100px",
            height:"100px",
            background:"green"
        }); // 选择div元素，并且div元素是空的（什么内容都没有）
        $("#has:has(p)").css("border", "1px solid blue"); // 选择id=has的元素，并且有p元素。（有就行，不用管是儿子还是孙子）
        $("#title:parent").css("border", "1px solid #f00"); // 选择id=title的元素的父级元素。 
    </script>
</body>
</html>
```

### 07 表单过滤选择器

```html
<!DOCTYPE html>
<!--表单过滤选择器-->
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--表单过滤选择器-->
    <input type="button" value="按钮1">
    <button>按钮2</button>
    <div id="sex">
        <input type="checkbox">男
        <input type="checkbox">女
    </div>
    <div>
        <input type="checkbox" checked>男
        <input type="checkbox">女
    </div>
    <script>
        // 表单过滤选择器
        $(":button").css("border", "2px solid #f0f") // 选择所有的按钮，包括<button>、<input type="button">
        /* 选择id=sex且input的type=checkbox的元素，由于 checkbox是没有办法直接设置元素的，所以我们通过warp()方法，在checkbox外面包一层父级<span>
            那么现在就是这样：<span style="border: 2px solid purple;"><input type="checkbox"></span> 。
            还需要注意的是，jQuery的链式操作还是操作选择中的元素，这里选择到的是checkbox是不能设置元素的，我们要获取其父元素，通过parent()方法，
            然后为其父元素设置css样式*/
        $("#sex input:checkbox").wrap("<span></span>").parent().css("border", "2px solid purple");
        $(":checked").wrap("<span></span>").parent().css("border", "2px solid pink") // 选择已经被选中的复选框
        /*还有很多，直接查文档就好了。*/
    </script>
</body>
</html>
```

### 08 可见性过滤选择器

```html
<!DOCTYPE html>
<!--可见性过滤选择器-->
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        div {
            width: 100px;
            height: 100px;
            margin: 5px;
            border: 3px solid green;
            float: left;
        }

        .is-hidden {
            display: none;
        }
    </style>
</head>

<body>
    <!--
        $(":hidden")选择所有隐藏的元素
            元素可以被认为是隐藏的几个情况：
                CSS display值是none。
                type="hidden"的表单元素。
                宽度和高度都显式设置为0。
                一个祖先元素是隐藏的，因此该元素是不会在页面上显示。
            元素visibility: hidden或opacity: 0被认为是可见的，因为他们仍然占据布局空间。

        $(":visible")选择所有可见的元素
            如果元素中占据文档中一定的空间,元素被认为是可见的。可见元素的宽度或高度，是大于零。
            元素的visibility: hidden 或 opacity: 0被认为是可见的，因为他们仍然占用空间布局。
    -->
    <button>显示不可见div</button>
    <!--可见的div-->
    <div></div>
    <div></div>
    <div></div>
    <!--不可见的div-->
    <div class="is-hidden"></div>
    <div style="display:none;"></div>
    <script>
        // 选择可见的div元素，点击时背景色变为粉色
        $("div:visible").click(function () {
            $(this).css("background", "pink");
        });
        // 点击按钮,见不可见div以动画形式显示出来
        $("button").click(function () {
            $("div:hidden").show("fast");
        });
    </script>
</body>
</html>
```

