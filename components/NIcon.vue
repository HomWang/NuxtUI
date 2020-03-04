<script>
import NIconTheme from "../plugins/themes/default/NIcon";

const {
  baseClass,
  loadingClass,
  defaultSizeClass,
  xsSizeClass,
  smSizeClass,
  baseSizeClass,
  lgSizeClass,
  xlSizeClass,
  xl2SizeClass,
  xl3SizeClass,
  xl4SizeClass,
  xl5SizeClass,
  xl6SizeClass
} = NIconTheme;

export default {
  name: "NIcon",

  install (Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    size: {
      type: String,
      default: null,
      validator: function (value) {
        return (
          value === null ||
          ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].indexOf(value) !== -1
        );
      }
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingClass: {
      type: [String, Object, Array],
      default: loadingClass,
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    defaultSizeClass: {
      type: [String, Object, Array],
      default: defaultSizeClass
    },
    xsSizeClass: {
      type: [String, Object, Array],
      default: xsSizeClass
    },
    smSizeClass: {
      type: [String, Object, Array],
      default: smSizeClass
    },
    baseSizeClass: {
      type: [String, Object, Array],
      default: baseSizeClass
    },
    lgSizeClass: {
      type: [String, Object, Array],
      default: lgSizeClass
    },
    xlSizeClass: {
      type: [String, Object, Array],
      default: xlSizeClass
    },
    xl2SizeClass: {
      type: [String, Object, Array],
      default: xl2SizeClass
    },
    xl3SizeClass: {
      type: [String, Object, Array],
      default: xl3SizeClass
    },
    xl4SizeClass: {
      type: [String, Object, Array],
      default: xl4SizeClass
    },
    xl5SizeClass: {
      type: [String, Object, Array],
      default: xl5SizeClass
    },
    xl6SizeClass: {
      type: [String, Object, Array],
      default: xl6SizeClass
    }
  },

  computed: {
    /**
     * The default classes for the button
     * 按钮的默认类
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${this.size || "default"}`,
        this.baseClass
      ];

      if (this.loading) {
        classes.push(this.loadingClass);
      }

      switch (this.size) {
        case "xs":
          classes.push(this.xsSizeClass);
          break;
        case "sm":
          classes.push(this.smSizeClass);
          break;
        case "base":
          classes.push(this.baseSizeClass);
          break;
        case "lg":
          classes.push(this.lgSizeClass);
          break;
        case "lg":
          classes.push(this.lgSizeClass);
          break;
        case "xl":
          classes.push(this.xlSizeClass);
          break;
        case "2xl":
          classes.push(this.xl2SizeClass);
          break;
        case "3xl":
          classes.push(this.xl3SizeClass);
          break;
        case "4xl":
          classes.push(this.xl4SizeClass);
          break;
        case "5xl":
          classes.push(this.xl5SizeClass);
          break;
        case "6xl":
          classes.push(this.xl6SizeClass);
          break;
        default:
          classes.push(this.defaultSizeClass);
          break;
      }

      return classes
    }
  },
  methods: {
    onBlur (e) {
      this.$emit("blur", e);
    },

    onFocus (e) {
      this.$emit("focus", e);
    },

    onClick (e) {
      this.$emit("click", e);
    },

    blur () {
      this.$el.blur();
    },

    focus () {
      this.$el.focus();
    },
  },

  render: function (createElement) {
    return createElement(
      "i",
      {
        class: this.currentClass,
      },
      this.$slots.default
    )
  }

}
</script>