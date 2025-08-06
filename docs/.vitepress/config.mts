import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ol-base",
  description:
    "基于 Element-UI 的高效表格、表单、搜索、弹框等通用组件，支持 Swagger 自动生成表头，npx 脚本一键生成 API",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "简介",
        items: [
          { text: "什么是ol-base", link: "/guide/what-is-ol-base" },
          { text: "快速开始", link: "/guide/getting-started" },
        ],
      },
      {
        text: "组件",
        items: [
          { text: "ol-table", link: "/guide/table" },
          { text: "ol-search", link: "/guide/search" },
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
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Evan You",
    },
    search: {
      provider: "local",
    },
    logo: "/logo.svg",
  },
  base: "/baseCom.github.io/",
  markdown: {},
});
