# BFC 是什么



1. ### 定义

   **块级格式化上下文**是CSS可视化渲染的一部分。它是一块区域，规定了内部块盒的渲染方式，以及浮动相互之间的影响关系。



2. ### 特点

   - BFC是就像一道屏障，隔离出了BFC内部和外部，内部和外部区域的渲染相互之间不影响。BFC有自己的一套内部子元素渲染的规则，不影响外部渲染，也不受外部渲染影响。

   - BFC的区域不会和外部浮动盒子的外边距区域发生叠加。

     > 外部任何浮动元素区域和BFC区域是泾渭分明的，不可能重叠。

   - BFC在计算高度的时候，**内部浮动元素的高度也要计算在内**

     > 即使BFC区域内只有一个浮动元素，BFC的高度也不会发生塌缩，高度是大于等于浮动元素的高度的。



3. ### 创建BFC的条件

   - 根元素（`<html>）`
   - **浮动元素**（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
   - **绝对定位元素**（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
   - **行内块元素**（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
   - 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-cell`，HTML表格单元格默认为该值）
   - 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
   - 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）
   - **[`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素**
   - [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
   - [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content `或 paint 的元素
   - **弹性元素**（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `flex` 或 `inline-flex `元素的直接子元素）
   - **网格元素**（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `grid` 或 `inline-grid` 元素的直接子元素）
   - 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）
   - `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

   > 总结
   >
   > 1. html 
   >
   > 2. float
   > 3. position
   > 4. overflow
   >
   > 4. display: flex, grid, inline-block, table, table-cell, table-caption
   > 5. column-count column-width
   > 6. column-span: all