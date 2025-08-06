# API 脚本 - add.js

`add.js` 脚本用于创建新的 Vue 模块，根据提供的模块名称和配置参数，自动生成包含搜索、表格、分页等功能的完整页面模板。

## 功能特性

- **快速创建**：一键生成完整的 Vue 页面模块
- **模板化**：基于预定义模板生成标准化代码
- **自动配置**：根据参数自动配置 API 接口和功能
- **完整功能**：包含搜索、表格、分页、导出等功能
- **智能命名**：自动生成合适的函数名和变量名

## 基础用法

### 1. 基本命令

**使用格式：**

```bash
npx init <moduleName> [options]
```

**选项参数：**

```bash
npx init <moduleName> [-p <customPath>] [-u <pageUrl>] [-e <exportUrl>] [-m <swaggerModule>]
```

**案例：**

```bash
# 基本用法
npx add userManage

# 指定路径
npx add userManage -p src/views

# 完整示例
npx add userManage -p src/views -u /api/app/user/list -e /api/app/user/export -m UserApi
```

### 2. 参数说明

| 参数                  | 说明                     | 类型   | 必填 | 默认值                                          |
| --------------------- | ------------------------ | ------ | ---- | ----------------------------------------------- |
| `moduleName`          | 要创建的模块名称         | string | ✅   | —                                               |
| `-p, --path`          | 指定创建模块的自定义路径 | string | ❌   | 当前目录                                        |
| `-u, --url`           | 分页接口 URL 地址        | string | ❌   | `/api/app/business-report/stock-bIPaged-result` |
| `-e, --export`        | 导出接口 URL 地址        | string | ❌   | `/api/app/business-report/export-stock-bI`      |
| `-m, --swaggerModule` | Swagger 模块名称         | string | ❌   | `BusinessReport`                                |

## 生成的文件结构

执行脚本后，会在指定路径下生成以下文件：

```bash
src/views/userManage/
└── index.vue # Vue 页面组件文件
```

### 示例生成的文件内容

```vue
<!--
  Filename: userManage.vue
  name: userManage
  Created Date: 2024-01-15 10:30:00
  Author:
-->
<template>
  <div>
    <ol-search
      :url="swaggerUrl.getUserList"
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <ol-table
      :url="swaggerUrl.getUserList"
      :paginations="paginations"
      :btnlist="this.hasBtn(this)"
      :empty-img="tableData.emptyImg"
      :table-data="tableData"
      :multiple-selection="multipleSelection"
      @SelectionChange="SelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleindexChange="handleindexChange"
    />
  </div>
</template>

<script>
import { getUserList } from "@/api/modules";
import { UserApi } from "@/api/swagger";

export default {
  name: "userManage",
  data() {
    return {
      swaggerUrl: UserApi,
      multipleSelection: [],
      // 查询表单
      formSearchData: {
        reset: true, // 重置
        expendShow: true, // 展开
        value: {},
        tableSearch: [],
      },
      // 表格数据
      tableData: {
        loading: false,
        emptyImg: true,
        options: {
          selection: true, // 多选框
          index: null, // 序号
          headTool: true, // 开启头部工具栏
          refreshBtn: true, // 开启表格头部刷新按钮
          downloadBtn: true, // 开启表格头部下载按钮
        }, // 序号和复选框
        rows: [], // 表数据
        columns: [],
        operatesAttrs: {},
        operates: [], // 表格里面的操作按钮
        tableHeightDiff: 330,
      },
      paginations: {
        page: 1, // 当前位于那页面
        total: 10, // 总数
        limit: 30, // 一页显示多少条
        pagetionShow: true,
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const params = {
        ...this.formSearchData.value,
        Page: this.paginations.page,
        MaxResultCount: this.paginations.limit,
      };
      const { result: { items = [], totalCount = 0 } = {} } = await getUserList(
        params,
        {
          isLoading: true,
        }
      );
      this.tableData.rows = items;
      this.paginations.total = totalCount;
      this.tableData.emptyImg = true;
    },
    handleSearch(from) {
      this.formSearchData.value = { ...from };
      this.paginations.page = 1;
      this.init();
    },
    handleReset() {
      for (let key in this.formSearchData.value) {
        this.formSearchData.value[key] = null;
      }
      this.paginations.page = 1;
    },
    SelectionChange(row) {
      this.multipleSelection = row;
    },
    handleSizeChange(val) {
      this.paginations.page = 1;
      this.paginations.limit = val;
      this.init();
    },
    handleindexChange(val) {
      this.paginations.page = val;
      this.init();
    },
    export() {
      let timer = this.formSearchData.value.createdTime;
      this.formSearchData.value.BeginTime = timer ? timer[0] : "";
      this.formSearchData.value.EndTime = timer ? timer[1] : "";
      this.post({
        url: UserApi.exportUserList,
        isLoading: true,
        responseType: "blob",
        data: Object.assign(this.formSearchData.value, {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        }),
      }).then((res) => {
        this.fnexsl(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
```

