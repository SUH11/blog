# JavaScript正则表达式



1. #### 正则是什么？

   - 规则
   - 只能用在**字符串**上
   - 默认区分大小写
     
     - //i：不区分大小写
   - 默认匹配成功就会结束，不会继续匹配
     
     - //g：全局匹配
     
     

2. #### 正则的写法

   - 字面量：`const reg = /a/`
   - new：`const reg = new RegExp('a', 'i')`
   
   **当正则需要传参的时候，一定要用全称的写法**`let reg = new RegExp('\\b' + sClass + '\\b')`

   例子

   ```html
<ul class="box">
     <li class="box1">li</li>
     <li>li</li>
     <li class="box1box2">li</li>
     <li>li</li>
     <li class="box1 box2">li</li>
   </ul>
   <script>
     const aLi = getElesByClass(document, 'box1')
     for (let i = 0; i < aLi.length; i++) {
       aLi[i].style.background = 'red'
     }
     function getElesByClass(oParent, sClass) { // 获取class的方法
       const aEles = oParent.getElementsByTagName('*')
       let arr = []
       const reg = new RegExp('\\b' + sClass + '\\b') // 需要传参的
       for (let i = 0; i < aEles.length; i++) {
         reg.test(aEles[i].className) && arr.push(aEles[i])
       }
       return arr
     }
   </script>
   ```
   
   
   
