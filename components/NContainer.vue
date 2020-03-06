<script>
import NContainerTheme from "../plugins/themes/default/NContainer";

const { baseClass } = NContainerTheme;

export default {
  name: "NContainer",

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
     * The default classes for the container
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
     * 外层容器属性
     * @return {Object}
     */
    getAttributes() {
      return {
        id: this.id
      };
    }
  },
  render: function(createElement) {
    let [...newCurrentClass] = this.currentClass;
    this.$slots.default.forEach((item, index) => {
      if (
        item.tag &&
        (item.tag.includes("NHeader") || item.tag.includes("NFooter"))
      ) {
        newCurrentClass.push("flex-col");
      }
    });
    return createElement(
      "section",
      {
        attrs: this.getAttributes(),
        class: newCurrentClass,
        on: {
          click: this.onClick
        }
      },
      this.$slots.default
    );
  }
};
</script>
