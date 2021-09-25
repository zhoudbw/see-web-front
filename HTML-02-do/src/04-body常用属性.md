## body常用属性

body内写的东西最终会展示在浏览器窗口中，在浏览器中看到的效果，基本上都是body给我们提供的。body中这些看到的效果都是以标签的形式存在的。标签能够展示不同的效果，是由于不同标签会有不同的状态、效果（有些标签自带效果，还有些标签通过设置属性体现效果）

**<body>自身就有的部分属性效果**

a) <body bgcolor=""> 设置窗口区域的背景颜色
b) <body background="图片路径"> 设置窗口区域的背景图片（相对路径 vs 绝对路径  || 本地路径 vs 网络路径）

```html
<html>
    <head>
        <title>body自身的属性</title>
        <meta charset="utf-8"/>
    </head>
    <body bgcolor="pink" background="http://www.zhoudbw.cn/love.jpg"></body>
</html>
```

