# API 脚本 - run.js

`run.js` 脚本用于从指定的 Swagger URL 下载 Swagger JSON 文件，并生成相应的 API 接口路径文件，为组件提供 Swagger URL 映射。

## 功能特性

- **自动下载**：从 Swagger URL 自动下载 JSON 数据
- **路径映射**：生成 API 接口路径映射对象
- **模块分组**：按 Swagger tags 分组生成模块
- **只读保护**：生成的文件自动设置为只读，防止误修改
- **注释说明**：包含完整的接口说明和注释

## 基础用法

### 1. 基本命令

**使用格式：**

```bash
npx api <swaggerUrl> [outputPath]
```

**案例：**

```bash
# 基本用法
npx run http://your-api-domain

# 指定输出路径
npx run http://your-api-domain ./src/api/swagger.js

# 完整示例
npx run http://192.168.1.100:8080 ./src/api/swagger.js
```

### 3. 参数说明

| 参数         | 说明                   | 类型   | 必填 | 默认值               |
| ------------ | ---------------------- | ------ | ---- | -------------------- |
| `swaggerUrl` | Swagger API 的基础 URL | string | ✅   | —                    |
| `outputPath` | 生成文件的输出路径     | string | ❌   | `src/api/swagger.js` |

## 生成的文件结构

执行脚本后，会生成一个包含所有 API 路径映射的 JavaScript 文件：

```bash
src/api/
└── swagger.js # API 路径映射文件
```

### 示例生成的文件内容

```javascript
/**
 * ⚠️  警告：此文件由脚本自动生成，请勿手动编辑！
 *  如需修改，请重新运行生成脚本
 *  生成时间: 2024-01-15 10:30:00
 */

// 用户管理相关接口
export const UserApi = {
  getUserList: "/api/app/user/list", //get 获取用户列表
  getUserById: "/api/app/user", //get 根据ID获取用户详情
  createUser: "/api/app/user/create", //post 创建用户
  updateUser: "/api/app/user/update", //put 更新用户
  deleteUser: "/api/app/user/delete", //delete 删除用户
};

// 订单管理相关接口
export const OrderApi = {
  getOrderList: "/api/app/order/list", //get 获取订单列表
  getOrderById: "/api/app/order", //get 根据ID获取订单详情
  createOrder: "/api/app/order/create", //post 创建订单
  updateOrder: "/api/app/order/update", //put 更新订单
  deleteOrder: "/api/app/order/delete", //delete 删除订单
};

// 产品管理相关接口
export const ProductApi = {
  getProductList: "/api/app/product/list", //get 获取产品列表
  getProductById: "/api/app/product", //get 根据ID获取产品详情
  createProduct: "/api/app/product/create", //post 创建产品
  updateProduct: "/api/app/product/update", //put 更新产品
  deleteProduct: "/api/app/product/delete", //delete 删除产品
};
```

### 效果图

![效果图](/assets/run.png)

## URL 转换规则

脚本会自动处理 URL 路径，生成合适的键名：

| 原始 URL                       | 生成的键名             | 说明             |
| ------------------------------ | ---------------------- | ---------------- |
| `/api/app/user/list`           | `getUserList`          | 获取用户列表     |
| `/api/app/user/{id}`           | `getUserById`          | 根据 ID 获取用户 |
| `/api/app/order/create`        | `postOrderCreate`      | 创建订单         |
| `/api/app/product/{id}/update` | `putProductByIdUpdate` | 更新产品         |

### 转换规则说明

1. **移除前缀**：自动移除 `/api/app` 前缀
2. **处理路径参数**：`{id}` 转换为 `ById`
3. **驼峰命名**：使用驼峰命名法生成键名
4. **HTTP 方法前缀**：添加 `get`、`post`、`put`、`delete` 前缀
5. **路径清理**：移除路径参数，生成干净的 URL

## 生成的文件特性

### 1. 自动注释

每个生成的键值对都包含完整的注释：

```javascript
getUserList: "/api/app/user/list", //get 获取用户列表
createUser: "/api/app/user/create", //post 创建用户
updateUser: "/api/app/user/update", //put 更新用户信息
```

### 2. 模块分组

按 Swagger tags 自动分组：

```javascript
// 用户管理相关接口
export const UserApi = {
  // 用户相关接口...
};

// 订单管理相关接口
export const OrderApi = {
  // 订单相关接口...
};
```

## 使用示例

### 1. 在 Vue 组件中使用

