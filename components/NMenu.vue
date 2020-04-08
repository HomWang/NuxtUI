<script>
import NMenuTheme from "../plugins/themes/default/NMenu";

const {
  baseClass,
  iconClass,
  focusClass,
  dropdownClass,
  dropdownChildClass
} = NMenuTheme;

export default {
  name: "NMenu",

  install (Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    mode: {
      // horizontal / vertical
      type: String,
      value: "vertical"
    },
    uniqueOpened: {
      type: Boolean,
      value: false
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
      menuItemIndex: null,
      submenuItemStyleHeight: 0,
      //当前submenu的长度
      submenuArray: [],
      //当前submenu的长度
      submenuLength: 0,
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
    onSelect (value, index, childIndex) {
      let newIndexArray = []
      if (index) {
        newIndexArray.push(index)
      }
      if (childIndex) {
        if (childIndex.length && typeof childIndex === "object") {
          newIndexArray.push(...childIndex)
        } else {
          newIndexArray.push(childIndex)
        }
      }
      this.$emit("select", value, newIndexArray[newIndexArray.length - 1], newIndexArray)
    },
    onMouseenter () {
      // console.log("移入");
      // this.focusState = true;
    },
    onMouseleave () {
      // console.log("移出");
      // this.focusState = false;
    },
    onClick (e, item, index, currentArray) {
      // this.focusState = !this.focusState;
      if (item.componentOptions.tag === "n-submenu") {
        let countHeight = (item.componentInstance.$children.length - 1) * item.componentInstance.$el.offsetHeight
        let childCountHeight = 0
        let newCountHeight = 0
        item.componentInstance.$children.map((itemChild) => {
          if (itemChild.$children.length) {
            childCountHeight = itemChild.$el.offsetHeight * (item.componentInstance.$children.length - 1)
          }
        })
        if (item.componentInstance.$data.focusState) {
          if (item.componentInstance.$children[1].$children.length > 1) {
            newCountHeight = childCountHeight
          } else {
            newCountHeight = countHeight
          }
        }
        if (this.uniqueOpened) {
          item.componentInstance.$children.map((itemChild) => {
            if (itemChild._name == "<NSubmenuItem>") {
              if (itemChild.focusState) {
                Object.assign(itemChild.$data, itemChild.$options.data())
              }
            }
          })
          currentArray.map((itemCurrent) => {
            if (itemCurrent.componentOptions && itemCurrent.componentOptions.tag === "n-submenu") {
              Object.assign(itemCurrent.componentInstance.$data, itemCurrent.componentInstance.$options.data())
            }
          })
          item.componentInstance.$data.submenuItemStyleHeight = !item.componentInstance.$data.focusState ? newCountHeight : "0"
          item.componentInstance.$data.focusState = !item.componentInstance.$data.focusState
          if (item.componentInstance.$data.focusState && (Number(item.componentInstance.$data.submenuItemStyleHeight) === 0)) {
            item.componentInstance.$data.submenuItemStyleHeight = 0
            item.componentInstance.$data.focusState = false
          }
        } else {
          item.componentInstance.$data.submenuItemStyleHeight = item.componentInstance.$data.focusState ? newCountHeight : "0"
        }
      }
    },
  },
  render: function (createElement) {
    let newDefault = [];
    let newMenubar = [];
    if (this.$slots.default.length) {
      this.$slots.default.map((item, index, currentArray) => {
        if (
          typeof item.tag !== "undefined" &&
          (item.tag.includes("NMenuItem") || item.tag.includes("NSubmenu"))
        ) {
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
        ref: "n-menu",
        class: this.currentClass,
        on: {
          // select: this.onSelect
          // click: this.onClick,
          // mouseenter: this.onMouseenter,
          // mouseleave: this.onMouseleave
        }
      },
      [newMenubar]
      // this.$slots.default
    );
  }
};
</script>
