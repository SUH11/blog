### 表格合并



1. 在el-table上使用

   ```vue
   <el-table :span-method="tableSpanMethod" ...
   ```



2. 定义该方法

   ```javascript
   // element ui用的合并方法
   tableSpanMethod(params) {
     const label = params.column.property;
     const columnIndex = params.columnIndex;
     const rowIndex = params.rowIndex;
   
     // 合并 这里写死第几列写死了，要优化
     if ([0, 1, 2].indexOf(columnIndex) > -1) {
       const value = this.spanTableDatas[label];
   
       if (value) {
         for (let i = 0; i < value.length; i ++) {
           if (rowIndex === i) {
             return value[i] === 1 ? [1, 1] : [value[i], value[i] > 1 ? 1 : 0];
           }
         }
       }
     }
   }
   ```



3. 获取data之后：

   ```javascript
   // spanTableDatas是定义的变量
   ...
   if (result.code === 1) {
     const { tableDatas } = result.data
   	// 1. sendMonth:合并月份
     this.spanTableDatas.sendMonth = this.handleSpanMethod(tableDatas, tableDatas.map(() => 1), ['sendMonth']);
     // 2. 合并完的月份，再合并sendScaleNum字段
     this.spanTableDatas.sendScaleNum = this.handleSpanMethod(tableDatas, 	this.spanTableDatas.sendMonth, ['sendMonth', 'sendScaleNum']);
   }
   ...
   ```

   写一个辅助函数：

   ```javascript
   /**
     * 合并单元格辅助函数：未合并数据/tableData，合并了子级的数据/parentSpan，合并的规则/fieldList
   * */
   handleSpanMethod(tableData, parentSpan, fieldList) {
     let arrList = [];
     let tempObj = {};
     let start = 0;
   
     parentSpan.forEach(num => {
       tableData.slice(start, num + start).map(item => {
         const name = fieldList.map(field => item[field]).join('');
         // 这里是存储的格式，可以修改
         tempObj[name] = tempObj[name] ? ++ tempObj[name] : 1;
       });
       start += num;
     });
   
     Object.keys(tempObj).forEach(key => {
       if (tempObj[key] === 1) {
         arrList.push(1);
       } else {
         arrList.push(tempObj[key]);
         for (let i = 0; i < tempObj[key] - 1; i ++) {
           arrList.push(0)
         }
       }
     });
     return arrList;
   }
   ```

   

