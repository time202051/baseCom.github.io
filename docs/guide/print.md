# Print 打印组件

基于 `vue-plugin-hiprint` 封装的动态打印解决方案，支持可视化模板设计、模板管理和动态打印。

## 功能特性

- **可视化设计器**：拖拽式打印模板设计
- **模板管理**：支持多模板保存、加载、删除
- **动态打印**：表格集成打印模板选择器
- **多数据源**：支持自定义数据、接口数据、默认数据三种模式
- **纸张设置**：支持 A3/A4/A5/B3/B4/B5 及自定义纸张

## 模板打印使用流程

### 步骤 1：打开打印模板选择器

在表格工具栏中点击智能打印按钮，打开模板选择下拉菜单。

![智能打印按钮](/assets/smartPrint1.png)

### 步骤 2：创建打印模板

点击“创建模板”按钮

![选择打印模板](/assets/smartPrint2.png)

### 步骤 3：打印设计器

打印设计器对话框，设计并保存打印模板。

![预览打印效果](/assets/smartPrint3.png)

### 步骤 4：打印模板

保存后的打印模板

![调整打印设置](/assets/smartPrint4.png)

### 步骤 5：执行打印

选中要打印的模板即刻直接打印

![执行打印](/assets/smartPrint5.png)

## 组件列表

| 组件名                  | 说明                       |
| :---------------------- | :------------------------- |
| `ol-print`              | 打印设计器对话框           |
| `ol-print-model`        | 打印模板管理页面           |
| `PrintTemplateSelector` | 表格打印模板选择器（内置） |

## 基础用法

### 1. 打印设计器（ol-print）

用于创建和编辑打印模板：

```vue
<template>
  <div>
    <el-button type="primary" @click="openPrintDesigner"
      >打开打印设计器</el-button
    >

    <!-- 打印设计器 -->
    <ol-print
      v-if="printVisible"
      :print-data="printData"
      :default-template="defaultTemplate"
      @submit="handleSaveTemplate"
      @close="printVisible = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      printVisible: false,
      printData: {
        name: "示例数据",
        table: [
          { id: "1", name: "商品A", count: 10, amount: "100元" },
          { id: "2", name: "商品B", count: 20, amount: "200元" },
        ],
      },
      defaultTemplate: {}, // 传入已有模板 JSON
    };
  },
  methods: {
    openPrintDesigner() {
      this.printVisible = true;
    },
    handleSaveTemplate(templateJson) {
      console.log("保存模板:", templateJson);
      // 调用 API 保存模板
    },
  },
};
</script>
```

### 2. 表格集成打印（PrintTemplateSelector）

在 `ol-table` 中开启智能打印按钮：

```vue
<template>
  <div>
    <ol-search :form-search-data="formSearchData" />
    <ol-table
      :table-data="tableData"
      :paginations="paginations"
      :is-smart-print-btn="true"
      :menu-id="currentMenuId"
      :print-data="printData"
      :on-print-data="handlePrintData"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMenuId: "menu_001", // 当前菜单ID，用于获取对应模板
      printData: {}, // 打印数据
      tableData: {
        rows: [],
        columns: [],
        options: {
          selection: true,
        },
      },
    };
  },
  methods: {
    // 自定义获取打印数据（可选）
    handlePrintData(templateItem, done) {
      // templateItem: 选中的模板信息
      // done: 回调函数，传入打印数据,执行done后才会打印

      // 方式1：自定义处理数据后调用 done
      const customData = {
        table: this.tableData.rows,
        // ... 其他数据
      };
      done(customData);

      // 方式2：如果不调用 done，则自动使用 sourceUrl，如果 sourceUrl 为空，则使用tableData.printData
    },
  },
};
</script>
```

### 3. 打印模板管理（ol-print-model）

用于管理打印模板（通常放在系统管理模块）：

```vue
<template>
  <ol-print-model />
</template>
```

## 获取模板参数的三种方式

表格打印支持三种数据源模式（优先级从高到低）：
| 优先级             | 方式 | 触发条件 |
| :----- | :--- | :--- |
| 1     | 自定义数据（onPrintData） | 定义了 onPrintData 回调 |
| 2     | 接口获取（sourceUrl） | 未定义 onPrintData 或未调用 done()，且模板配置了 sourceUrl |
| 3     | 默认数据（printData） | 前两种方式均未生效 |  

### 方式 1：自定义数据（onPrintData）

通过 `onPrintData` 回调函数自定义处理打印数据：

```javascript
onPrintData(templateItem, done) {
  // templateItem: 选中的模板信息
  // done: 回调函数，传入打印数据

  // 步骤1：获取选中的模板信息
  console.log('选中的模板:', templateItem.templeteName);

  // 步骤2：根据模板信息处理数据
  const customData = {
    title: '订单打印',
    orderNo: 'ORD-2026-001',
    date: new Date().toLocaleDateString(),
    table: this.tableData.rows, // 表格数据
    // ... 其他需要的字段
  };

  // 步骤3：调用 done 传入处理后的数据
  done(customData);
}
```

### 方式 2：接口获取（sourceUrl）

在模板中配置 `sourceUrl`，系统会自动调用接口获取数据：

1. **模板配置**：在打印模板管理中设置 `sourceUrl`

```json
{
  "templeteName": "订单打印",
  "sourceUrl": "/api/orders/print-data",
  "templeteJson": "..."
}
```

2. **接口返回格式**：接口需要返回符合模板字段的数据

```javascript
// 接口返回示例
{
  "code": 200,
  "result": {
    "title": "订单打印",
    "orderNo": "ORD-2026-001",
    "table": [
      { "id": "1", "name": "商品A", "count": 10 }
    ]
  }
}
```

3. **自动传参**：系统会自动传递选中行的 ID 列表

```javascript
// 实际请求示例
GET /api/orders/print-data?ids=1,2,3
```

### 方式 3：默认数据（printData）

直接使用传入的 tableData.printData存储打印数据。

## 代码实现详解

### 1. 表格智能打印按钮配置

在 `ol-table` 组件中，通过以下属性启用智能打印：

| 属性              | 说明                   | 类型         | 默认值 |
| :---------------- | :--------------------- | :----------- | :----- |
| `isSmartPrintBtn` | 开启智能打印按钮       | boolean      | false  |
| `menuId`          | 菜单ID（用于获取模板） | string       | ""     |
| `printData`       | 打印数据               | object/array | {}     |
| `onPrintData`     | 自定义打印数据获取函数 | function     | null   |
