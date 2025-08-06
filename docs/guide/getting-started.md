# 快速开始

本指南将帮助你快速安装和配置 ol-base-components。

## 📦 安装

### 环境要求

- Node.js >= 12.0.0
- Vue >= 2.6.0
- Element-UI >= 2.15.0

### 安装依赖

```bash
# 安装 ol-base-components
npm install ol-base-components

# 安装 Swagger 客户端（可选，用于 API 集成）
npm install swagger-client@3.0.1
```

## ⚙️ 引入

### 1. 引入组件库

```javascript
// main.js
import Vue from "vue";
import OlBaseComponents from "ol-base-components";

// 使用组件库
Vue.use(OlBaseComponents);
```

### 2. Swagger 集成（可选）

如果你的项目有 Swagger API 文档，可以启用自动生成功能：

### 安装 Swagger 数据

```javascript
// main.js
import Vue from "vue";
import { swaggerInstall } from "ol-base-components";

// 安装 Swagger 数据（可在登录成功后调用）
swaggerInstall("http://your-api-domain/swagger/v1/swagger.json")
  .then(() => {
    console.log("Swagger 数据加载成功");
  })
  .catch((error) => {
    console.error("Swagger 数据加载失败:", error);
  });
```

### 卸载 Swagger 数据

```javascript
import { swaggerUnload } from "ol-base-components";

// 卸载（可在退出后调用）
swaggerUnload();
```

## 常见问题

### Q: 组件不显示怎么办？

A: 检查以下几点：

1. 是否正确引入组件库 `Vue.use(OlBaseComponents)`
2. 组件名称是否正确 `<ol-table>`
3. 数据配置是否正确

### Q: Swagger 集成失败？

A: 检查以下几点：

1. Swagger URL 是否正确
2. 网络连接是否正常
3. API 文档格式是否正确

### Q: npx 命令不工作？

A: 检查以下几点：

1. Node.js 版本是否 >= 12
2. 网络连接是否正常
3. 是否有权限问题

**恭喜！你已经成功安装了 ol-base-components。现在可以开始使用组件了！** 🎉
