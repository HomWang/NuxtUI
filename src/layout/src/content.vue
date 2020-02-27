<template>
  <div class="n-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NContent"
};
</script>

<style lang="scss" scoped>
.n-content {
  flex-grow: 1;
}
</style>
