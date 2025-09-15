# Search 搜索组件

通过 Swagger 自动生成搜索框，极大提升开发效率。

  - 支持自动对接`el-select` 的下拉数据, 通过字典数据
  - 范围时间自动转换（数组 ⇄ xxxxxBegin/xxxxxEnd）

::: tip
**痛点**：部分接口要求前端提交形如 `xxxxxBegin` 和 `xxxxxEnd` 的字符串字段，而前端在表单里通常以"时间范围数组"的形式维护。

**解决方案**：组件默认转成Time结尾(如: xxxxxTime)，触发搜索时会自动完成二者的转换，无需手动处理。

**示例**：`prefixDateBegin`，`prefixDateEnd`自动转成`prefixDateTime`(特殊:`BeginTime`、`EndTime` 转为 `createdTime`)
:::

## 效果图

![效果图](/assets/search.png)

## 基础用法

### 带 Swagger 自动生成的搜索

```vue
<template>
  <ol-search
    :url="swaggerUrl.getUserList"
    :form-search-data="formSearchData"
    @handleSearch="handleSearch"
    @handleReset="handleReset"
  />
</template>

<script>
import { UserApi } from "@/api/swagger";

export default {
  data() {
    return {
      swaggerUrl: UserApi,
      formSearchData: {
        reset: true,
        expendShow: false,
        value: {},
        tableSearch: [], // 会自动从 Swagger 生成
      },
    };
  },
  methods: {
    handleSearch(formData) {
      console.log("搜索条件:", formData);
      // 调用 API 获取数据
    },
    handleReset() {
      console.log("重置搜索");
    },
  },
};
</script>
```

## API 说明

### Props

| 参数               | 说明                                 | 类型   | 可选值 | 默认值 |
| ------------------ | ------------------------------------ | ------ | ------ | ------ |
| `url`              | Swagger API 地址，用于自动生成搜索项 | string | —      | —      |
| `formSearchData`   | 搜索表单配置                         | object | —      | —      |
| `tableSearchSlice` | 默认显示的搜索项数量                 | number | —      | 4      |

#### formSearchData 属性

| 参数               | 说明                 | 类型    | 可选值 | 默认值 |
| ------------------ | -------------------- | ------- | ------ | ------ |
| `reset`            | 是否显示重置按钮     | boolean | —      | false  |
| `expendShow`       | 是否开启展开收起功能 | boolean | —      | false  |
| `value`            | 表单数据对象         | object  | —      | {}     |
| `rules`            | 表单验证规则         | object  | —      | {}     |
| `tableSearch`      | 搜索项配置数组       | array   | —      | []     |
| `tableSearchSlice` | 默认显示的搜索项数量 | number  | —      | 4      |
| `options`          | 表单选项配置         | object  | —      | {}     |

#### tableSearch 搜索项配置

| 参数           | 说明                     | 类型     | 可选值                                                  | 默认值 |
| -------------- | ------------------------ | -------- | ------------------------------------------------------- | ------ |
| `label`        | 标签文本                 | string   | —                                                       | —      |
| `value`        | 字段名                   | string   | —                                                       | —      |
| `inputType`    | 输入类型                 | string   | text/number/select/picker/treeSelect/selectRemoteMethod | text   |
| `placeholder`  | 占位符文本               | string   | —                                                       | —      |
| `children`     | 选项数据（用于 select）  | array    | —                                                       | —      |
| `props`        | 组件属性                 | object   | —                                                       | {}     |
| `clearable`    | 是否可清空               | boolean  | —                                                       | true   |
| `maxlength`    | 最大长度                 | number   | —                                                       | —      |
| `max`          | 最大值（用于 number）    | number   | —                                                       | —      |
| `remoteMethod` | 远程搜索方法             | function | —                                                       | —      |
| `loading`      | 加载状态（用于远程搜索） | boolean  | —                                                       | false  |
| `change`       | 值变化回调               | function | —                                                       | —      |

#### inputType 支持的类型

| 类型                 | 说明         | 对应组件                 |
| -------------------- | ------------ | ------------------------ |
| `text`               | 文本输入     | el-input                 |
| `number`             | 数字输入     | el-input (type="number") |
| `select`             | 下拉选择     | el-select                |
| `selectTEMP`         | 临时下拉选择 | el-select                |
| `selectRemoteMethod` | 远程搜索下拉 | el-select (remote)       |
| `picker`             | 日期选择     | el-date-picker           |
| `treeSelect`         | 树形选择     | Tree-select              |

### Events

| 事件名               | 说明                   | 回调参数       |
| -------------------- | ---------------------- | -------------- |
| `handleSearch`       | 搜索按钮点击时触发     | formData, item |
| `handleReset`        | 重置按钮点击时触发     | formData       |
| `btnHandleExpend`    | 展开收起按钮点击时触发 | isExpanded     |
| `getTreeSelectValue` | 树形选择值变化时触发   | value          |
| `loadmore`           | 下拉加载更多时触发     | obj            |

### 继承的 Element UI Form 属性

ol-search 继承了 `el-form` 的所有属性，包括但不限于：

