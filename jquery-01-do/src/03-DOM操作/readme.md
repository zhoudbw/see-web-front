## DOM操作

DOM操作是JS部分非常重要的组成部分。像让用户动一下鼠标、点击一下、按下键盘等等这些交互操作都离不开DOM操作。所以，DOM是非常重要的，jQuery对DOM操作进行了封装。对元素的属性的操作、对元素内容的操作等等这些也都属于DOM操作的范畴。

### 01 操作class

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        body{
            padding-bottom: 1000px;
        }
        .red{
            background: red;
        }
        .green{
            background: green;
        }
        .blue{
            background: blue;
        }
        .active{
            background: greenyellow;
        }
    </style>
</head>
<body>
    <!--操作class-->
    <div class="setClass">
        <ul>
            <li>red</li>
            <!--虽然该元素的class值为green和blue两个值，
            但是，只会显示出一个class值所表示的样式，
            其实，是按照出现的先后次序覆盖显示的，所以最终显示的是blue的样式-->
            <li class="green blue">green</li>
            <li class="red blue">blue</li>
        </ul>
        <p class="active">点击切换class</p>
    </div>
    <script>
        /*操作class*/
        // 通过选择器选中元素，使用addClass()方法为该元素添加class=red
        $(".setClass li:first").addClass("red"); 
        // 使用removeClass()移除所选元素的class值，如果不传递参数将移除所有的class，如果传递参数将移除指定class值
        $(".setClass li:eq(1)").removeClass("blue");
        console.log(
            // 使用hasClass(classValue)监测该元素是否有传递的class值
            $(".setClass li:last").hasClass("blue"), // true
            $(".setClass li:last").hasClass("orange"), // false
        );
        // 使用toggleClass()方法，对元素的class值实现删除和显示之间的切换
        $(".setClass p").click(function() {
            $(this).toggleClass();
        });
    </script>
</body>
</html>
```

### 02 插入元素

#### 02-01 内部插入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--插入元素，内部插入-->
    <div class="insideAdd">
        <p>在内部插入元素</p>
    </div>
    <p class="outside">在insertAdd外部</p>
    <script>
        // 插入元素，内部插入
        /**
         * 执行了下面方法之后，生成的html代码如下：
         * <div class="insideAdd">
         *     <p>在内部插入元素</p>
         *     <!--创建了一个h2元素-->
         *     <h2>append方法内部插入</h2>
         * </div>
         */ 
        $(".insideAdd").append('<h2>append()方法内部插入</h2>');

        /**
         * 执行了下面方法之后，相当于是将选择中的元素，剪切插入到元素内部。生成的html代码如下：
         * <div class="insideAdd">
         *     <p>在内部插入元素</p>
         *     <h2>append()方法内部插入</h2>
         *     <!--该元素来自页面本身-->
         *     <p class="outside">在insertAdd外部</p>
         * </div>
         */
        $(".insideAdd").append($(".outsideP"));

        /**
         * appendTo()插入到。和append()插入。刚好相反。
         * append()是先找到父级元素，然后传递子元素参数，表示将子元素插入父元素。
         * appendTo()是先找到子元素，然后传递父元素参数，标记将子元素插入到父元素。
         *    注意：appendTo()传递的参数是"选择器表达式"
         */
        $("<h2>appendTo()方法内部插入</h2>").appendTo(".insideAdd");

        /**
         * append()、appendTo()都是插入到已有元素的后面。
         * 而prepend()是插入到已有元素的前面。prepend()语法与append()一致。 
         * prepend()生成的html代码如下：
         * <div class="insideAdd">
         *    <h2>prepend()方法内部插入</h2>
         *    <p>在内部插入元素</p>
         *    <h2>append()方法内部插入</h2>
         *    <h2>appendTo()方法内部插入</h2>
         * </div>
         */
        $(".insideAdd").prepend("<h2>prepend()方法内部插入");

        /**
         * prependTo()也是插入到已有元素的前面。prependTo()语法与appendTo()一致。
         */
        $("<h2>prependTo()方法内部插入</h2>").prependTo(".insideAdd");
    </script>
</body>
</html>
```

