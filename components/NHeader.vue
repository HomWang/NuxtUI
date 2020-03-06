<script>
import NHeaderTheme from "../plugins/themes/default/NHeader";

const { baseClass } = NHeaderTheme;

export default {
  name: "NHeader",

  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    }
  },
  computed: {
    /**
     * The default classes for the header
     * 栅格的默认类
     * @return {Array}
     */
    currentClass() {
      let newSize = "";
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${newSize || "default"}`,
        this.baseClass
      ];

      return classes;
    }
  },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
    /**
     * Raster attribute
     * 顶栏容器属性
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
      "header",
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
