<script>
import NSubmenuTheme from "../plugins/themes/default/NSubmenu";
import NIcon from "./NIcon";

const {
  baseClass,
  submenuBodyClass,
  iconClass,
  focusClass,
  dropdownClass,
  dropdownChildClass
} = NSubmenuTheme;

export default {
  name: "NSubmenu",

  install (Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  components: {
    NIcon
  },

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
    submenuBodyClass: {
      type: [String, Object, Array],
      default: submenuBodyClass
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
      initState: false,
      focusState: false,
      option: this.data,
      isFormat: this.format && !!Object.keys(this.format).length,
      menuItemIndex: null,
      submenuItemStyleHeight: 0,
      //当前submenu的长度
      submenuArray: [],
      //当前submenu的长度
      submenuLength: 0,
      uniqueOpened: false,
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
    },
    submenuItemStyle () {
      return this.submenuItemStyleHeight + "px"
    }
  },
  methods: {
    onClick (e, item, index, currentArray) {
      // console.log(this.$options)
      this.uniqueOpened = this.$parent.uniqueOpened
      let newText = ""
      let countHeight = (this.$children.length - 1) * this.$el.offsetHeight
      let childCountHeight = 0
      let newCountHeight = 0
      this.$children.map((item, index) => {
        if (item.$children.length) {
          childCountHeight = item.$el.offsetHeight * (item.$children.length - 1)
        }
      })
      this.$slots.default.map((item, index) => {
        if (item.text) {
          newText = item.text.trim()
        }
      })
      if (this.$children[1].$children.length > 1) {
        newCountHeight = childCountHeight
      } else {
        newCountHeight = countHeight
      }
      this.$children.map((item, index) => {
        if (item._name == "<NSubmenuItem>") {
          if (this.focusState) {
            Object.assign(item.$data, item.$options.data())
          }
        }
      })
      this.$parent.onSelect(newText, this.index)
      this.submenuItemStyleHeight = !this.focusState ? newCountHeight : "0"
      this.focusState = !this.focusState;
    },
    onSelect (value, childIndex) {
      this.$parent.onSelect(value, this.index, childIndex)
    },
    /**
     * The component to render according to the props
     * 渲染Icon组件
     * @return {String}
     */
    iconToRender (createElement, index) {
      return this.$createElement(NIcon, {
        ref: "menuIcon",
        tag: "n-icon",
        // class: `${this.submenuItemStyleHeight ? this.focusClass : ''} ${this.iconClass || ""}`,
        class: `${this.focusState ? this.focusClass : ''} ${this.iconClass || ""}`,
        props: {}
      });
    },
    /**
     * The component to render according to the props
     * 渲染title组件
     * @return {String}
     */
    submenuTitleRender () {
      let newText = ""
      this.$slots.default.map((item, index) => {
        if (item.text) {
          newText = item.text.trim()
        }
      })
      return this.$createElement(
        "div",
        {
          ref: "n-submenu-title",
          class: `n-submenu-title p-3 relative`,
          props: {},
          on: {
          }
        },
        [newText, this.iconToRender()]
      );
    },
    /**
     * The component to render according to the props
     * 渲染submenuItem组件
     * @return {String}
     */
    submenuItemRender () {
      let newDefault = [];
      let newMenubar = []
      let countHeight = 0;
      if (this.$slots.default.length) {
        this.$slots.default.map((item, index) => {
          if (
            typeof item.tag !== "undefined" &&
            item.tag.includes("NSubmenuItem")
          ) {
            // newDefault.push(item);
            newMenubar.push(
              this.$createElement(
                "div",
                {
                  ref: "n-menubar",
                  class: this.currentClass,
                  on: {
                    click: (e) => {
                      this.onClick(e, item, index, currentArray)
                    }
                  }
                },
                [item]
              )
            );
          }
        });
      }
      return this.$createElement(
        "div",
        {
          ref: "n-submenu-body",
          attrs: {
            style: [`height: ${this.submenuItemStyle} !important`]
          },
          class: `${this.submenuBodyClass}`,
          props: {},
          on: {
          }
        },
        // [newDefault]
        [newMenubar]
      );
    },
  },
  render: function (createElement) {
    // this.$nextTick(() => {
    if (!this.initState) {
      this.initState = true
      this.$parent.$children.map((item, index) => {
        if (item._name === "<NSubmenu>") {
          this.submenuArray.push(item)
          this.submenuLength++
        }
      })
    }
    return this.$createElement(
      "div",
      {
        ref: "n-submenu",
        class: this.currentClass,
        on: {
          click: this.onClick,
          select: this.onSelect
        }
      },
      [this.submenuTitleRender(), this.submenuItemRender()]
    );
  }
};
</script>
