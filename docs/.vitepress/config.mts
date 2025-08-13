import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ol-base-components",
  description:
    "基于 Element-UI 的高效表格、表单、搜索、弹框等通用组件，支持 Swagger 自动生成表头，npx 脚本一键生成 API",
  head: [
    ["link", { rel: "icon", href: "/baseCom.github.io/logo.svg" }],
    // 或者使用 SVG 格式
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "指引", link: "/guide/what-is-ol-base" },
    ],

    sidebar: [
      {
        text: "简介",
        items: [
          { text: "什么是ol-base-components", link: "/guide/what-is-ol-base" },
          { text: "快速开始", link: "/guide/getting-started" },
        ],
      },
      {
        text: "组件",
        items: [
          { text: "ol-table", link: "/guide/table" },
          { text: "ol-search", link: "/guide/search" },
          { text: "ol-form", link: "/guide/form" },
        ],
      },
      {
        text: "脚本",
        items: [
          { text: "api", link: "/script/api" },
          { text: "run", link: "/script/run" },
          { text: "init", link: "/script/init" },
          { text: "add", link: "/script/add" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/time202051/base-component" },
    ],
    footer: {
      message: "基于 MIT 许可发布",
      copyright: "版权所有 © 2025-present lijiapeng",
    },
    search: {
      provider: "local",
    },
    logo: "/logo.svg",
  },
  base: "/baseCom.github.io/",
  markdown: {},
});
