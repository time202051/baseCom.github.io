# API 脚本 - api.js

`api.js` 脚本用于从指定的 Swagger URL 获取 API 数据，并生成相应的 API 模块文件，包含完整的 JSDoc 注释，方便查看接口入参及类型。

## 功能特性

- **自动生成**：根据 Swagger 文档自动生成 API 接口文件
- **JSDoc 支持**：完整的参数类型注释和说明
- **模块化管理**：按 Swagger tags 分组生成模块文件
- **类型安全**：自动转换 Java 类型到 JavaScript 类型
- **路径参数处理**：自动处理 RESTful 路径参数
- **只读保护**：生成的文件自动设置为只读，防止误修改

## 基础用法

### 1. 基本命令

**使用格式：**

```bash
npx api <swaggerUrl> [outputPath]
```

**案例：**

```bash
# 基本用法
npx api http://your-api-domain

# 指定输出路径
npx api http://your-api-domain ./src/api/modules

# 完整示例
npx api http://192.168.1.100:8080 ./src/api/modules
```

### 2. 参数说明

| 参数         | 说明                   | 类型   | 必填 | 默认值            |
| ------------ | ---------------------- | ------ | ---- | ----------------- |
| `swaggerUrl` | Swagger API 的基础 URL | string | ✅   | —                 |
| `outputPath` | 生成文件的输出路径     | string | ❌   | `src/api/modules` |

## 生成的文件结构

执行脚本后，会在指定目录下生成以下文件：

```bash
src/api/modules/
├── index.js # 模块导出入口文件
├── UserApi.js # 用户相关 API
├── OrderApi.js # 订单相关 API
├── ProductApi.js # 产品相关 API
└── ... # 其他模块文件
```

### 示例生成的文件内容

```javascript
/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 *  如需修改，请重新运行生成脚本
 *  生成时间: 2024-01-15 10:30:00
 */

import { api } from "@/api/request/sendRuest";

/**
 * 获取用户列表
 * @param {Object} params - 请求参数
 * @param {string} params.name - 用户姓名
 * @param {string} [params.email] - 用户邮箱
 * @param {number} params.page - 页码
 * @param {number} params.size - 每页大小
 */
export const getUserList = (params, options = {}) => {
  return api({
    url: `/api/app/user/list`,
    method: "get",
    params,
    ...options,
  });
};

/**
 * 创建用户
 * @param {Object} body - 请求参数
 * @param {string} body.name - 用户姓名
 * @param {string} body.email - 用户邮箱
 * @param {number} body.age - 用户年龄
 */
export const createUser = (body, options = {}) => {
  return api({
    url: `/api/app/user/create`,
    method: "post",
    data: body,
    ...options,
  });
};

/**
 * 根据ID获取用户详情
 * @param {string} userId - 用户ID
 * @param {Object} options - 请求选项
 */
export const getUserById = (userId, options = {}) => {
  return api({
    url: `/api/app/user/${userId}`,
    method: "get",
    ...options,
  });
};
```

### 效果图

![效果图](/assets/api.png)

## 类型转换规则

脚本会自动将 Java 类型转换为 JavaScript 类型：

| Java 类型   | JavaScript 类型 | 说明         |
| ----------- | --------------- | ------------ |
| `integer`   | `number`        | 整数类型     |
| `string`    | `string`        | 字符串类型   |
| `boolean`   | `boolean`       | 布尔类型     |
| `array`     | `Array`         | 数组类型     |
| `object`    | `Object`        | 对象类型     |
| `date-time` | `string`        | 日期时间类型 |

## URL 转换规则

脚本会自动处理 URL 路径，生成合适的函数名：

| 原始 URL                       | 生成的方法名           | 说明             |
| ------------------------------ | ---------------------- | ---------------- |
| `/api/app/user/list`           | `getUserList`          | 获取用户列表     |
| `/api/app/user/{id}`           | `getUserById`          | 根据 ID 获取用户 |
| `/api/app/order/create`        | `postOrderCreate`      | 创建订单         |
| `/api/app/product/{id}/update` | `putProductByIdUpdate` | 更新产品         |

### 转换规则说明

1. **移除前缀**：自动移除 `/api/app` 前缀
2. **处理路径参数**：`{id}` 转换为 `ById`
3. **驼峰命名**：使用驼峰命名法生成方法名
4. **HTTP 方法前缀**：添加 `get`、`post`、`put`、`delete` 前缀

