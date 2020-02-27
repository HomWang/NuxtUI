<template>
  <svg class="n-icon" @click="$emit('click', $event)">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>
<script>
import "../../svg";
export default {
  name: "NIcon",
  props: ["name"]
};
</script>
<style lang="scss" scoped>
.n-icon {
  width: 1em;
  height: 1em;
}
</style>