| 参数                      | 说明                                    | 类型    | 可选值            | 默认值 |
| ------------------------- | --------------------------------------- | ------- | ----------------- | ------ |
| `model`                   | 表单数据对象                            | object  | —                 | —      |
| `rules`                   | 表单验证规则                            | object  | —                 | —      |
| `inline`                  | 行内表单模式                            | boolean | —                 | true   |
| `label-position`          | 表单域标签的位置                        | string  | right/left/top    | right  |
| `label-width`             | 表单域标签的宽度                        | string  | —                 | —      |
| `label-suffix`            | 表单域标签的后缀                        | string  | —                 | —      |
| `hide-required-asterisk`  | 是否显示必填字段的标签旁边的红色星号    | boolean | —                 | false  |
| `show-message`            | 是否显示校验错误信息                    | boolean | —                 | true   |
| `inline-message`          | 是否以行内形式展示校验信息              | boolean | —                 | false  |
| `status-icon`             | 是否在输入框中显示校验结果反馈图标      | boolean | —                 | false  |
| `validate-on-rule-change` | 是否在 rules 属性改变后立即触发一次验证 | boolean | —                 | true   |
| `size`                    | 用于控制该表单内组件的尺寸              | string  | medium/small/mini | small  |

### Methods

| 方法名          | 说明                                                       | 参数          |
| --------------- | ---------------------------------------------------------- | ------------- |
| `validate`      | 对整个表单进行校验的方法                                   | callback      |
| `validateField` | 对部分表单字段进行校验的方法                               | prop/callback |
| `resetFields`   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —             |
| `clearValidate` | 移除表单项的校验结果                                       | props         |
| `resetFields`   | 重置表单                                                   | —             |

### 自定义指令

#### v-el-select-loadmore

用于下拉选择框的加载更多功能：

```vue
<template>
  <ol-search :form-search-data="formSearchData" />
</template>

<script>
export default {
  data() {
    return {
      formSearchData: {
        reset: true,
        value: {
          category: null,
        },
        tableSearch: [
          {
            label: "分类",
            value: "category",
            inputType: "select",
            children: [],
            loadmores: {
              fn: this.loadMoreCategories,
              SELECTWRAP_DOM_index: 0,
            },
          },
        ],
      },
    };
  },
  methods: {
    loadMoreCategories() {
      // 加载更多分类数据
      console.log("加载更多分类");
    },
  },
};
</script>
```

## 完整示例

```vue
<template>
  <div>
    <ol-search
      :url="swaggerUrl.getUserList"
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
      @btnHandleExpend="handleExpend"
    />
  </div>
</template>

<script>
import { UserApi } from "@/api/swagger";

export default {
  data() {
    return {
      swaggerUrl: UserApi,
      formSearchData: {
        reset: true,
        expendShow: true,
        tableSearchSlice: 4,
        value: {
          name: null,
          status: null,
          type: null,
          createDate: null,
          dateRange: null,
          age: null,
          department: null,
        },
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        },
        tableSearch: [
          {
            label: "姓名",
            value: "name",
            inputType: "text",
            placeholder: "请输入姓名",
          },
          {
            label: "状态",
            value: "status",
            inputType: "select",
            clearable: true,
            children: [
              { key: "active", value: "启用" },
              { key: "inactive", value: "禁用" },
            ],
          },
          {
            label: "类型",
            value: "type",
            inputType: "select",
            children: [
              { key: 1, value: "类型一" },
              { key: 2, value: "类型二" },
            ],
          },
          {
            label: "创建日期",
            value: "createDate",
            inputType: "picker",
            props: {
              type: "date",
              valueFormat: "yyyy-MM-dd",
              format: "yyyy/MM/dd",
            },
          },
          {
            label: "日期范围",
            value: "dateRange",
            inputType: "picker",
            props: {
              type: "datetimerange",
              startPlaceholder: "开始时间",
              endPlaceholder: "结束时间",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              format: "yyyy/MM/dd HH:mm:ss",
            },
          },
          {
            label: "年龄",
            value: "age",
            inputType: "number",
            max: 120,
          },
          {
            label: "部门",
            value: "department",
            inputType: "treeSelect",
            props: {
              placeholder: "请选择部门",
            },
            children: [
              {
                id: 1,
                label: "技术部",
                children: [
                  { id: 11, label: "前端组" },
                  { id: 12, label: "后端组" },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleSearch(formData) {
      console.log("搜索条件:", formData);
      // 处理时间范围
      if (formData.dateRange) {
        formData.beginTime = formData.dateRange[0];
        formData.endTime = formData.dateRange[1];
        delete formData.dateRange;
      }
      // 调用 API 获取数据
      this.getTableData(formData);
    },
    handleReset() {
      console.log("重置搜索");
      this.getTableData();
    },
    handleExpend(isExpanded) {
      console.log("展开状态:", isExpanded);
    },
    getTableData(searchParams = {}) {
      // 模拟 API 调用
      const params = {
        ...searchParams,
        Page: 1,
        MaxResultCount: 20,
      };
      console.log("请求参数:", params);
    },
  },
};
</script>
```

## 注意事项

1. **Swagger 集成**：提供 `url` 属性时，会自动从 Swagger API 生成搜索项
2. **时间处理**：日期范围会自动转换为 `beginTime` 和 `endTime`
3. **表单验证**：支持 Element UI Form 的所有验证规则
4. **展开收起**：通过 `expendShow` 和 `tableSearchSlice` 控制显示数量
5. **远程搜索**：支持下拉框的远程搜索和加载更多功能
6. **数字输入**：自动限制数字输入范围，防止非法字符

## 最佳实践

1. **统一管理**：将搜索配置统一管理，便于维护
2. **合理布局**：根据搜索项数量合理设置 `tableSearchSlice`
3. **性能优化**：远程搜索时添加防抖处理
4. **用户体验**：为必填项添加验证，为可选项设置默认值
5. **数据格式**：注意时间范围的数据格式转换