#### 02-02 外部插入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!--插入元素，外部插入-->
    <div class="outsideAdd">
        <h2>在外部插入元素</h2>
    </div>
    <script>
        /*插入元素，外部插入*/

        /**
         * after()方法和insertAfter()方法的区别与append()方法和appendTo()方法相同
         * 就是，先选择要插入的位置还是先选择要插入的元素的区别。
         */
        // after()方法，将元素添加到所选元素的后面。 
        $(".outsideAdd h2").after("<p>after()方法添加元素到h2后面");
        // insertAfter()方法，将元素添加到所选元素的后面。
        $("<p>insertAfter()方法添加元素到h2后面</h2>").insertAfter(".outsideAdd h2");
        // before()方法，将元素添加到所选元素的前面。 
        $(".outsideAdd h2").before("<p>before()方法添加元素到h2前面");
        // insertBefore()方法，将元素添加到所选元素的前面。
        $("<p>insertBefore()方法添加元素到h2前面</h2>").insertBefore(".outsideAdd h2"); 
    </script>
</body>
</html>
```

#### 02-03 插入元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!--插入元素，外部插入-->
    <div class="outsideAdd">
        <h2>在外部插入元素</h2>
    </div>
    <script>
        /*插入元素，外部插入*/

        /**
         * after()方法和insertAfter()方法的区别与append()方法和appendTo()方法相同
         * 就是，先选择要插入的位置还是先选择要插入的元素的区别。
         */
        // after()方法，将元素添加到所选元素的后面。 
        $(".outsideAdd h2").after("<p>after()方法添加元素到h2后面");
        // insertAfter()方法，将元素添加到所选元素的后面。
        $("<p>insertAfter()方法添加元素到h2后面</h2>").insertAfter(".outsideAdd h2");
        // before()方法，将元素添加到所选元素的前面。 
        $(".outsideAdd h2").before("<p>before()方法添加元素到h2前面");
        // insertBefore()方法，将元素添加到所选元素的前面。
        $("<p>insertBefore()方法添加元素到h2前面</h2>").insertBefore(".outsideAdd h2"); 
    </script>
</body>
</html>
```

### 03 包裹元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--包裹元素-->
    <div class="wrap">
        <span>red</span>
        <span>green</span>
        <span>blue</span>
    </div>
    <script>
        // 包裹元素
        /**
         * 为所有选中的元素，逐个包裹一个父级元素。执行后代码如下：
         *  <li><span>red</span></li>
         *  <li><span>green</span></li>
         *  <li><span>blue</span></li>
         * 增加了<li>包裹在外面
         */
        $(".wrap span").wrap("<li>");

        /**
         * 为所有选中的元素，统一包裹一个父级元素。执行后代码如下：
         * <ul>
         *     <li><span>red</span></li>
         *     <li><span>green</span></li>
         *     <li><span>blue</span></li>
         * </ul>
         * 统一在元素外包裹了<ul>
         */
        $(".wrap li").wrapAll("<ul>");

        /**
         * 对所选中的元素的内部元素进行包裹。执行后的代码如下：
         * <ul>
         *     <li><span><strong>red</strong></span></li>
         *     <li><span><strong>green</strong></span></li>
         *     <li><span><strong>blue</strong></span></li>
         * </ul>
         * 对<span>内部元素增加了<strong>包裹
         */
        $(".wrap span").wrapInner("<strong>");
        
        /**
         * 删除所选元素的外部包裹元素(unwarp()方法不接任何参数)。执行后的代码如下： 
         * <li><span><strong>red</strong></span></li>
         * <li><span><strong>green</strong></span></li>
         * <li><span><strong>blue</strong></span></li>
         * 去除了li的外部所有元素的包裹
         */
        $(".wrap li").unwrap();
    </script>
</body>
</html>
```

### 04 删除元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--删除元素-->
    <div class="del">
        <div class="title1">标题1</div>
        <div class="title2">标题2</div>
        <ul>
            <li>red</li>
            <li>green</li>
            <li>blue</li>
        </ul>
        <div class="end1">底部1</div>
        <div class="end2">底部2</div>
    </div>
    <script>
        // 删除所选中的元素本身
        $(".del .title1").remove();
        // 从所选中的元素中，通过选择器表达式确定唯一一个元素进行删除
        $("div").remove(".title2");
        // 清空子元素，将所选元素的子元素清除 (和unwrap()完全相反，unwrap()删除的是父级元素)
        $(".del ul").empty();
        /**
         * detach()和remove()都是用来删除元素的，
         * 那么detach()和remove()的区别呢？演示如下。
         */
        // 为选择的元素添加点击事件
        $(".del .end1").click(function() {
            alert(1);
        });
        $(".del .end2").click(function() {
            alert(2);
        });
        // 删除 .end1和.end2元素，并用变量将其接收
        var end1 = $(".del .end1").detach();
        var end2 = $(".del .end2").remove();
        // 设置异步，3秒后自动将其删除的end1和end2添加回来
        setTimeout(function() {
            $(".del").append(end1);
            $(".del").append(end2);
        }, 3000);
        // 添加回来的两个end元素，和原先相比有如下特征：
        // end1(即detach()删除的元素)，重新添加回来绑定的方法可用
        // end2(即remove()删除的元素)，重新添加回来绑定的方法不可用
    </script>
</body>
</html>
```

