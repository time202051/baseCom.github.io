# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在此仓库中工作时提供指导。

## 项目概述

这是 **ol-base-components** 组件库的 VitePress 文档站点，部署在 GitHub Pages（`/baseCom.github.io/`）。

ol-base-components 是一套基于 **Element-UI（Vue 2）** 二次封装的**企业级后台管理系统通用组件库**，核心特性是通过 Swagger/OpenAPI 自动生成 CRUD 页面——组件挂载时自动拉取 Swagger JSON，解析出表格列、搜索字段、表单字段，无需前后端手动联调。

文档站点本身使用 **VitePress（Vue 3）+ Element Plus** 构建，提供组件文档、实时演示、和 npx CLI 脚本的使用指南。

GitHub 仓库：`https://github.com/time202051/base-component`

## 常用命令

```bash
npm run docs:dev       # 启动 VitePress 开发服务器
npm run docs:build     # 构建文档站点，输出到 docs/.vitepress/dist/
npm run docs:preview   # 本地预览生产构建
```

## 目录结构

```
baseCom.github.io/
├── .github/workflows/deploy.yml   # GitHub Actions：推送到 main 自动构建并部署到 Pages
├── package.json                    # VitePress + Element Plus
└── docs/                           # VitePress 文档根目录
    ├── index.md                    # 首页（layout: home）
    ├── .vitepress/
    │   ├── config.mts              # 站点配置（标题、导航、侧边栏、base URL）
    │   ├── theme/index.js          # 自定义主题——动态加载 Element Plus
    │   ├── cache/                  # 构建缓存
    │   └── dist/                   # 构建输出
    ├── guide/                      # 组件使用文档
    │   ├── what-is-ol-base.md      # 组件库概览与设计理念
    │   ├── getting-started.md      # 快速开始
    │   ├── config.md               # 全局配置
    │   ├── search.md               # ol-search 搜索组件
    │   ├── customSearch.md         # ol-customSearch 自定义搜索组件
    │   ├── table.md                # ol-table 表格组件
    │   ├── form.md                 # ol-form 表单弹窗组件
    │   └── print.md                # ol-print 打印模板设计器
    ├── script/                     # npx CLI 脚本工具文档
    │   ├── api.md                  # npx api —— 生成 <Tag>Api.js 函数模块
    │   ├── run.md                  # npx run —— 生成 swagger.js 路径映射
    │   ├── init.md                 # npx init —— api + run 一体化
    │   └── add.md                  # npx add —— 交互式生成完整 CRUD 页面
    ├── vscode/
    │   └── vuePageGenerator.md     # VSCode 插件文档
    ├── copyEncryptionCracking/
    │   └── index.md                # 附加文章：绕过企业剪贴板加密
    ├── src/                        # 文档内嵌的 Vue 3 实时演示组件
    │   ├── form/index.vue          # Element Plus 表单演示
    │   └── table/index.vue         # Element Plus 表格演示
    ├── assets/                     # 截图与图片资源
    └── public/                     # 静态资源（SVG logo 等）
```

## 架构要点

### 文档站点 vs 组件库的 Vue 版本差异

| 层面 | 技术栈 |
|---|---|
| 文档站点（本仓库） | VitePress 1.5 + Vue 3 + Element Plus 2.9 |
| 被文档化的组件库 | Element-UI 2.x（Vue 2）|

主题文件 `docs/.vitepress/theme/index.js` 通过 `enhanceApp` 钩子动态导入 Element Plus，注册为 Vue 插件——仅在使用实时演示组件的页面加载，避免全站打包膨胀。

### 站点配置

- **Base URL**: `/baseCom.github.io/`（GitHub Pages 项目子路径）
- **导航栏**: 首页、指南、推荐链接下拉菜单
- **侧边栏**: 按分组组织——简介、组件、全局配置、脚本工具、VSCode 插件
- **搜索**: VitePress 本地搜索
- **页脚**: MIT 许可证，`lastUpdated: true`

### 部署

- 推送到 `main` 分支自动触发 GitHub Actions
- 构建流程: `checkout → setup Node 20 → npm ci → npm run docs:build → upload-pages-artifact → deploy-pages`
- 并发组 `pages` 防止重复部署

## 编辑注意事项

- **VitePress 配置**在 `docs/.vitepress/config.mts`，修改导航/侧边栏/站点元信息在这里。
- **文档内容**是普通 Markdown（`.md`），支持 VitePress 扩展语法（自定义容器、代码组等）。
- **实时演示组件**放在 `docs/src/`，使用 Vue 3 `<script setup>` + Element Plus。这些是文档中嵌入的示例，不是 ol-base-components 库本身。
- **静态资源**放在 `docs/public/`，构建时复制到根目录。
- 本仓库只包含文档站点，不包含 ol-base-components 组件库源码。
