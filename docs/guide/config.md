# 全局配置

ol-base-components 支持全局配置，通过 `Vue.use()` 时传入配置参数，可以统一设置组件的默认行为。

## 配置方式

在应用初始化时，通过 `Vue.use()` 传入配置对象：

```javascript
import Vue from 'vue';
import OlBaseComponents from 'ol-base-components';

// 全局配置
Vue.use(OlBaseComponents, {
  // 配置项
  method: 'post', // ol-table，ol-search分页接口请求方式
  smartPrintBtn: true, // ol-table组件启用智能打印按钮
  // 其他配置项...
});

new Vue({
  el: '#app',
  render: h => h(App)
});
```

## 可用配置项

| 配置项 | 说明 | 类型 | 默认值 | 适用组件 |
|--------|------|------|--------|----------|
| `method` | 默认请求方式 | string | get | ol-search, ol-table |
| `smartPrintBtn` | 智能打印按钮 | boolean | true | ol-table |

## 配置优先级

配置的优先级从高到低为：

1. **组件实例配置**：在组件上直接设置的属性
2. **全局配置**：通过 `Vue.use()` 设置的全局配置
3. **默认配置**：组件内部的默认值

## 示例：设置默认请求方式

### 全局设置为 POST

```javascript
Vue.use(OlBaseComponents, {
  method: 'post'
});
```

这样，所有使用 `ol-search` 和 `ol-table` 的组件默认都会使用 POST 请求方式。

### 局部覆盖

如果某个组件需要使用不同的请求方式，可以在组件上直接设置：

```vue
<template>
  <ol-search
    :method="'get'" <!-- 覆盖全局配置 -->
    :url="swaggerUrl.getUserList"
    :form-search-data="formSearchData"
  />
</template>
```