### 效果图

![效果图](/assets/add.png)

## 高级用法

### 1. 自定义路径创建

```bash
# 创建到自定义目录
npx add userManage -p src/views/user

# 创建到项目根目录
npx add userManage -p ./pages
```

### 2. 指定 API 接口

```bash
# 指定分页接口
npx add userManage -u /api/app/user/list

# 指定导出接口
npx add userManage -e /api/app/user/export

# 同时指定多个接口
npx add userManage -u /api/app/user/list -e /api/app/user/export
```

### 3. 指定 Swagger 模块

```bash
# 指定 Swagger 模块名称
npx add userManage -m UserApi

# 完整示例
npx add userManage -p src/views -u /api/app/user/list -e /api/app/user/export -m UserApi
```

## URL 转换规则

脚本会自动处理 URL 路径，生成合适的函数名：

| 原始 URL                       | 生成的函数名           | 说明         |
| ------------------------------ | ---------------------- | ------------ |
| `/api/app/user/list`           | `getUserList`          | 获取用户列表 |
| `/api/app/user/export`         | `exportUserList`       | 导出用户列表 |
| `/api/app/order/create`        | `postOrderCreate`      | 创建订单     |
| `/api/app/product/{id}/update` | `putProductByIdUpdate` | 更新产品     |

### 转换规则说明

1. **移除前缀**：自动移除 `/api/app` 前缀
2. **处理路径参数**：`{id}` 转换为 `ById`
3. **驼峰命名**：使用驼峰命名法生成函数名
4. **HTTP 方法前缀**：添加 `get`、`post`、`put`、`delete` 前缀

## 生成的文件特性

### 1. 完整功能

生成的模板包含：

- **搜索组件**：ol-search 搜索表单
- **表格组件**：ol-table 数据表格
- **分页功能**：完整的分页逻辑
- **导出功能**：数据导出功能
- **多选功能**：表格多选功能
- **操作按钮**：表格操作列

### 2. 自动配置

- **API 接口**：自动配置分页和导出接口
- **Swagger 集成**：自动导入 Swagger 模块
- **数据绑定**：自动绑定搜索和表格数据
- **事件处理**：自动处理搜索、重置、分页等事件

### 3. 标准化代码

- **命名规范**：统一的变量和函数命名
- **代码结构**：标准化的 Vue 组件结构
- **注释完整**：包含完整的代码注释
- **错误处理**：基本的错误处理逻辑

## 使用示例

### 1. 创建用户管理模块

```bash
npx add userManage -p src/views -u /api/app/user/list -e /api/app/user/export -m UserApi
```

### 2. 创建订单管理模块

```bash
npx add orderManage -p src/views -u /api/app/order/list -e /api/app/order/export -m OrderApi
```

### 3. 创建产品管理模块

```bash
npx add productManage -p src/views -u /api/app/product/list -e /api/app/product/export -m ProductApi
```

## 注意事项

### 1. 文件冲突

确保目标路径不存在同名文件夹：

```bash
# 检查文件夹是否存在
ls -la src/views/userManage

# 如果存在，先删除或重命名
rm -rf src/views/userManage
```

### 2. API 接口

确保指定的 API 接口在 Swagger 中存在：

```bash
# 检查 API 接口
curl http://your-api-domain/swagger/v1/swagger.json | grep "user/list"
```

### 3. 模块依赖

确保已安装必要的依赖：

```bash
# 安装 ol-base-components
npm install ol-base-components

# 安装 swagger-client
npm install swagger-client@3.0.1
```

### 4. 路径配置

确保路径配置正确：

```bash
# 使用绝对路径
npx add userManage -p /absolute/path/src/views

# 使用相对路径
npx add userManage -p ./src/views
```

## 常见问题

### Q: 创建失败，文件夹已存在怎么办？

A: 解决方案：

1. **删除现有文件夹**：

   ```bash
   rm -rf src/views/userManage
   npx add userManage -p src/views
   ```

2. **使用不同名称**：

   ```bash
   npx add userManageNew -p src/views
   ```

3. **指定不同路径**：
   ```bash
   npx add userManage -p src/views/custom
   ```

### Q: API 接口不存在怎么办？

A: 检查以下几点：

1. 确保 Swagger URL 正确
2. 检查 API 路径是否正确
3. 确保已运行 `npx init` 生成 API 文件
4. 检查 Swagger 文档中的接口定义

## 最佳实践

1. **命名规范**：使用有意义的模块名称
2. **路径管理**：统一管理模块路径
3. **API 配置**：确保 API 接口正确配置
4. **代码审查**：生成后检查代码质量
5. **功能扩展**：根据需求添加自定义功能
6. **版本控制**：及时提交生成的代码

## 相关链接

- [ol-base-components 官网](https://github.com/time202051/base-component)
- [Swagger 官方文档](https://swagger.io/docs/)

---

**通过 add.js 脚本，你可以快速创建功能完整的 Vue 页面模块，提升开发效率！** 🚀
