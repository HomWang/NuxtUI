<script>
import NGridTheme from "../plugins/themes/default/NGrid";

const { baseClass } = NGridTheme;

export default {
  name: "NGrid",

  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    // 响应式列展示个数
    sm: {
      type: Number,
      default: 0
    },
    md: {
      type: Number,
      default: 0
    },
    lg: {
      type: Number,
      default: 0
    },
    xl: {
      type: Number,
      default: 0
    },
    // 几行
    row: {
      type: [String, Number],
      default: "none"
    },
    // 几列
    col: {
      type: [String, Number],
      default: "none"
    },
    // 占一行几个
    rowSpan: {
      type: [String, Number],
      default: "auto"
    },
    // 占一列几个
    colSpan: {
      type: [String, Number],
      default: "auto"
    },
    // 行从开始几个位置
    rowStart: {
      type: [String, Number],
      default: "auto"
    },
    // 行从倒数几个位置
    rowEnd: {
      type: [String, Number],
      default: "auto"
    },
    // 列从开始几个位置
    colStart: {
      type: [String, Number],
      default: "auto"
    },
    // 列从倒数几个位置
    colEnd: {
      type: [String, Number],
      default: "auto"
    },
    // 每个元素的间隙
    gap: {
      type: [String, Number],
      default: 0
    },
    // 行间隙
    rowGap: {
      type: [String, Number],
      default: 0
    },
    // 列间隙
    colGap: {
      type: [String, Number],
      default: 0
    },
    // 列循序布局
    colFlow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * The default classes for the grid
     * 栅格的默认类
     * @return {Array}
     */
    currentClass() {
      let newSize = "";
      let sizeClass = "";
      if (this.xl) {
        newSize = "xl:";
        sizeClass += `${newSize}grid-cols-${this.xl} `;
      }
      if (this.lg) {
        newSize = "lg:";
        sizeClass += `${newSize}grid-cols-${this.lg} `;
      }
      if (this.md) {
        newSize = "md:";
        sizeClass += `${newSize}grid-cols-${this.md} `;
      }
      if (this.sm) {
        newSize = "sm:";
        sizeClass += `${newSize}grid-cols-${this.sm}`;
      }
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${newSize || "default"}`,
        sizeClass,
        this.baseClass
      ];

      if (this.row !== "none" && this.row > 0 && this.row < 13) {
        classes.push(`${newSize}grid-rows-${this.row}`);
      }

      if (this.col !== "none" && this.col > 0 && this.col < 13 && !sizeClass) {
        classes.push(`${newSize}grid-cols-${this.col}`);
      }

      if (this.rowSpan !== "auto" && this.rowSpan > 0 && this.rowSpan < 14) {
        classes.push(`${newSize}row-span-${this.rowSpan}`);
      }

      if (this.colSpan !== "auto" && this.colSpan > 0 && this.colSpan < 14) {
        classes.push(`${newSize}col-span-${this.colSpan}`);
      }

      if (this.rowStart !== "auto" && this.rowStart > 0 && this.rowStart < 13) {
        classes.push(`${newSize}row-start-${this.rowStart}`);
      }

      if (this.rowEnd !== "auto" && this.rowEnd > 0 && this.rowEnd < 14) {
        classes.push(`${newSize}row-end-${this.rowEnd}`);
      }

      if (this.colStart !== "auto" && this.colStart > 0 && this.colStart < 13) {
        classes.push(`${newSize}col-start-${this.colStart}`);
      }

      if (this.colEnd !== "auto" && this.colEnd > 0 && this.colEnd < 14) {
        classes.push(`${newSize}col-end-${this.colEnd}`);
      }

      if (this.gap !== 0 && (this.gap < 65 || this.gap === "px")) {
        classes.push(`${newSize}gap-${this.gap}`);
      }

      if (this.rowGap !== 0 && (this.rowGap < 65 || this.rowGap === "px")) {
        classes.push(`${newSize}row-gap-${this.rowGap}`);
      }

      if (this.colGap !== 0 && (this.colGap < 65 || this.colGap === "px")) {
        classes.push(`${newSize}col-gap-${this.colGap}`);
      }

      if (this.colFlow) {
        classes.push(`${newSize}grid-flow-col`);
      }

      return classes;
    }
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
    /**
     * Raster attribute
     * 栅格属性
     * @return {Object}
     */
    getAttributes() {
      return {
        id: this.id
      };
    }
  },
  render: function(createElement) {
    return createElement(
      "div",
      {
        attrs: this.getAttributes(),
        class: this.currentClass,
        on: {
          click: this.onClick
        }
      },
      this.$slots.default
    );
  }
};
</script>
