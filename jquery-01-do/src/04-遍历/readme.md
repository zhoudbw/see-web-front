## 遍历

例如对于集合、数组等等的查看值的过程就是遍历，这是一个很基础，但也很重要的操作。jQuery中封装了很多遍历的方法，这些方法主要是操作DOM元素。比如说，获取到<li>标签，通过<li>可以取到其父节点、通过<li>可以取到其子节点、通过<li>可以获取到其兄弟节点，这些都是DOM操作。jQuery的遍历就是封装了很多这方面的方法。

### 01 获取后代元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li{
            padding: 10px 20px;
            border: 1px solid #ccc;
        }
        .mb{
            margin-bottom: 50px;
        }
    </style>
</head>
<body>

    <!--获取后代元素-->
    <ul class="child mb">
        <li>red</li>
        <li>
            <ul>
                <li>green</li>
                <li><span>blue</span></li>
            </ul>
        </li>
        <li><span>yellow</span></li>
    </ul>
    <script>
        // 获取后代元素，仅包括儿子元素，不包括孙子及孙子元素
        $(".child").children().css("border-color", "green");
        //　children(选择器)传递参数，用于限定选中子元素，本质就是过滤
        $(".child").children(":eq(1)").css("border-width", "3px");

        // find()不仅仅知道儿子元素，还找到孙子及孙子之后的元素，这才是真正的获取后代。
        $(".child").find("span").css({
            "font-size":"30px",
            color:"red"
        });
        // find()也可以接收参数
        $(".child").find("span:eq(0)").css({
            color:"blue",
        });
    </script>
</body>
</html>
```

### 02 获取祖先元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--获取祖先元素-->
    <ul class="parent mb" style="position: relative;">
        <li>
            <ul>
                <li>black</li>
                <li>orange</li>
                <li>gold</li>
            </ul>
        </li>
        <ii>grey</ii>
    </ul>
    <script>
        // 获取祖先元素，获取到的是所选元素的上一个父元素
        $(".parent li ul li:first").parent().css("border", "4px solid blue");
        // 传递元素，限制祖先元素的选择，比如这里，规定找到的父元素为div，显然找不到
        $(".parent li ul li:first").parent("div").css("border", "4px solid pink");

        // parents()方法，找到所有的祖先元素。区别和find()和children()相同
        $(".parent li ul li:first").parents().css("border", "2px solid purple");
        console.log($(".parent li ul li:first").parents().css("border", "2px solid purple")); // 找到的父级元素：0: ul 1: li 2: ul.parent.mb 3: body 4: html
        // 限制父级的范围
        $(".parent li ul li:first").parents("ul").css("border", "2px solid yellow");
        
        // parentUtil(限制参数)，需要传递参数，限制所能获取的祖先元素的范围，相当于parents()方法传参数
        $(".parent li ul li:first").parentsUntil("li").css("border", "2px solid blue");

        // 找有定位的父级。找到有距离自己最近的有定位元素的祖先元素，找到便停止。
        // 如果找不到，继续向上找，最终找到的就是html。和原生JS一样。
        $(".parent li ul li:first").offsetParent().css("border", "2px solid yellow");
    </script>
    <!--获取祖先元素.closest()-->
    <ul class="closest">
        <li>
            <ul>
                <li>pink</li>
                <li>green</li>
            </ul>
        </li>
    </ul>
    <script>
        // closest()也是用来获取祖先元素的
        $(".closest li ul li").closest("ul").css("border", "2px solid purple");

        // parents()和closest()的区别：
        // parents()获取到的祖先元素就是真正意义上的祖先元素，不包括自己。
        // closest()获取到的元素包括祖先元素也包括自己，不是真正意义上的祖先元素。
        $(".closest li ul li").parents("li").css("border", "5px solid purple");
        $(".closest li ul li").closest("li").css("border", "5px solid pink");
    </script>
</body>
</html>
```

### 03 获取兄弟元素

#### 03-01 获取后面、前面的兄弟

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li{
            padding: 10px 20px;
            border: 1px solid #ccc;
        }
        .mb{
            margin-bottom: 50px;
        }
    </style>
</head>
<body>
    <!--获取兄弟元素-->
    <!--o获取后面的兄弟元素o-->
    <ul class="next mb">
        <li>purple</li>
        <li>cyan</li>
        <li>
            <ul>
                <li>pink</li>
            </ul>
        </li>
        <p>brown</p>
        <div>skyblue</div>
    </ul>
    <!--o获取后面前面的兄弟元素o-->
    <ul class="prev mb">
        <div>skyblue</div>
        <p>brown</p>
        <li>
            <ul>
                <li>pink</li>
            </ul>
        </li>
        <li>cyan</li>
        <li>purple</li>
    </ul>
    <script>
        /* o获取后面的兄弟元素o */
        // next()获取选择到的元素后面第一个元素.
        // 可以传参固定选择，传参必须是后面第一个元素的类型。
        $(".next li:first").next("li").css("background", "yellow");
        // nextAll()获取选择到的元素后面所有的兄弟元素,
        // 可以传递参数，此时获取到的元素就是指定的条件筛选出来的了。
        $(".next li:first").nextAll().css("border", "2px solid #000");
        $(".next li:first").nextAll("p").css("border", "2px solid brown");
        // nextUntil(”限定条件“)，寻找时，找到限定条件限制的位置就不再找了。
        // 例子：找到选择元素在限定条件内的元素
        $(".next li:first").nextUntil("div").css("border", "3px solid orange");

        /* o获取前面的兄弟元素o */
        // 通过prev()、prevAll()、prevUntil()来获取前面元素
        // 和next()、nextAll()、nextUntil()对应
        $(".prev li:last").prev("li").css("background", "cyan");
        $(".prev li:eq(3)").prevAll("li").css("border", "2px solid #000");
        $(".prev li:eq(3)").prevUntil("div").css("border", "2px solid orange");
    </script>
</body>
</html>
```

#### 03-02 获取所有的兄弟

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--获取所有兄弟元素，不区分前后-->
    <ul class="siblings">
        <li>red</li>
        <li class="select">green</li>
        <li>blue</li>
        <li class="select">yellow</li>
        <li>
            <ul>
                <li>pink</li>
            </ul>
        </li>
    </ul>
    
    <script>
      $(".siblings li:eq(2)").siblings().css("border", "2px solid skyblue");
      $(".siblings li:eq(2)").siblings(".select").css("background", "yellow");
    </script>
</body>
</html>
```

