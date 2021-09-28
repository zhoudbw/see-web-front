css 层叠样式表 （cascading style sheet）

- css和html配合使用，来实现内容结构于变现的分离。

- css的书写位置：

  - 1. 行内样式
       将css样式代码写在指定的标签中，只对当前标签生效。每个html标签都有style属性，在style属性中编写css代码实现设计。

       ```html
           <font style="color:blue; font-size:20" size="7">中国</font>
       ```

  - 2. 内嵌样式
       在\<style>标签中编写css代码，可以匹配多个标签

       ```html
       <style>
           p {
               font-size: 20px;
           }
       </style>
       ```

  - 3. 引入样式
       将上述\<style>标签中的css代码，原封不动的复制到以.css结尾的文件中；
       在html中使用\<style> 或 \<link>引入css文件

       ```html
       <style>
           /* 引入外部css文件 */
           /* 地址可写：相对地址、绝对地址 || 本地地址、网络地址 */
           @import url(01.css);
       </style>
       ```

       或

       ```html
       <!--对于<link>引入css文件，ref="stylesheet type="text/css不可少 -->
       <!--理由：
       <link>不同于<style>，<style>只能够引入css文件，而<link>可以引入其他类型的文件
       当使用<link>的href属性引入css文件的时候，实际上是请求该css文件的数据
       数据通过流(字节)的形式响应给浏览器，浏览器要对这些字节进行重新的组装、使用。-->
       <!--这时rel和type就起到了作用：
       组装特点按照rel属性传递的参数组装，即stylesheet
       按照样式表的方式组装，但是不一定当作样式表来使用，
       type属性传递的参数，就是用来告诉浏览器这个组装的内容的作用，即当作css/text来使用 -->
       <link rel="stylesheet" type="text/css" href="011.css">
       ```

       **\<style> 和 \<link>的区别：**

       1. \<style>只能引入css文件，\<link>可以引入css文件(也可以引入其他文件，比如：浏览器选项卡图标)
       2. \<style>引入css文件数量有限，\<link>引入css数量无限
       3. \<style>网页内容加载完毕后再引入css，\<link>网页内容加载中就引入css。

  - **上述三种css书写方式的选用**
    当想要对某一个/某几个标签设置样式的时候，可以使用行内样式；
    当想要对一些标签设置样式的时候，可以使用内嵌样式；
    当想要多很多标签都设置样式的时候，建议使用引入样式；当网页中的HTML写的很多的时候，想要设置样式，也建议使用引入样式。

  - **注意：**如果3种方式用于设计了相同的标签，相同设计采用就近原则：行内 > 内嵌、引入（内嵌在前，还是引入在前，取决于代码。如果引入近，就显示引入的样式，如果内嵌近，就显示内嵌的样式）。

    ```html
    <style>
        p {
            font-size: 20px;
        }
    </style>
    <link rel="stylesheet" type="text/css" href="011.css">
    <!-- 相同样式，该情况，link生效 -->
    ```

    ```html
    <link rel="stylesheet" type="text/css" href="011.css">
    <style>
        p {
            font-size: 20px;
        }
    </style>
    <!-- 相同样式，该情况，style生效 -->
    ```