## 生成的文件特性

### 1. 自动注释

每个生成的函数都包含完整的 JSDoc 注释：

```javascript
/**
 * 获取用户列表
 * @param {Object} params - 请求参数
 * @param {string} params.name - 用户姓名
 * @param {number} [params.age] - 用户年龄（可选）
 * @param {Object} options - 请求选项
 * @returns {Promise} 返回用户列表数据
 */
```

### 2. 参数验证

自动识别必填和可选参数：

```javascript
// 必填参数
@param {string} params.name - 用户姓名

// 可选参数
@param {string} [params.email] - 用户邮箱
```

### 3. 类型安全

自动转换数据类型，提供类型提示：

```javascript
@param {number} params.page - 页码
@param {string} params.name - 用户姓名
@param {boolean} params.active - 是否激活
```

### 4. 只读保护

生成的文件自动设置为只读，防止误修改：

```bash
# 文件权限为 444（只读）
-r--r--r-- 1 user group 1024 Jan 15 10:30 UserApi.js
```

## 使用示例

### 1. 在 Vue 组件中使用

```vue
<template>
  <div>
    <ol-table
      :url="swaggerUrl.getUserList"
      :table-data="tableData"
      :paginations="paginations"
    />
  </div>
</template>

<script>
import { UserApi } from "@/api/modules";

export default {
  data() {
    return {
      swaggerUrl: UserApi,
      tableData: {
        loading: false,
        rows: [],
        columns: [],
      },
      paginations: {
        page: 1,
        total: 0,
        limit: 20,
      },
    };
  },
  methods: {
    async getTableData() {
      try {
        const params = {
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        };
        const { result } = await this.swaggerUrl.getUserList(params);
        this.tableData.rows = result.items || [];
        this.paginations.total = result.totalCount || 0;
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    },
  },
  mounted() {
    this.getTableData();
  },
};
</script>
```

### 2. 在 JavaScript 中使用

```javascript
import { UserApi, OrderApi } from "@/api/modules";

// 获取用户列表
const getUserList = async () => {
  try {
    const response = await UserApi.getUserList({
      page: 1,
      size: 20,
      name: "张三",
    });
    console.log("用户列表:", response.data);
  } catch (error) {
    console.error("获取用户列表失败:", error);
  }
};

// 创建用户
const createUser = async (userData) => {
  try {
    const response = await UserApi.createUser({
      name: "李四",
      email: "lisi@example.com",
      age: 25,
    });
    console.log("创建用户成功:", response.data);
  } catch (error) {
    console.error("创建用户失败:", error);
  }
};

// 获取订单详情
const getOrderDetail = async (orderId) => {
  try {
    const response = await OrderApi.getOrderById(orderId);
    console.log("订单详情:", response.data);
  } catch (error) {
    console.error("获取订单详情失败:", error);
  }
};
```

## 注意事项

### 1. 网络连接

确保能够访问 Swagger URL：

```bash
# 测试网络连接
curl http://your-api-domain/swagger/v1/swagger.json
```

### 2. Swagger 格式

确保 Swagger 文档格式正确：

```json
{
  "swagger": "2.0",
  "info": {
    "title": "API Documentation",
    "version": "1.0.0"
  },
  "paths": {
    "/api/app/user/list": {
      "get": {
        "tags": ["User"],
        "summary": "获取用户列表",
        "parameters": [
          {
            "name": "name",
            "in": "query",
            "type": "string",
            "description": "用户姓名"
          }
        ]
      }
    }
  }
}
```

## 常见问题

### Q: 脚本执行失败怎么办？

A: 检查以下几点：

1. 确保 Swagger URL 可访问
2. 检查网络连接
3. 确保已安装 `swagger-client` 依赖
4. 检查输出目录是否有写入权限

## 最佳实践

1. **定期更新**：API 变更后及时重新生成文件
2. **版本管理**：为不同环境生成不同的 API 文件
3. **文档同步**：确保 Swagger 文档与实际 API 一致
4. **类型安全**：充分利用 JSDoc 提供的类型提示
5. **错误处理**：在调用 API 时添加适当的错误处理
6. **性能优化**：合理使用缓存和请求合并

## 相关链接

- [ol-base-components 官网](https://github.com/time202051/base-component)
- [JSDoc 官方文档](https://jsdoc.app/)

---

**通过 api.js 脚本，你可以快速生成类型安全的 API 接口文件，提升开发效率！** 🚀
