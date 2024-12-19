<template>
  <div>我是vue组件:{{ number }}</div>
</template>

<script setup>
defineProps({
  number: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped></style>
