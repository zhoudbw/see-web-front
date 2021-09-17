## jsonp

使用频率非常高的数据请求方式：jsonp。在解决跨域的时候，jsonp算是一种解决方案。那么jsonp是如何做到跨域的呢？现在与不同于的交互越来越多，所以jsonp的使用也变得非常的火爆。比如说，一些大的互联网公司，它们都会有一些多外开放的互联网平台（像百度地图、新浪微博、微信等等），这些平台中会提供很多很多的接口，这些接口就是用来实现某些需求或者功能的。但是这些接口的这些数据都是存储在人家的服务器中的。这些数据供所有开发者使用，这样肯定会涉及到跨域。那么怎么办呢？人家将接口都提供成jsonp的形式，这样就能够解决掉跨域的问题了。

JSONP : JSON Width Padding.

### 01 JSONP的使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- JSONP : JSON Width Padding -->

    <!-- 点击按钮发送jsonp方式的请求，请求结束返回结果 -->
    <button id="jsonp1">未使用jsonp出现跨域问题</button><br><br>
    <button id="jsonp2">使用jsonp并做初步的说明</button><br><br>
    <button id="jsonp3">测试jsonp发送请求的方式</button><br><br>

    <script>
        $("#jsonp1").click(function () {
            /* 不使用jsonp的方式请求 */
            $.ajax({
                url: "http://developer.duyiedu.com/edu/testJson",
                success: function (data) {
                    console.log(data);
                }
            });
            /**
             *报错（跨域）：
             * Access to XMLHttpRequest at 'https://developer.duyiedu.com/edu/testJsonp' 
             * (redirected from 'http://developer.duyiedu.com/edu/testJsonp') from origin 'http://127.0.0.1:5500' 
             * has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
             */
        });
    </script>

    <script>
        $("#jsonp2").click(function () {
            $.ajax({
                url: "http://developer.duyiedu.com/edu/testJsonp",
                // "jsonp": 以 JSONP 的方式载入 JSON 数据块。会自动在所请求的URL最后添加 "?callback=?"。请求就成jsonp方式了。
                // 默认情况下不会通过在URL中附加查询字符串变量 "_=[TIMESTAMP]" 进行自动缓存结果，除非将 cache参数设置为true。
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                }
                /**
                 * 我们实际发送的请求为：http://developer.duyiedu.com/edu/testJsonp
                 * 通过Network可知实际发送请求为：https://developer.duyiedu.com/edu/testJsonp?callback=jQuery36007516937707564868_1631838425212&_=1631838425213
                 * 多了 callback=xxx 和 _=xxx。这是jsonp的特征。
                 * 
                 * 我们获取到的数据为：jQuery36007516937707564868_1631838425212({"status":"ok","msg":"Hello! There is DuYi education!"})
                 * 这个返回的数据像什么：函数。
                 * jQuery36007516937707564868_1631838425212作为函数名。这个函数名实际上就来自callback参数。
                 * {"status":"ok","msg":"Hello! There is DuYi education!"}作为参数放在了函数内。
                 * 
                 * 再看我们实际发送的请求：https://developer.duyiedu.com/edu/testJsonp?callback=jQuery36007516937707564868_1631838425212&_=1631838425213
                 * 参数1：callback,回调函数。其实就是异步的执行代码。当数据请求成功就会去调用callback值对应的回调函数。 —— 这个值实际上是实际生成的。
                 * 参数2：_,时间戳。加上时间戳的意义就在于阻止浏览器缓存数据。为什么要阻止呢？缓存一下不是更好吗？这是为了避免数据更新后，前台不显示，显示的还是缓存的内容。
                 *      时间戳一直是更新的，所以url一直是更新的。每次使用的都是新的，所以浏览器就不会缓存下来。
                 */
            });
        });
    </script>

    <script>
        $("#jsonp3").click(function () {
            $.ajax({
                url: "http://developer.duyiedu.com/edu/testJsonp",
                dataType: "jsonp",
                method: "post", // 使用post发送请求
                success: function (data) {
                    console.log(data);
                }
                /**
                 * 即使使用了POST方式发送请求，发送的也就是GET请求。
                 *  这是为什么呢？
                 *    jQuery做了是否同源判断。
                 *      当请求的地址和当前我所在的地址是同源的。那么设置了什么请求方式，就按照什么方式发送。
                 *      当请求的地址和当前我所在的地址是不同源的，那么就跨域了，跨域一律将请求方式设置成get方式。
                 */
            });
        });
    </script>
</body>

