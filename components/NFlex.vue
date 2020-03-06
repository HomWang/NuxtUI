<script>
import NFlexTheme from "../plugins/themes/default/NFlex";

const { baseClass } = NFlexTheme;

export default {
  name: "NFlex",

  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    flex: {
      type: [Number, String],
      default: "none"
    },
    // row(行从开头开始) row-reverse(行从结尾开始) col(列从开头开始) col-reverse(列从结尾开始)
    direction: {
      type: String,
      default: ""
    },
    // 排序 start:order-first  end:order-last
    order: {
      type: String,
      default: ""
    },
    // 增长到填充任何可用空间
    grow: {
      type: Boolean,
      default: false
    },
    // 是否收缩
    shrink: {
      type: Boolean,
      default: false
    },
    // 行对齐方式 start(开头) center(居中) end(结尾) between(第一个为开头、居中(其余子元素居中)、最后一个为结尾) around(所有子元素居中)
    justify: {
      type: String,
      default: ""
    },
    // 父元素针对子元素对齐方式 stretch(撑满父元素的高度) start(开头) center(居中) end(结尾)
    items: {
      type: String,
      default: ""
    },
    // 内容队列方式 start(开头) center(居中) end(结尾)
    content: {
      type: String,
      default: ""
    },
    // 元素本身对齐方式 auto(撑满父元素的高度) start(开头) center(居中) end(结尾) stretch(撑满父元素的高度)
    // 注：如果父元素为 stretch 子元素为auto(撑满父元素的高度)，如果父元素不为 stretch 子元素本身为 stretch(也是撑满父元素的高度)
    self: {
      type: String,
      default: ""
    }
  },
  computed: {
    /**
     * The default classes for the flex
     * 栅格的默认类
     * @return {Array}
     */
    currentClass() {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${this.size || "default"}`,
        `flex-${this.flex}`,
        this.baseClass
      ];

      if (this.direction) {
        classes.push(`flex-${this.direction}`);
      }

      if (this.order === "start") {
        classes.push("order-first");
      }

      if (this.order === "end") {
        classes.push("order-last");
      }

      if (this.grow) {
        classes.push("flex-grow");
      }

      if (this.shrink) {
        classes.push("flex-shrink");
      }

      if (this.justify) {
        classes.push(`justify-${this.justify}`);
      }

      if (this.items) {
        classes.push(`items-${this.items}`);
      }

      if (this.content) {
        classes.push(`content-${this.content}`);
      }

      if (this.self) {
        classes.push(`self-${this.self}`);
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
     * flex属性
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