3. #### 方法：6个/4个比较常用

   ​	字符串的操作：**indexOf**、**substring**(start, end[not include])、**substr**(from, length)、**charAt**、**split**

   - **test**

     - 匹配字符串，匹配成功，返回真，否则返回假
     - `@return boolean`

     ```javascript
     re.test('abc') // true / false
     ```

   - **search**

     - 正则去匹配字符串，如果匹配成功，返回匹配成功的位置(第一个)，匹配失败，返回-1
     - `@return Number(pos / -1)`
     - 写法：字符串.search(正则)

   - **exec**

     - 正则去匹配字符串，如果匹配成功，返回一个结果数组（每次只返回一个匹配结果），匹配失败，返回null

     - 将上次成功匹配后的位置记录在 [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) 属性中

       ```javascript
       const regex1 = RegExp('foo*', 'g');
       const str1 = 'table football, foosball';
       let array1;
       while ((array1 = regex1.exec(str1)) !== null) {
         console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
         // expected output: "Found foo. Next starts at 9."
         // expected output: "Found foo. Next starts at 19."
       }
       ```

       > `exec()` 可用来对单个字符串中的多次匹配结果进行逐条的遍历（包括捕获到的匹配）,如果匹配失败，`exec()` 方法返回 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)，并将 [`lastIndex`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) 重置为 0 。
       >
       > 而相比之下， [`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 只会返回匹配到的结果

   - **match**

     - 正则去匹配字符串，如果匹配成功，就返回匹配成功的数字，匹配失败，返回null
     - `@return Array/null`
     - 写法：字符串.match(正则)
     - 例子：找出字符串中的所有数字（注意用g）

   - [**matchAll**](https://wiki.developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@matchAll)

     - 不常用
     - 写法：正则.matchAll(字符串)

   - **replace**

     - 正则去匹配字符串，匹配成功的字符去替换成新的字符串

     - `@return String`

     - 写法：字符串.replace(正则，新的字符串)

       > replaceChild类似
       
     - 例子：敏感词过滤、日期格式化



4. #### 转义字符

   - **\s	空格**

     - \S

   - **\d  数字**

     - \D

   - **\w  字符（字母 数字 下划线）**

     - \W

   - **\b  独立的部分（起始，结束，空格）**

     - \B 非独立的部分

   - **\1  重复的第一个子项**

     - \2  重复的第二个子项

     - \3 ...

       例子：找字符串中重复最多的子项

       ```javascript
       const str = 'aabbbcccccdddddd' // 排好序
       const reg = /(\w)\1+/g
       let value = ''
       let num = 0
       str.replace(reg, ($0, $1) => {
         if ($0.length > num) {
           num = $0.length
           value = $1
         }
       })
       ```

   - **\\. 任意字符**

     - 任意字符
     - \\.

   - **量词**

     - +
       - `{1，}`：至少出现1次
     - ?  
       - `{0, 1}`：出现0次或者1次
     - *
       - `{0,}`：至少出现0次
     - {}
       - `{4, 7} {4,} {4}`

   - **| 或**

   - ()

     - 匹配子项，分组操作

       ```javascript
       let str = '2020-7-9'
       let reg = /(\d+)(-)/
       str.replace(reg, function($0, $1, $2) {
         $0: 整体
         $1: 第一个子项
       })
       ```

       

   - []

     - 字符类

     - 一组相似的元素

     - []中括号的整体代表一个字符

       ```javascript
       let str = '<h3>title</h3>'
       let reg = /<\w+>/g
       let reg = /<[^>]+>/g
       let reg = /<^[\w\W]>/g
       ```

   - ^

     - 排除

     - 如果^写在[]里面的话，就代表排除的意思

       ```javascript
       let reg = /a[^bde]c/  // 排除中括号里的匹配项
       ```

     - ^：正则的最开始的位置，就代表起始的意思

     - $：正则的最后位置，就代表结束的意思

   - 范围

     - a-z

     - A-Z

     - 0-9

       > 只代表一位

5. #### 标识
   
   - i
     - 不区分大小写
   - g
     - 全局匹配



6. #### 字符串之间的比较

- 比较的是编码
  - ASCII编码



#### 例子

 1. 找出字符串中的所有数字

    ```javascript
    function findNum(str) {
      return str.match(/\d+/g)
    }
    ```
    
 2. 是否有不是数字的字符

    ```javascript
    /\D+/g.test('aaaa111ccc') // true
    ```

3. 敏感词过滤

   ```javascript
   const str = '火箭飞机坦克大炮'
   str.replace(/坦克|大炮/g, $0 => {
     let word = ''
     for (let i = 0; i < $0.length; i++) {
       word += '*'
     }
     return word
   })
   ```

4. 日期格式化

   ```javascript
   let data = '2020-7-10'
   data.replace(/(\d+)-/g, $0 => {
     console.log($0)
   })
   ```

5. 过滤HTML标签

   ```javascript
   const str = '<h4>title</h4>'
   str.replace(/<[^>]+>/g, '')
   ```

6. 获取class元素

7. 找重复项最多的字符和个数

8. 查找QQ号

9. 去掉前后空格



### 刻意练习

1. 基础
   - 检测字符串中是否有字母a
   - 检测字符串中是否有数字
   - 找出字符串中所有的数字

2. 必做
   - 将字符串中所有数字都替换成***
   - 删除文本中所有的html标签
   - 将以前所写的所有公共方法放入命名空间
3. 选做
   - 完整的用户表单校验，检查用户的各种输入是否合法
   - 用户名只能是字母、数字和下划线
   - 密码只能是字母，并且两次要相同
   - 邮箱
   - QQ号只能是数字
   - 年龄只能是数字，并且大于12岁，小于100岁
   - 电话：区号-数字
4. 其他
   - 去掉大写字母
   - 去掉数字
   - 匹配成对标签
   - 匹配13-99之间年龄
   - 转驼峰匹配
   - 验证密码强度
   - 匹配用户名和限制位数





### **高级表单校验**

- 匹配中文：`[\u4e00-\u9fa5]`

- 行首行尾空格：`^\s*|\s*$`

- Email：`^\w+@[a-z0-9]+(\.[a-z]+){1,3}$`

- 网址：

  ```
  [a-zA-z]+://[^\s]*
  ```

- QQ号：`[1-9][0-9]{4,9}`

- 邮政编码：`[1-9]\d{5}`

- 身份证：`[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x`



### 总结知识点

1. 字符串操作包括哪些？举例说明

2. 什么是正则表达式？如何创建正则对象？

3. 正则有几种选项？分别是什么意思？

4. Test,search、match、replace是做什么的？怎么用？

5. 字符类（[]）包括几种情况？

6. 正则有哪些转义字符？分别是什么意思？

7. 什么是量词？各个量词分别有什么作用？

8. 举几个正则表达式的例子，比如：邮件、中文等

9. 什么叫“命名空间”，有什么作用？



































