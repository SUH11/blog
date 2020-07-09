正则表达式



1. 正则是什么？
   - 规则
   - 只能用在**字符串**上



2. 正则的写法

   ```javascript
   var reg = /a/
   let reg = new RegExp('a')
   ```

   

3. 方法：5个/4个比较常用

   - test

     - 匹配字符串，匹配成功，返回真，否则返回假

     ```javascript
     re.test('abc') // true / false
     ```

     

4. 转义字符
   - \s	空格
     - \S
   - \d  数字
     - \D
   - \w  字符（字母 数字 下划线）
     - \W





3. 字符串之间的比较
   - 比较的是编码
     - ASCII编码



例子：

 1. 找出字符串中的所有数字

    ```javascript
    function getNum(str) {
      for (let i = 0; i < str.length; i++) {
        if (str.chartAt(i) <= '9')
      }
    }
    ```

    