### 05 克隆与替换元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--克隆与替换元素-->
    <div class="clone">
        <p>这是一段要被克隆的文字</p>
        <h2 class="replaceAll">这是一段要主动替换的文字</h2>
        <div class="name1">呆小甜</div>
        <div class="name2">胖小甜</div>
        <h2 class="replaceWith">这是一段要被动替换的文字</h2>
    </div>
    <script>
        // 克隆与替换元素
        /**
         * 为需要克隆的元素绑定点击事件。
         * 克隆方法没有那么强大，需要自己将克隆的元素添加到页面中。
         * 此时我们会发现，克隆出来的元素，点击事件不可用。由此说明：克隆其实是不完整的。
         * 如果想要完整的克隆，那么需要传递参数 .clone(true)
         */
        $(".clone p").click(function() {
            alert(3);
        });
        $(".clone p").clone().appendTo(".clone");
        // 执行这个时候，会找到两个 .clone p 的元素，因为已经克隆了一次，所以就出现了三个相同元素。
        $(".clone p").clone(true).appendTo(".clone");

        /* 主动替换，谁(要替换的元素)替换了我(要被替换的元素) */
        // 创建标签替换已有的标签
        $("<h3>使用replaceAll()主动替换</h3>").replaceAll(".clone .replaceAll");
        // 使用已有的标签替换已有的标签（使用name2替换name2，此时name2相当于被剪切了）
        $(".clone name2").replaceAll(".clone .name1");
        /*被动替换 我被谁替换了*/
        $(".clone .replaceWith").replaceWith("<h3>使用replaceWith()被动替换</h3>")
    </script>
</body>
</html>
```

### 06 属性操作

#### 06-01 通用属性操作

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>
<body>
    <!--属性操作-通用属性操作-->
    <div class="attr">
        <img src="images/img_01.jpg" alt="" tian="dai">
        <img src="images/img_02.png" alt="" tian="dai">
        <input type="text" value="这是一个正经的输入框">
    </div>
    <script>
        // 属性操作-通用属性操作
        /**
         * attr()方法既可以设置属性又可以取属性值
         */
        // 获取选中元素的src属性的值 (不管选中了多少个img元素，获取到的属性值是第一个img的。)
        console.log($(".attr img").attr("src")); // 执行结果：images/img_01.jpg
        // 为选中元素添加title属性及其值 (会把属性添加到所有选中的元素的身上)
        $(".attr img").attr("title", "狗头"); // <img src="images/img_01.jpg" alt="" tian="dai" title="狗头">
                                         　   // <img src="images/img_02.png" alt="" tian="dai" title="狗头">
        // 同时设置多个属性
        $(".attr img").attr({
            class:"cute",
            alt:"动物"
        });

        /**
         * prop()方法既可以设置属性又可以取属性值
         * 但是和attr有很大的区别。
         * attr()方法，既可以获取自定义属性的值，也可以获取标签本身的属性的值
         * prop()方法，只能够获取标签本身的属性的值，而补鞥呢获取自定义属性的值
         * attr()方法，属性的添加可以体现在DOM标签和DOM对象上
         * prop()方法，属性的添加只会体现在DOM对象上，而不会体现在DOM标签上
         * 
         * removeAttr()方法，既能删除DOM对象身上的属性，也能删除DOM标签身上的属性
         * removeProp()方法，只能删除DOM对象身上的属性
         */
        console.log($(".attr img").prop("src")); // 执行结果：http://127.0.0.1:5500/src/03-DOM操作/images/img_01.jpg
        console.log(
            $(".attr img").attr("tian"),  // dai
            $(".attr img").prop("tian")   // undefined
        );
        $(".attr img").prop({
            id:"food",
            tian:"daidai",
        });// 执行结果：<img src="images/img_01.jpg" alt="动物" tian="dai" title="狗头" class="cute" id="food">
           //         <img src="images/img_02.png" alt="动物" tian="dai" title="狗头" class="cute" id="food">
           // 由此可知，id设置成功了，但是tian没有设置成功。id不是自定义属性设置成功了，tian是自定义属性设置失败了。
           // 实际上，属性tian虽然没有像id一样设置在DOM标签上，但是属性tian设置在了DOM对象上，我们如果取该对象的属性值打印是可以看出来的。
        $(".attr img").attr("tian", "daidaidai"); 
           // 执行结果：<img src="images/img_01.jpg" alt="动物" tian="daidaidai" title="狗头" class="cute" id="food">设置在了DOM标签上
        
        $(".attr img").removeAttr("tian"); // 从DOM标签中移除tian属性
        $(".attr img").removeProp("id"); // 删除的是DOM对象上的tian属性，而不是删除DOM标签上的id属性

        $(".attr img").prop("index", 5); // 将index=5这个属性添加到DOM对象身上
        console.log($(".attr img").prop("index")); // 5 

        $(".attr img").removeProp("index");
        $(".attr img").removeProp("alt");
        console.log($(".attr img").prop("index")) // undefined
        console.log($(".attr img").prop("alt")) // 动物
        $(".attr img").removeAttr("alt");
        console.log($(".attr img").prop("alt")) // 空字符串
        console.log($(".attr img").attr("alt")) // undefined

        /**
         * val()获取表单元素的值，其他元素一般也没有value属性 
         * 同样val()也是可以设置的
         */
        console.log($(".attr input").val()); // 这是一个正经的输入框
        $(".attr input").val("这不是一个输入框"); // 修改选中表单元素的value值
    </script>
</body>
</html>
```

