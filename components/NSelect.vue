<script>
import NSelectTheme from "../plugins/themes/default/NSelect";
import Ninput from "./NInput";

const {
  baseClass,
  focusClass,
  dropdownClass,
  dropdownChildClass
} = NSelectTheme;

export default {
  name: "NSelect",
  components: { Ninput },

  install (Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  props: {
    data: {
      type: [String, Object, Array],
      default: null
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    focusClass: {
      type: [String, Object, Array],
      default: focusClass
    },
    dropdownClass: {
      type: [String, Object, Array],
      default: dropdownClass
    },
    dropdownChildClass: {
      type: [String, Object, Array],
      default: dropdownChildClass
    },
    // 输入框占位文本(文本框内提示)
    placeholder: {
      type: String,
      default: null
    },
    // 数据格式化
    format: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      currentValue: "",
      focusState: false,
      option: this.data,
      isChange: false,
      isFormat: this.format && !!Object.keys(this.format).length
    };
  },

  watch: {
    currentValue (val) {
      this.$refs.selectInput.currentValue = val
    }
  },

  computed: {
    /**
     * The default classes for the input
     * 选择框的默认类
     * @return {Array}
     */
    currentClass () {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${this.size || "default"}`,
        this.baseClass
      ];
      return classes
    }
  },

  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.outDivClickHandler);
    })
  },

  methods: {

    //监听点击在元素外
    outDivClickHandler (e) {
      const target = e.target;
      // 组件已挂载且事件触发对象不在div内
      if (this.$refs.selectDiv && target !== this.menu && !this.$refs.selectDiv.contains(target)) {
        this.focusState = false
      }
    },

    onClick (e) {
      this.$emit("click", e);
      this.focusState = !this.focusState
    },

    onNewClick (e) {
      e.stopPropagation()
    },

    onClickDropdown (item) {
      let newLable = this.isFormat ? item[this.format.lable] : item.lable
      let newValue = this.isFormat ? item[this.format.value] : item.Value
      if (!newLable) {
        throw new Error(`${!newLable ? `format格式化-lable值类型定义错误: ${newLable}` : ''}`);
      }
      if (!newValue) {
        throw new Error(`${!newValue ? `format格式化-value值类型定义错误: ${newValue}` : ''}`);
      }
      if (this.$refs.selectInput.currentValue !== item.lable) {
        this.isChange = true
        this.$emit("change", newValue);
      }
      this.$refs.selectInput.currentValue = newLable
      this.currentValue = newLable
      this.focusState = false
    },

    getDivAttributes () {
      return {
        id: this.id
      };
    },

    /**
     * The component to render according to the props
     * 渲染Input组件
     * @return {String}
     */
    inputToRender (createElement) {
      return this.$createElement(Ninput, {
        ref: "selectInput",
        props: {
          icon: `iconn-icon-dropdown duration-300 ${this.focusState ? this.focusClass : ""}`,
          hoverClass: 'cursor-pointer',
          readonly: "readonly",
          placeholder: this.placeholder
        }
      })
    },

    /**
     * The component to render according to the props
     * 根据dropdown渲染的列表组件
     * @return {String}
     */
    dropdownToRender (createElement) {
      let newList = [];
      this.option.map((item) => {
        newList.push(createElement("div",
          {
            attrs: {
              class: this.dropdownChildClass
            },
            on: {
              click: (e) => {
                e.stopPropagation()
                this.onClickDropdown(item)
              }
            }
          },
          this.isFormat ? item[this.format.lable] : item.lable)
        );
      })
      return this.$createElement(
        "div",
        {
          ref: "dropdown",
          class: this.dropdownClass,
          on: {
          }
        },
        newList
      );
    }
  },

  render: function (createElement) {
    return createElement(
      "div",
      {
        ref: "selectDiv",
        attrs: this.getDivAttributes(),
        class: this.currentClass,
        on: {
          click: [this.onClick]
        },
      },
      [this.inputToRender(createElement), this.focusState && this.dropdownToRender(createElement)]
    );
  }
};
</script>