```vue
<template>
  <div>
    <ol-search
      :url="swaggerUrl.getUserList"
      :form-search-data="formSearchData"
      @handleSearch="handleSearch"
    />
    <ol-table
      :url="swaggerUrl.getUserList"
      :table-data="tableData"
      :paginations="paginations"
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
        value: {},
        tableSearch: [],
      },
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
    async handleSearch(formData) {
      try {
        const params = {
          ...formData,
          Page: this.paginations.page,
          MaxResultCount: this.paginations.limit,
        };
        const { result } = await this.get({
          url: this.swaggerUrl.getUserList,
          params,
        });
        this.tableData.rows = result.items || [];
        this.paginations.total = result.totalCount || 0;
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    },
  },
};
</script>
```

### 2. 在 JavaScript 中使用

```javascript
import { UserApi, OrderApi, ProductApi } from "@/api/swagger";

// 用户相关 API
const userApis = {
  getUserList: () => fetch(UserApi.getUserList),
  createUser: (data) =>
    fetch(UserApi.createUser, { method: "POST", body: JSON.stringify(data) }),
  updateUser: (id, data) =>
    fetch(`${UserApi.updateUser}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteUser: (id) =>
    fetch(`${UserApi.deleteUser}/${id}`, { method: "DELETE" }),
};

// 订单相关 API
const orderApis = {
  getOrderList: () => fetch(OrderApi.getOrderList),
  createOrder: (data) =>
    fetch(OrderApi.createOrder, { method: "POST", body: JSON.stringify(data) }),
};

// 产品相关 API
const productApis = {
  getProductList: () => fetch(ProductApi.getProductList),
  getProductById: (id) => fetch(`${ProductApi.getProductById}/${id}`),
};
```

### 3. 在 axios 中使用

```javascript
import axios from "axios";
import { UserApi } from "@/api/swagger";

// 创建 axios 实例
const api = axios.create({
  baseURL: "http://your-api-domain",
  timeout: 10000,
});

// 用户相关 API
const userService = {
  // 获取用户列表
  getUserList: (params) => api.get(UserApi.getUserList, { params }),

  // 创建用户
  createUser: (data) => api.post(UserApi.createUser, data),

  // 更新用户
  updateUser: (id, data) => api.put(`${UserApi.updateUser}/${id}`, data),

  // 删除用户
  deleteUser: (id) => api.delete(`${UserApi.deleteUser}/${id}`),
};

// 使用示例
const getUserList = async () => {
  try {
    const response = await userService.getUserList({
      page: 1,
      size: 20,
      name: "张三",
    });
    console.log("用户列表:", response.data);
  } catch (error) {
    console.error("获取用户列表失败:", error);
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
  "tags": [
    {
      "name": "User",
      "description": "用户管理相关接口"
    }
  ],
  "paths": {
    "/api/app/user/list": {
      "get": {
        "tags": ["User"],
        "summary": "获取用户列表"
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
3. 检查输出目录是否有写入权限
4. 确保 Swagger JSON 格式正确

### Q: 如何自定义 URL 格式？

A: 修改生成的映射或创建自定义映射：

```javascript
// 自定义 API 映射
export const CustomUserApi = {
  getUserList: "/api/custom/user/list",
  createUser: "/api/custom/user/create",
};
```

### Q: 如何处理动态路径参数？

A: 脚本会自动清理路径参数，使用时需要手动添加：

```javascript
// 生成的映射
getUserById: "/api/app/user", //get 根据ID获取用户详情

// 使用时添加参数
const userId = 123
const url = `${UserApi.getUserById}/${userId}`
```

## 最佳实践

1. **定期更新**：API 变更后及时重新生成文件
2. **版本管理**：为不同环境生成不同的映射文件
3. **文档同步**：确保 Swagger 文档与实际 API 一致
4. **类型安全**：结合 TypeScript 使用，提供更好的类型提示
5. **错误处理**：在使用 API 时添加适当的错误处理
6. **性能优化**：合理使用缓存和请求合并

## 与 api.js 的区别

| 特性         | run.js              | api.js              |
| ------------ | ------------------- | ------------------- |
| **功能**     | 生成 API 路径映射   | 生成完整的 API 函数 |
| **输出**     | URL 字符串对象      | 可调用的函数        |
| **用途**     | 为组件提供 URL 映射 | 直接调用 API        |
| **复杂度**   | 简单路径映射        | 完整的请求处理      |
| **适用场景** | 组件内部使用        | 业务逻辑调用        |

## 相关链接

- [ol-base-components 官网](https://github.com/time202051/base-component)
- [Swagger 官方文档](https://swagger.io/docs/)

---

**通过 run.js 脚本，你可以快速生成 API 路径映射文件，为组件提供统一的 URL 管理！** 🚀
