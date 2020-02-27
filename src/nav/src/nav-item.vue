<template>
  <div
    class="n-nav-item"
    :class="{ selected, vertical }"
    @click="onClick"
    :data-name="name"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NNavItem",
  inject: ["root", "vertical"],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: false
    };
  },
  created() {
    this.root.addItem(this);
  },
  methods: {
    onClick() {
      this.root.namePath = [];
      this.$parent.updateNamePath && this.$parent.updateNamePath();
      this.$emit("update:selected", this.name);
    }
  }
};
</script>

<style scoped lang="scss">
@import "var";
.n-nav-item {
  padding: 10px 20px;
  position: relative;
  &:not(.vertical) {
    &.selected {
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
  }
  &.vertical {
    &.selected {
      color: $blue;
    }
  }
}
a {
  color: inherit;
  text-decoration: none;
}
.n-sub-nav .n-nav-item:not(.vertical) {
  &.selected {
    color: $color;
    background: $grey;
    &::after {
      display: none;
    }
  }
}
</style>
