# API 脚本 - init.js

`init.js` 脚本是 `api.js` 和 `run.js` 的组合命令，一次性执行两个脚本，生成完整的 API 接口文件和路径映射文件。

## 功能特性

- **一键生成**：同时执行 api.js 和 run.js 脚本
- **完整配置**：生成 API 函数和路径映射文件
- **自动化流程**：按顺序执行，确保文件一致性
- **错误处理**：完善的错误处理和状态提示
- **进度显示**：实时显示执行进度和状态

## 基础用法

### 1. 基本命令

**使用格式：**

```bash
npx init <swaggerUrl>
```

**案例：**

```bash
npx init http://192.168.1.100:8080
```

### 2. 参数说明

| 参数         | 说明                   | 类型   | 必填 | 默认值 |
| ------------ | ---------------------- | ------ | ---- | ------ |
| `swaggerUrl` | Swagger API 的基础 URL | string | ✅   | —      |

## 生成的文件结构

执行脚本后，会在默认目录下生成以下文件：

```bash
src/api/
├── modules/ # API 函数模块目录
│ ├── index.js # 模块导出入口文件
│ ├── UserApi.js # 用户相关 API 函数
│ ├── OrderApi.js # 订单相关 API 函数
│ └── ... # 其他模块文件
└── swagger.js # API 路径映射文件
```

## 执行流程

### 1. 执行顺序

```bash
npx init http://your-api-domain
```

执行流程：

1. **�� 执行 swagger 脚本**：运行 api.js，生成 API 函数文件
2. **🔧 执行 接口 脚本**：运行 run.js，生成路径映射文件
3. **�� 完成**：所有文件生成完成

### 2. 执行状态

```bash
📝 正在执行 swagger 脚本...
✅ swagger脚本执行完成
�� 正在执行 接口 脚本...
✅ 接口 脚本执行完成
�� 所有脚本执行完成！
```

## 常见问题

### Q: 脚本执行失败怎么办？

A: 检查以下几点：

1. 确保 Swagger URL 可访问
2. 检查网络连接
3. 确保已安装 `swagger-client` 依赖
4. 检查输出目录是否有写入权限
5. 确保 Swagger JSON 格式正确

### Q: 如何只生成部分文件？

A: 使用单独的脚本：

```bash
# 只生成 API 函数文件
npx api http://your-api-domain

# 只生成路径映射文件
npx run http://your-api-domain
```

### Q: 如何自定义输出路径？

A: init.js 使用默认路径，如需自定义请使用单独的脚本：

```bash
# 自定义 API 函数输出路径
npx api http://your-api-domain ./src/api/custom

# 自定义路径映射输出路径
npx run http://your-api-domain ./src/api/custom/swagger.js
```

## 最佳实践

1. **定期更新**：API 变更后及时重新生成文件
2. **版本管理**：为不同环境生成不同的 API 文件
3. **文档同步**：确保 Swagger 文档与实际 API 一致
4. **类型安全**：充分利用 JSDoc 提供的类型提示
5. **错误处理**：在使用 API 时添加适当的错误处理
6. **性能优化**：合理使用缓存和请求合并

## 与其他脚本的区别

| 特性         | init.js           | api.js             | run.js             |
| ------------ | ----------------- | ------------------ | ------------------ |
| **功能**     | 组合执行两个脚本  | 生成 API 函数      | 生成路径映射       |
| **输出**     | 完整的 API 文件集 | 可调用的函数       | URL 字符串对象     |
| **复杂度**   | 中等（组合脚本）  | 高（完整请求处理） | 低（简单路径映射） |
| **适用场景** | 完整项目初始化    | 业务逻辑调用       | 组件内部使用       |
| **自定义**   | 不支持自定义路径  | 支持自定义路径     | 支持自定义路径     |

## 相关链接

- [ol-base-components 官网](https://github.com/time202051/base-component)
- [API 脚本 - api.js](/script/api) - 生成完整的 API 函数文件
- [API 脚本 - run.js](/script/run) - 生成 API 路径映射文件
- [Swagger 官方文档](https://swagger.io/docs/)

---

**通过 init.js 脚本，你可以一键生成完整的 API 文件集，快速搭建项目基础！** 🚀
