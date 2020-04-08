<script>
import NMenuItemTheme from "../plugins/themes/default/NMenuItem";

const {
  baseClass,
  iconClass,
  focusClass,
  dropdownClass,
  dropdownChildClass
} = NMenuItemTheme;

export default {
  name: "NMenuItem",

  install (Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  inheritAttrs: false,

  props: {
    index: {
      type: [Number, String],
      value: null
    },
    data: {
      type: Array,
      default: null
    },
    active: {
      type: [Number, String],
      value: null
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    iconClass: {
      type: [String, Object, Array],
      default: iconClass
    },
    focusClass: {
      type: [String, Object, Array],
      default: focusClass
    },
    dropdownChildClass: {
      type: [String, Object, Array],
      default: dropdownChildClass
    },
    // 数据格式化
    format: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      focusState: false,
      option: this.data,
      isFormat: this.format && !!Object.keys(this.format).length,
      menuItemIndex: null
    };
  },
  computed: {
    /**
     * The default classes for the button
     * 导航菜单的默认类
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        // `${this.$options._componentTag}-size-${this.size || "default"}`,
        this.baseClass
      ];
      return classes;
    }
  },
  methods: {
    onClick (index) {
      let newText = ""
      this.$slots.default.map((item, index) => {
        if (item.text) {
          newText = item.text.trim()
        }
      })
      this.$parent.onSelect(newText, this.index)
      this.focusState = !this.focusState;
    }
  },
  render: function (createElement) {
    return this.$createElement(
      "div",
      {
        ref: "n-menu-item",
        class: this.currentClass,
        on: {
          click: this.onClick
        }
      },
      [this.$slots.default]
    );
  }
};
</script>