</html>
```

### 02 JSONP原理

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- JSONP : JSON Width Padding -->
    <!--        原理        -->
    <!-- 
        发送网络请求的方式有很多种。
        其中有一种方式，带src属性的标签是可以发送网络请求的。（img audio video script）
        具有这个属性的元素就可以从外部引入一些资源文件。这样就相当于我们可以去跨域啦。
        在其他域下面，我们可以通过src属性将资源引入过来。（具有src属性的标签都是可以进行跨域请求的。）
        所以，img标签就可以引入其他域下面的图片资源，使用在页面中是完全没有问题的。
        其实jsonp能够跨域利用的就是src这个特征。

        具有src属性的标签那么多，那么jsonp选择哪个呢？
        通过排除法也能够知道，肯定是script标签啦。
        script也是一样，可以引入任意域下面的js文件。就比如，jQuery这个文件，如果不想downloan，就可以使用cdn引入。
        很多很多的第三方库都会提供cdn方式的引入，很明显cdn这个域和我们肯定不是在同一个域下面的。绝对是跨域的。
        但是引入之后可以使用吗？必然可以。

        综上所述，script标签既可以发送网络请求，也可以跨域。script标签肩负起了jsonp请求数据的重任。
        （其实这也是jsonp背后的原理，通过script标签加载第三方的数据。）

        【注】很重要的一点不能忽略：如果我们使用script:src引入了一个文件，比如说引入了一个js文件，当引入之后，
             我们的浏览器就能够将其当做真正的JS代码去执行。
      -->
    <!-- 验证，script:src引入的文件当做真正的js去使用 -->
    <!-- 首先访问：https://developer.duyiedu.com/edu/testJsonp?callback=fn -->
    <!-- 访问内容：fn({"status":"ok","msg":"Hello! There is DuYi education!"}) -->
    <!-- 上述访问内容就是函数调用。我们通过jsonp拿到上述访问数据。 -->
    <!-- 上面我们说，浏览器会将其当做JS代码执行，那么我们就来验证一下是否当做JS代码执行了。 -->
    <!-- 我们通过sr属性将访问数据引入进来：引入进来的也就是： fn({"status":"ok","msg":"Hello! There is DuYi education!"}) -->
    <script src="https://developer.duyiedu.com/edu/testJsonp?callback=fn"></script>
    <!-- 
          报错：testJsonp?callback=fn:1 Uncaught ReferenceError: fn is not defined at testJsonp?callback=fn:1
          从报错可知，JS是执行了的。这也就说明，通过script:src引入的返回值，当做JS代码执行了。
       -->
    <!-- 既然fn未定义，那么我们来定义一下 -->
    <script>
        // fn({"status":"ok","msg":"Hello! There is DuYi education!"})
        // 函数名  参数
        function fn(data) {
            console.log("fn被调用了...");
            console.log(data);
        }
    </script>
    <!-- 此时调用的就是定义好的fn了。 -->
    <script src="https://developer.duyiedu.com/edu/testJsonp?callback=fn"></script>
</body>

</html>
```

### 03 JSONP的实现步骤

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- JSONP : JSON Width Padding -->
    <button id="jsonp">jsonp</button>
    <script>
        $("#jsonp").click(function () {
            $.ajax({
                url: "http://developer.duyiedu.com/edu/testJsonp",
                dataType: "jsonp",
                method: "post",
                success: function (data) {
                    console.log(data);
                }
            });
        });
    </script>


    <!-- 
        jsonp原理在jQuery中是如何实现的？或者说
        在jQuery中jsonp的实现步骤：当我们给定dataType:"jsonp"，是如何将请求转成jsonp的请求的。
        第一步：通过ajax()发送一个请求，先要判断所给url是否同源。
            如果是同源的，那么完全没有必要将请求变为jsonp。（因为jsonp是用来解决跨域的，现在是同源就不涉及到跨域了）
            如果不是同源，那么就会按照jsonp请求的方式发送请求。这里要做的操作有很多：
                1. 对发送的url进行改造（添加两个参数callback和_）。

                2. 创建script标签，将改造好的地址赋值到script的srcs属性上。
                    为什么jsonp都是转成get请求发送的呢？因为jsonp是通过script标签的src属性发送的请求，
                    带src以及href属性的标签它们所发送的网络请求的方式只能是get而不能是post方式。
                    所以即使在ajax()中指明method=post，发送的依旧是get请求。

                    因为script:src自带发送网络请求，所以当我们将其添加到页面上，就自动发送请求了。
                    这样我们的后端就能够收到数据了。收到数据之后，根据请求地址，将要返回的数据进行一些操作，
                    操作之后就是我们想要的数据类型了。

                3. 然后就通过callbackName({所需返回的数据});
                    改造好的url：https://developer.duyiedu.com/edu/testJsonp?callback=jQuery36004463067839678787_1631878378308&_=1631878378309
                    请求返回数据：jQuery36004463067839678787_1631878378308({"status":"ok","msg":"Hello! There is DuYi education!"})
                4. 接收到这个数据之后，浏览器就会将其当做js代码去执行了。这个函数定义不能放在函数的调用之后，要先定义再调用。
    -->

    <!-- 先定义函数 -->
    <script>
        function fn(data) {
            console.log("定义函数...");
            console.log(data);
        }
    </script>
    <!-- 再调用 -->
    <script src="https://developer.duyiedu.com/edu/testJsonp?callback=fn"></script>
