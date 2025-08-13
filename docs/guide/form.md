# Form 表单组件

ol-form 组件支持与 Swagger API 集成，通过交互式命令行方式自动生成表单配置，极大提升开发效率。

## 效果图

![效果图](/assets/form.png)


## 基础用法
```vue
<template>
  <div>
    <ol-form
      :url="swaggerUrl.postUserUser"
      :form="form"
      @onSubmit="handleSubmit"
      @onCancel="handleCancel"
    />
  </div>
</template>

<script>
import { postUserUser } from "@/api/modules";
import { User } from "@/api/swagger";

export default {
  data() {
    return {
      swaggerUrl: User,
      form: {
        type: 1, // 0-详情，1-新建，2-编辑
        title: "用户信息",
        value: {
          name: "",
          email: "",
          phone: "",
          status: true,
        },
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        },
        model: [], // 会自动从 Swagger 生成
      },
    };
  },
  methods: {
    async handleSubmit({ form, data }) {
      try {
        await postUserUser(data);
        this.$message.success("保存成功");
        this.$emit("success");
      } catch (error) {
        this.$message.error("保存失败");
      }
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>
```

## 自定义表单配置

虽然 Swagger 会自动生成表单配置，但你仍然可以自定义表单项：

```vue
<template>
  <div>
    <ol-form
      :url="swaggerUrl.postUserUser"
      :form="form"
      @onSubmit="handleSubmit"
    />
  </div>
</template>

<script>
import { UserApi } from "@/api/swagger";

export default {
  data() {
    return {
      swaggerUrl: UserApi,
      form: {
        type: 1,
        title: "用户信息",
        value: {
          name: "",
          email: "",
          department: "",
          role: "",
          status: true,
        },
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        },
        model: [
          // 自定义表单项配置，会与 Swagger 生成的配置合并
          {
            type: "input",
            label: "姓名",
            prop: "name",
            required: true,
            placeholder: "请输入用户姓名",
          },
          {
            type: "select",
            label: "部门",
            prop: "department",
            children: [
              { key: "tech", value: "技术部" },
              { key: "hr", value: "人事部" },
              { key: "finance", value: "财务部" },
            ],
          },
          {
            type: "switch",
            label: "状态",
            prop: "status",
            props: {
              activeText: "启用",
              inactiveText: "禁用",
            },
          },
          // 自定义插槽
          {
            type: "slot",
            label: "自定义内容",
            name: "customSlot",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit({ form, data }) {
      console.log("表单数据：", data);
      // 处理表单提交
    },
  },
};
</script>
```



## API说明

### Props

| 参数           | 说明                                 | 类型   | 可选值 | 默认值 |
| -------------- | ------------------------------------ | ------ | ------ | ------ |
| `url`          | 接口地址，用于获取 Swagger 配置和调用 API 接口。接口选择优先级：新增 > 编辑 > 详情 | string | —      | ""     |
| `form`         | 表单配置对象                         | object | —      | —      |
| `defaultValue` | 表单默认值                           | object | —      | {}     |
| `showBtn`      | 是否启用底部按钮（取消/确定）                     | boolean | —      | true   |

#### form 属性

| 参数    | 说明                 | 类型    | 可选值 | 默认值 |
| ------- | -------------------- | ------- | ------ | ------ |
| `type`  | 表单类型             | number  | 0/1/2  | 1      |
| `title` | 表单标题             | string  | —      | —      |
| `value` | 表单数据对象         | object  | —      | {}     |
| `rules` | 表单验证规则         | object  | —      | {}     |
| `attrs` | el-form 的属性配置   | object  | —      | {}     |
| `model` | 表单项配置数组（详见下方 model 表单项配置）       | array   | —      | []     |

#### model 表单项配置

