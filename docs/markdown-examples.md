# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

:100:

> [!CAUTION]
> 行为可能带来的负面影响。

```js
export default {
  data() {
    return {
      msg: "Focused!", // [!code focus]
    };
  },
};
```

```ts:line-numbers {1}
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
};

export default config;
```

```ts [config.ts]
import type { UserConfig } from "vitepress";

const config: UserConfig = {
  // ...
};

export default config;
```

:::

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
import Com from './src/com.vue'
import ShowModel from './src/showModel.vue'
import BaseForm from './src/form/index.vue'
import BaseTable from './src/table/index.vue'

const count = ref(0)



const { page } = useData()
</script>

<button :class="$style.button" @click="count++">Increment{{count}}</button>
<Com :number="count"></Com>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>

## useData()

<pre>{{ page }}</pre>

```js-vue
Hello {{ 1 + 1 }}
```

## teleport

<ShowModel></ShowModel>


## 使用elementPlus组件
vitePress使用elementUi很麻烦，因为专门为vue2设计的，建议vuePress实现
<BaseForm></BaseForm>

<BaseTable></BaseTable>

