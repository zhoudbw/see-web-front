## 引入选项卡图标

### 示例代码

```html
<html>
    <head>
        <title>引入选项卡图标</title>
        <!--
            通过href拿到文件，文件以流的形式发送到浏览器，
            通过rel告诉浏览器，获取到的流的组装方式，
            通过type告诉浏览器，组装好的内容如何使用。 
        -->
        <link href="../img/favicon64.ico" rel="shortcut icon" type="images/x-icon" />
        <link href="011.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        &lt;link&gt; 引入选项卡图标 <br/>
        <ul>
            <li>呆小甜</li>
            <li>胖小甜</li>
            <li>爱小甜</li>
        </ul>
    </body>
</html>
```

## css语法

- css语法书写格式：

  ```css
  选择器 {
      样式属性: 属性值;
      样式属性: 属性值;
      样式属性: 属性值;
      ......
  }
  ```

- 解释：

  - 选择器：决定对哪些标签做设计

  - 样式属性：对选择的标签做什么样的设计

    ```css
    p {
    	color: red;
    	font-size: 20;
    }
    ```