#### 06-02 css属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
    <style>
        .css{
            border: 2px solid #000;
        }
    </style>
</head>
<body>
    <!--属性操作-css属性-->
    <div class="css">
        <h2></h2>
        <p></p>
        <div></div>
    </div>
    <script>
        // 属性操作-css属性
        console.log(
            // 获取计算后的css属性值
            $(".css").css("border"), // 2px solid rgb(0, 0, 0)
            $(".css").css("height"), // 19.9062px
        );
        // 通过链式法则来设置css样式
        $(".css h2").css("width", "200px").css("height", "100px").css("background", "#ccc").text("h2标题");
        // 设置多个css样式
        $(".css h2").css({
            color:"green",
            fontSize:"20px",
            "line-height":"100px",
        });

        // 盒模型的操作
        $(".css p").css({
            width:"200px",
            height:"200px",
            padding:"20px",
            margin:"20px auto",
            border:"2px solid #f00",
        });
        console.log(
            // 获取盒模型尺寸
            $(".css p").width(),       // 200 width
            $(".css p").height(),      // 200 height
            $(".css p").innerWidth(),  // 240 width + padding-left + padding-right
            $(".css p").innerHeight(), // 240 height + padding-top + paading-bottom
            $(".css p").outerWidth(),  // 244 width + padding-left + padding-right + border-left + border-right
            $(".css p").outerHeight(), // 244 height + padding-top + padding-bottom + border-top + border-bottom
        );
        // 设置盒模型尺寸
        // 设置innerWidth()的时候，border的大小不改变，改变的是width的值
        // 设置outerWidth()的时候，也是一样border和padding都不改变，改变的是width的值
        // height的相关设置同理。
        $('.css p').width(300).height(100).innerWidth(400).outerWidth(500)

        // 位置信息的设置
        $(".css").css("position", "relative");
        $(".css div").css({
            width:"100px",
            height:"100px",
            background:"green",
            position:"absolute",
            left:"100px",
            top:"200px"
        });
        console.log(
            // offset()是相对于document，也就是我们的html元素来说的。
            $(".css div").offset().left, // 110 div距离父级100px,body默认margin为8px，再加上自身2px的边框。
            $(".css div").offset().top,  // 210 
        );
        $(".css div").offset({
            left:200, // left很好理解，就是距离左边document的距离
            top:1000, // top的理解：因为采用相对于父级进行定位，所以先要获取父级距离document的距离，然后做减法，剩下的值就是相对于父级来说要对子元素设置的值。
        });
        console.log(
            // position()相对于有定位的父级 (这里是相对于div.css来说)
            // 设置方式和offset()相同
            $(".css div").position().left, // 190
            $(".css div").position().top,  // 990
        );
        console.log(
            // 滚动条的位置
            $(document).scrollTop(),
            $(document).scrollLeft(),
        );
        // 进行一些操作，对滚动条进行设置
        setTimeout(function(){
            $(document).scrollTop(300)
        }, 2000);
    </script>
</body>
</html>
```

