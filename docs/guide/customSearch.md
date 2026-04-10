# 自定义搜索组件 (ol-customSearch)

`ol-customSearch` 是一个专门用于动态搜索配置的组件，提供可视化的搜索条件配置功能，支持配置持久化。

## 效果图

### 搜索组件界面

![搜索组件界面](/assets/customSearch1.png)

### 配置对话框

![配置对话框](/assets/customSearch2.png)

### 搜索项配置

![搜索项配置](/assets/customSearch3.png)

## 基本使用

```vue
<template>
  <ol-customSearch
    :form-search-data="formSearchData"
    @handleSearch="handleSearch"
    @handleReset="handleReset"
  />
</template>

<script>
export default {
  data() {
    return {
      formSearchData: {
        filterConditions: [],
        reset: true,
        expendShow: true,
        value: {},
        tableSearch: [],
        customs: [], // 初始自定义搜索配置
      },
    };
  },
  methods: {
    getTable() {
      // this.post({
      //   url: DeliveryRegister.getDeliveryRegisterList,
      //   isLoading: true,
      //   data: {
      //     Page: this.paginations.page,
      //     MaxResultCount: this.paginations.limit,
      //     FilterConditions: this.formSearchData.filterConditions,
      //   },
      // }).then((res) => {
      //   this.tableData.rows = res.result.items;
      //   this.paginations.total = res.result.totalCount;
      //   this.tableData.emptyImg = true;
      this.formSearchData.customs = res.result?.customs || [];
      // });
    },
    handleSearch(formData) {
      console.log("搜索条件:", formData);
    },
    handleReset() {
      console.log("重置搜索");
    },
  },
};
</script>
```

## API

### Props

| 参数             | 说明                           | 类型   | 可选值   | 默认值       |
| ---------------- | ------------------------------ | ------ | -------- | ------------ |
| `formSearchData` | 搜索表单配置                   | object | —        | 见下方默认值 |
| `method`         | 请求方式                       | string | get/post | get          |


### 属性和方法

`ol-customSearch` 继承了 `ol-search` 的所有属性和方法，详细内容请参考 [ol-search 文档](search.md)。