| 参数           | 说明                     | 类型     | 可选值                                                  | 默认值 |
| -------------- | ------------------------ | -------- | ------------------------------------------------------- | ------ |
| `type`         | 表单项类型               | string   | input/number/textarea/switch/radio/date/treeSelect/select/inputSpecial/slot | —      |
| `label`        | 标签文本                 | string   | —                                                       | —      |
| `prop`         | 字段名                   | string   | —                                                       | —      |
| `placeholder`  | 占位符文本               | string   | —                                                       | —      |
| `required`     | 是否必填                 | boolean  | —                                                       | false  |
| `hidden`       | 是否隐藏                 | boolean  | —                                                       | false  |
| `clearable`    | 是否可清空               | boolean  | —                                                       | true   |
| `readonly`     | 是否只读                 | boolean  | —                                                       | false  |
| `disabled`     | 是否禁用                 | boolean  | —                                                       | false  |
| `listeners`    | 事件监听器配置           | object   | —                                                       | {}     |
| `children`        | 选项数据（用于 select/radio/treeSelect） | array | —                              | []     |
| `autosize`     | 自适应内容高度（用于 textarea） | object | —                                    | —      |
| `showPassword` | 是否显示切换密码图标（用于 input） | boolean | —                              | false  |
| `length`       | 最大输入长度（用于 textarea） | number | —                                    | —      |
| `name`         | 插槽名称（用于 slot 类型） | string | —                                       | —      |
| `change`       | 值变化回调函数           | function | —                                     | —      |
| `keyup`        | 键盘事件回调函数         | function | —                                     | —      |
| `props`        | 组件属性（继承elementui当前组件的所有属性）                 | object   | —                                                       | {}     |

#### type 支持的类型

| 类型            | 说明         | 对应组件                 |
| --------------- | ------------ | ------------------------ |
| `input`         | 文本输入     | el-input                 |
| `number`        | 数字输入     | el-input-number          |
| `textarea`      | 文本域       | el-input (type="textarea") |
| `select`        | 下拉选择     | el-select                |
| `radio`         | 单选框       | el-radio-group           |
| `switch`        | 开关         | el-switch                |
| `date`          | 日期选择     | el-date-picker           |
| `treeSelect`    | 树形选择     | Tree-select              |
| `inputSpecial`  | 特殊输入框   | 自定义布局               |
| `slot`          | 自定义插槽   | 自定义内容               |

### Events

| 事件名        | 说明                   | 回调参数       |
| ------------- | ---------------------- | -------------- |
| `onSubmit`    | 表单提交时触发         | form 表单配置 data 表单数据 |
| `onCancel`    | 取消按钮点击时触发     | —              |
| `selectChange`| 选择器值变化时触发     | obj 当前项配置 val 变化后的值 |

### Methods

| 方法名          | 说明                                                       | 参数          |
| --------------- | ---------------------------------------------------------- | ------------- |
| `validate`      | 对整个表单进行校验的方法，返回 Promise                    | —             |
| `resetFields`   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | —             |
| `clearValidate` | 移除表单项的校验结果                                       | props         |

### 表单类型说明

| 类型值 | 说明     | 行为特征                    |
| ------ | -------- | --------------------------- |
| `0`    | 详情表单 | 只读模式，不显示提交按钮    |
| `1`    | 新建表单 | 默认模式，显示提交和取消按钮 |
| `2`    | 编辑表单 | 编辑模式，显示提交和取消按钮 |

### 布局规则

组件会根据表单项数量自动调整布局：

| 表单项数量 | 布局方式 | 宽度设置 |
| ---------- | -------- | -------- |
| ≤6项       | 单列布局 | 100%     |
| 7-10项     | 双列布局 | 50%      |
| 11-18项    | 三列布局 | 33.33%   |
| >18项      | 四列布局 | 25%      |
| textarea类型| 单列布局 | 100%     |

### 特殊配置说明

#### inputSpecial 类型配置

用于特殊的三段式输入框布局：

```javascript
{
  type: "inputSpecial",
  label: "位置信息",
  layerprop: "layer",    // 第一段字段名
  rowprop: "row",        // 第二段字段名
  columnprop: "column",  // 第三段字段名
  clearable: true
}
```

#### props.disabled 函数形式

```javascript
{
  type: "select",
  label: "角色",
  prop: "role",
  props: {
    disabled: ({ item, form }) => {
      return form.value.status === false;
    }
  }
}
```

#### listeners 事件监听器

```javascript
{
  type: "select",
  label: "部门",
  prop: "department",
  listeners: {
    change: (item, value) => {
      // 处理值变化事件
      console.log('部门变化:', value);
    }
  }
}
```

#### keyup 事件处理

```javascript
{
  type: "input",
  label: "搜索关键词",
  prop: "keyword",
  keyup: ({ event, item, form }) => {
    // 处理键盘事件
    console.log('键盘事件:', event);
  }
}
```