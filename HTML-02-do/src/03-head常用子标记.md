## head常用子标记

head可以理解为我们脑袋里想的东西，是看不到的。
看下面的例子：

```html
<html>
    <head>good good study.</head>
    <body></body>
</html>
```

发现：即使将内容写在了<head>内，依然可以在浏览器中看到内容，因为浏览器将写的内容处理到了<body>内。

```html
<html>
    <head></head>
    <body>good good study.</body>
</html>
```

由此，还可以确定这样的结论：并不是所有的内容都可以写在<head>内。

### 支持写在<head>内的子标签

```html
1 <title></title>  设置网页选项卡标题   　<title>百度一下，你就知道</title>
2 <meta />         设置网络传输相关的信息 <meta charset="utf-8" /> 设定网页展示的中文编码
3 <style></style>  编写或引入css代码
4 <link />         引入css代码 / 选项卡图标
5 <script>         编写或引入JavaScript代码
6 <base />         什么是超文本？超文本就是文本内容超出了当前文本，可以到其他文本中找，这个过程我们叫超链接。对请求响应、B/S有了了解，我们叫请求。浏览器本身什么内容都没有，看到的所有东西，都得向服务器或者本地请求，请求就会有所谓的路径（比如文件路径：http://127.0.0.1:5500/html/index.html），显然文件路径很长，如果我们有多个这样的请求，那么就要很长的前缀。
<base />就是用来设置网页中多处请求资源的公共路径。
若：网页中有10个超链接，这些超链接都要找文件路径（资源），碰巧这10个资源又在相同的路径下，可以直接将相同的路径写在base中，然后请求的时候只需要去写不相同的请求名字就可以了。
比如：<base href="a/b/" />
	 <a href="1.html"> => 实际访问a/b/1.html
	 <a href="2.html"> => 实际访问a/b/2.html
	 <a href="3.html"> => 实际访问a/b/3.html
```

除了上述6个子标记，其他的写在<head>内也会被处理到<body>中。但是上述6个子标记，不一定要写在<head>内。