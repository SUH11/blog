# CSS 之currentColor

<a name="49b9257c"></a>
#### CSS 之currentColor

currentColor是css中的第一个变量，指当前元素的color值，如果当前元素没有设置color，那么就会继承父级的color，直到html根元素。

```css
.button {
  color: red;
  background: currentColor; // red
}
```

优点：可以减少颜色的重复设置

例如：

```css
.button {
  padding: 6px 16px;
  color: #58a;
  border: 1px solid currentColor;
}
```

