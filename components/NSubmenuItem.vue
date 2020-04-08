<script>
import NSubmenuItemTheme from "../plugins/themes/default/NSubmenuItem";
import NIcon from "./NIcon";

const {
  baseClass,
  submenuBodyClass,
  iconClass,
  focusClass,
  dropdownClass,
  dropdownChildClass
} = NSubmenuItemTheme;

export default {
  name: "NSubmenuItem",

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
      focusState: false,
      option: this.data,
      isFormat: this.format && !!Object.keys(this.format).length,
      menuItemIndex: null,
      submenuItemStyleHeight: 0
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
    onClick (e) {
      e.stopPropagation();
      let newText = ""
      let countHeight = (this.$children.length - 1) * this.$el.offsetHeight
      this.$slots.default.map((item, index) => {
        if (item.text) {
          newText = item.text.trim()
        }
      })
      if (this.$parent._name === "<NSubmenu>") {
        if (this.focusState) {
          this.$parent.$data.submenuItemStyleHeight = this.$parent.$data.submenuItemStyleHeight - e.target.offsetParent.offsetHeight + e.target.offsetHeight
        } else {
          this.$parent.$data.submenuItemStyleHeight = countHeight + this.$parent.$data.submenuItemStyleHeight
        }
      }
      this.$parent.onSelect(newText, this.index)
      this.submenuItemStyleHeight = !this.focusState ? countHeight : "0"
      if (this.$children.length > 1) {
        this.focusState = !this.focusState;
      }
      console.log(this.$options.propsData.index, this.index)

      // console.log(this.$parent.$children)
      // console.log(this.submenuItemStyleHeight)
      // this.$parent.$children.map((item, index, currentArray) => {
      //   if (item._name === "<NSubmenuItem>") {
      //     // console.log(index, item.$data.focusState)
      //     // this.$parent.$children[index].$data.focusState = false
      //     // item.$data.focusState = false
      //     if (item.$data.focusState) {
      //       // Object.assign(item.$data, item.$options.data())
      //       // this.$parent.$data.submenuItemStyleHeight = this.$parent.$data.submenuItemStyleHeight - item.$data.submenuItemStyleHeight
      //       this.$parent.$children[index].$data.focusState = false
      //       this.focusState = false
      //       item.focusState = false
      //       // this.$parent.$children[index - 1].$data.submenuItemStyleHeight = 0
      //       // console.log(index, item.$data.focusState)
      //     }
      //     if (e.target.innerText === item.$el.firstElementChild.innerText) {
      //       // console.log(item)
      //       // item.$data.focusState = !item.$data.focusState
      //       // console.log(item.focusState)
      //       // item.focusState = !item.focusState
      //       console.log(this.$parent.$children[index].$data.focusState, this.$parent.uniqueOpened)
      //       this.$parent.$children[index].$data.focusState = !this.$parent.$children[index].$data.focusState
      //       console.log(item.focusState, item.$data.focusState, this.$parent.$children[index].$data.focusState)
      //     }
      //   }
      // });
    },
    onSelect (value, childIndex) {
      let newIndexArray = []
      newIndexArray.push(this.index)
      if (childIndex) {
        if (childIndex.length && typeof childIndex === "object") {
          newIndexArray.push(...childIndex)
        } else {
          newIndexArray.push(childIndex)
        }
      }
      this.$parent.onSelect(value, newIndexArray)
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
        class: `absolute n-icon-dropdown ${this.focusState ? this.focusClass : ''} ${this.iconClass || ""}`,
        props: {}
      });
    },
    /**
     * The component to render according to the props
     * 渲染title组件
     * @return {String}
     */
    submenuTitleRender (isNSubmenuItem) {
      return this.$createElement(
        "div",
        {
          ref: "n-submenu-title",
          class: `n-submenu-title ${isNSubmenuItem ? 'p-3' : 'p-0'} relative`,
          props: {},
          on: {
          }
        },
        isNSubmenuItem ?
          [this.$slots.default[0], this.iconToRender()] :
          this.$slots.default[0].text
      );
    },
    /**
     * The component to render according to the props
     * 渲染submenuItem组件
     * @return {String}
     */
    submenuItemRender () {
      let newDefault = [];
      let countHeight = 0;
      if (this.$slots.default.length) {
        this.$slots.default.map((item, index) => {
          if (
            typeof item.tag !== "undefined" &&
            item.tag.includes("NSubmenuItem")
          ) {
            newDefault.push(item);
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
        [newDefault]
      );
    },
  },
  render: function (createElement) {
    // console.log(this.$slots.default.length)
    // let newDefault = [];
    // if (this.$slots.default.length) {
    //   this.$slots.default.map((item, index) => {
    //     if (typeof item.tag !== "undefined") {
    //       console.log(item)
    //       newDefault.push(item)
    //     }
    //   });
    // }
    let [...newCurrentClass] = this.currentClass;
    let isNSubmenuItem = false
    // "vue-component-16-NSubmenuItem"
    // console.log(this.$slots.default)
    if (this.$slots.default.length) {
      this.$slots.default.map((item, index) => {
        if (
          typeof item.tag !== "undefined" &&
          (item.tag.includes("NSubmenuItem"))
        ) {
          isNSubmenuItem = true
        }
      });
    }
    if (isNSubmenuItem) {
      newCurrentClass.push("p-0");
    } else {
      newCurrentClass.push("p-3");
    }
    return this.$createElement(
      "div",
      {
        ref: "n-submenu",
        class: newCurrentClass,
        // props: {
        //   parentIndex: this.index
        // },
        // attrs: {
        //   style: [`height: ${this.$slots.default.length > 1 ? 'auto' : this.submenuItemStyle} !important`]
        // },
        on: {
          click: this.onClick
        }
      },
      // "vue-component-16-NSubmenuItem"

      isNSubmenuItem ?
        [this.submenuTitleRender(isNSubmenuItem), this.submenuItemRender()] :
        [this.$slots.default]
    );
  }
};
</script>