</body>

</html>
```

### 04 JSONP的实现代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="js/jquery-3.6.0.js"></script>
</head>

<body>
    <!-- JSONP : JSON Width Padding -->
    <!-- JSONP的简单实现 （很多的细节都忽略了。）-->
    <script>
        // 这个jp是个对象，就好比jQuery中的$
        var jp = {
            // 这就好比jQuery中的ajax()方法，模仿jQuery的ajax()方式，给个对象类型的形参
            ajax: function (options) {
                // 没有做严谨的判断，不一定有获取的属性。

                var url = options.url; // 用户发送请求的地址。
                var dataType = options.dataType; // 用户传递过来的请求方式

                // 下述两个变量是用来判断是否同源的
                var targetProtocol = ""; // 用户地址的协议
                var targetHost = ""; // 用户地址的域名和端口

                /**
                 * 为targetProtocol和targetHost赋值：
                 *  用户传递的是相对地址还是绝对地址？
                 *      比如，绝对地址：http://www.zhoudbw.cn
                 *      比如，相对地址：js/data.json
                 *  绝对地址可能是当前域，也能是其他域。
                 *  相对地址肯定是同源（本地的）。
                 */
                if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
                    // 这个条件成立：说明用户传递的是一个绝对地址。
                    var targetUrl = new URL(url); // 将用户请求的地址包装成一个对象(实例化)。变成对象后，相应的就可以通过属性获取想要的域名等信息，而不是解析字符串。
                    targetProtocol = targetUrl.protocol; // 放回地址对象的协议
                    targetHost = targetUrl.host; // 返回地址对象的域名和端口
                } else {
                    // 代码走到这里：说明用户传入的地址是一个相对地址（同一个域，通过location取当前域的信息）
                    targetProtocol = location.protocol;
                    targetHost = location.host;
                }

                /**
                 * 接下来就可以开始处理jsonp了，但是还要判断一下dataType是否等于jsonp
                 */
                if (dataType != "jsonp") {
                    // 这个条件成立，说明用户的请求方式不是jsonp，那就直接返回
                    return;
                }
                /**
                 * 是jsonp需要处理
                 */
                // 是否同源的判断 (同源：协议、域名、端口都相等)
                if (location.protocol == targetProtocol && location.host == targetHost) {
                    // 条件成立：说明现在是同域
                    // 没必要使用jsonp的方式发送请求，只需要发送一个普通的ajax请求就ok了。
                    // .... (自己补充)
                } else {
                    // 不同域
                    // 1. 改造url
                    var callback = "tian" + Math.floor(Math.random() * 100000); // 随机生成一个函数名
                    // var timestamp; // 一个参数演示一下就好了，时间戳参数不拼了。

                    // 2. 生成script标签
                    var script = document.createElement("script");
                    /**
                     * 这里拼接参数需要特别注意，用户的url可能携带参数，可能不携带参数，所以拼接时有如下情况：
                     *  http://www.zhoudbw.cn/index?name=tian&callback=xxx&_=xxx
                     *  http://www.zhoudbw.cn?callback=xxx&_=xxx
                     * 要判断是拼接?还是拼接&
                     */
                    if (url.indexOf("?") > 0) {
                        // 条件成立：说明用户传递的url有参数了，即存在?，此时拼接参数的时候是&
                        script.src = url + "&callback=" + callback;
                    } else {
                        // 说明用户传递的url没有参数，即不存在?，此时凭借参数的时候是?
                        script.src = url + "?callback=" + callback;
                    }

                    // 4. 按照先定义后调用，这里定义script:src请求调用的函数
                    // 将生成的方法定义到window身上。window是个全局变量，在window身上定义了这个方法，那么调用的时候就不会是未定义了。
                    window[callback] = options.success; // 这个方法由用户具体实现

                    // 3. 将script标签加入到页面中，让script:src发送请求
                    document.head.appendChild(script);
                }


            }
        }
    </script>

    <script>
        // 验证
        jp.ajax({
            url: "https://developer.duyiedu.com/edu/testJsonp",
            dataType: "jsonp",
            success: function(data) {
                console.log("自定义...");
                console.log(data);
            }
        });
    </script>

</body>

</html>
```

### 05 JSONP的命名

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
    <!-- JSONP : JSON Width Padding -->
    <!-- 含义的解释：
        从jsonp获取到的数据的格式来说：形如 fn({status: 'ok', msg: 'Hello! There is DuYi education!'})
        Padding是内边距，将数据当做参数丢进来。就是形象的比喻。
    -->
</body>
</html>
```

