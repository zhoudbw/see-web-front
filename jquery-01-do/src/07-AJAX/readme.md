## Ajax

纠正Ajax不读“阿贾克斯”。在原生JS中，Ajax主要是用作数据交互的，在今天数据交互非常的重要。页面上所有的数据，几乎都要通过数据交互去实现。Ajax也是实现前后端分离的一个关键步骤。在早些年的时候，前后端都是不分家的，前端后端做的基本上都差不多。有了Ajax前后端开始分离，到现在已经非常的成熟了。但凡有数据的地方，都是通过数据交互去实现的。所以说，数据交互很重要，数据交互的方式也很重要。

在使用原生JS进行数据交互的话，我们就要使用Ajax。在之前Ajax如果要使用的话，还要自己去封装一下，或者公司里面的人帮我们封装好了拿过来用。其实封装Ajax还是很麻烦的，会涉及跟后端相关的知识，不太了解可能体验感还是很差的。jQuery已经帮我们封装好了，我们直接拿方法去用，里面传递一些对应的参数，想要的功能效果也就能出来了，非常的方便。

程序请求的数据来自：`https://developer.duyiedu.com/previewAPI/%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F`

### 01 两种GET请求的实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- get请求 -->
    <!-- get请求在jQuery中有两种方式，一个是get()方法、一个是ajax()方法，ajax()方法可以指代请求的方式 -->
    <button id="get">get请求</button>
    <button id="ajaxGet">ajax get请求</button>

    <script>
        $("#get").click(function () {
            $.get(
                //参数一：请求的url
                "http://api.duyiedu.com/api/student/findAll",
                //参数二：传递该url所需的参数
                {
                    //appKey:用户访问接口时所必须携带的身份凭据
                    appkey: "zhoudbw_1631780498232"
                },
                //参数三：回调函数，该函数有个参数是data，data是请求成功后传递过来的参数集合
                function (data) {
                    console.log(data);
                },
                //参数四：控制请求到的数据的格式。现在请求到的数据类型是string，字符串无法直接去操作，如果用字符串的方式去操作就太麻烦了。
                //通常我们都是将请求到的数据变成对象，便于我们通过各种循环遍历的方式对其进行操作。
                "json"
            );
        });
        /**
         * 注意：当前我使用的地址是：http://127.0.0.1:5500/src/07-AJAX/index.html 本地的地址
         * 而请求的是一个在线的地址，所以很显然是跨域了。Ajax是不允许跨域的。跨域的问题，该在线api在后端已经处理了。
         */
    </script>

    <script>
        //jQuery帮我们封装了一个非常核心的方法：ajax()，这个方法的参数非常的多。
        //通过ajax()方法实现get请求
        $("#ajaxGet").click(function () {
            $.ajax(
                // 所有的参数都放在下面这个对象中
                {
                    // 参数1：url地址
                    url: "http://api.duyiedu.com/api/student/findAll",
                    // 参数2：请求方式
                    type: "get",
                    // 参数3：请求需要发送的参数
                    data: {
                        // 该参数是一个对象。参数形式是key:value
                        appkey: "zhoudbw_1631780498232",
                    },
                    // 参数4：请求成功之后的回调函数
                    success: function (data) {
                        console.log(data);
                    },
                    // 参数5：请求到的数据类型
                    dataType: "json",
                }
            );
            /**
             * 注1：上述参数无需全部使用。
             * 注2：参数3传递参数的形式是使用对象，可以变成使用字符串类型。形式为："appkey=zhoudbw_1631780498232"
             */
        });
    </script>
</body>

</html>
```

### 02 两种POST请求的实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- post请求 -->
    <!-- post请求在jQuery中有两种方式，一个是post()方法、一个是ajax()方法，ajax()方法可以指代请求的方式 -->
    <div id="login">
        <div>
            <label for="username">账号</label>
            <input type="text" name="account">
        </div>
        <div>
            <label for="password">密码</label>
            <input type="password" name="password">
        </div>
        <div>
            <button id="loginBtn1">登录(post请求)</button>
            <button id="loginBtn2">登录(ajax post请求)</button>
        </div>
    </div>

    <script>
        // post()方法
        $("#loginBtn1").click(function () {
            // 获取input框中的账号和密码
            var username = $("#login input[name=account]").val();
            var password = $("#login input[name=password]").val();
            console.log("username: " + username + ", " + "password: " + password);
            // 准备好了必须的参数后，开始发送post请求。post()方法和get()方法的参数及使用相同。
            $.post(
                // url， 请求的url一定要与请求的方法要求一致。
                "http://api.duyiedu.com/api/student/stuLogin",
                // 请求所需的参数。字段名与所需的参数名一致。
                {
                    appkey: "zhoudbw_1631780498232",
                    account: username,
                    password: password,
                },
                // 回调函数
                function (data) {
                    console.log(data);
                },
                // 返回数据的类型
                "json"
            );
        });
    </script>

    <script>
        // ajax()方法
        $("#loginBtn2").click(function () {
            $.ajax({
                url: "http://api.duyiedu.com/api/student/stuLogin",
                type: "post",
                data: {
                    appkey: "zhoudbw_1631780498232",
                    account: $("#login input[name=account]").val(),
                    password: $("#login input[name=password]").val()
                },
                // 请求成功时的回调函数
                success: function (data) {
                    console.log(data);
                },
                // 请求失败时的回调函数
                error: function (status) {
                    console.log("错误原因:" + status);
                }
            });
        });
    </script>
</body>

</html>
```

### 03 JSON请求的实现方式

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- json请求 -->
    <button id="json">json请求</button>
    <script>
        // json请求。getJSON()和get()、post()的用法相同
        $("#json").click(function () {
            $.getJSON(
                "http://api.duyiedu.com/api/student/findAll",
                { appkey: "zhoudbw_1631780498232" },
                function (data) {
                    console.log("json请求: " + data);
                }
            );
        });
    </script>
</body>

</html>
```

