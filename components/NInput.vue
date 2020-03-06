<!-- <input
    :id="id"
    ref="input"
    v-model="currentValue"
    :type="type"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :disabled="disabled"
    :max="max"
    :maxlength="maxlength"
    :min="min"
    :minlength="minlength"
    :multiple="multiple"
    :name="name"
    :pattern="pattern"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="required"
    :class="currentClass"
    @blur="onBlur"
    @focus="onFocus"
    @keyup="$emit('keyup', $event)"
    @keydown="$emit('keydown', $event)"
  /> -->

<script>
import NInputTheme from "../plugins/themes/default/NInput";

const {
  baseClass,
  divClass,
  iconClass,
  defaultStatusClass,
  successStatusClass,
  warningStatusClass,
  errorStatusClass,
  disabledClass,
  defaultSizeClass,
  xsSizeClass,
  smSizeClass,
  baseSizeClass,
  lgSizeClass,
  xlSizeClass,
  xsDefaultSizeClass,
  xsIconSizeClass,
  smIconSizeClass,
  baseIconSizeClass,
  lgIconSizeClass,
  xlIconSizeClass,
  iconSuccessClass,
  iconWarningClass,
  iconErrorClass
} = NInputTheme;

export default {
  name: "NInput",

  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },

  // mixins: [commonAttributes, handleClasses, htmlInputMethods],

  props: {
    // 状态 success(成功) 警告(warning) 失败(error)
    status: {
      type: String,
      default: null,
      validator: function(value) {
        return (
          value === null ||
          ["success", "warning", "error"].indexOf(value) !== -1
        );
      }
    },
    size: {
      type: String,
      default: "sm",
      validator: function(value) {
        return (
          value === null ||
          ["xs", "sm", "base", "lg", "xl"].indexOf(value) !== -1
        );
      }
    },
    // 绑定值
    value: {
      type: [String, Number],
      default: null
    },
    model: {
      // v-model
      type: [String, Object, Number, Boolean, Array],
      default: null
    },
    // 是否重置
    reset: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    // 原生属性，自动获取焦点
    autofocus: {
      type: Boolean,
      default: false
    },
    // 原生属性，自动补全
    autocomplete: {
      type: String,
      default: null
    },
    // 原生属性，设置最大值
    max: {
      type: [String, Number],
      default: null
    },
    // 最大输入长度
    maxlength: {
      type: [String, Number],
      default: null
    },
    // 原生属性，设置最小值
    min: {
      type: [String, Number],
      default: null
    },
    // 最小输入长度
    minlength: {
      type: [String, Number],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: undefined
    },
    pattern: {
      type: String,
      default: null
    },
    // 输入框占位文本(文本框内提示)
    placeholder: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: "text"
    },
    baseClass: {
      type: [String, Object, Array],
      default: baseClass
    },
    divClass: {
      type: [String, Object, Array],
      default: divClass
    },
    iconClass: {
      type: [String, Object, Array],
      default: iconClass
    },
    defaultStatusClass: {
      type: [String, Object, Array],
      default: defaultStatusClass
    },
    successStatusClass: {
      type: [String, Object, Array],
      default: successStatusClass
    },
    warningStatusClass: {
      type: [String, Object, Array],
      default: warningStatusClass
    },
    errorStatusClass: {
      type: [String, Object, Array],
      default: errorStatusClass
    },
    disabledClass: {
      type: [String, Object, Array],
      default: disabledClass
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
    xsDefaultSizeClass: {
      type: [String, Object, Array],
      default: xsDefaultSizeClass
    },
    xsIconSizeClass: {
      type: [String, Object, Array],
      default: xsIconSizeClass
    },
    smIconSizeClass: {
      type: [String, Object, Array],
      default: smIconSizeClass
    },
    baseIconSizeClass: {
      type: [String, Object, Array],
      default: baseIconSizeClass
    },
    lgIconSizeClass: {
      type: [String, Object, Array],
      default: lgIconSizeClass
    },
    xlIconSizeClass: {
      type: [String, Object, Array],
      default: xlIconSizeClass
    },
    iconSuccessClass: {
      type: [String, Object, Array],
      default: iconSuccessClass
    },
    iconWarningClass: {
      type: [String, Object, Array],
      default: iconWarningClass
    },
    iconErrorClass: {
      type: [String, Object, Array],
      default: iconErrorClass
    }
  },

  data() {
    return {
      currentValue: null
    };
  },

  watch: {
    value(value) {
      this.currentValue = value;
    }
  },

  computed: {
    /**
     * The default classes for the input
     * 输入框的默认类
     * @return {Array}
     */
    currentClass() {
      let classes = [
        `${this.$options._componentTag}`,
        `${this.$options._componentTag}-size-${this.size || "default"}`,
        this.baseClass
      ];

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
        case "xl":
          classes.push(this.xlSizeClass);
          break;
        default:
          classes.push(this.defaultSizeClass);
          break;
      }

      switch (this.status) {
        case "success":
          classes.push(this.successStatusClass);
          break;
        case "warning":
          classes.push(this.warningStatusClass);
          break;
        case "error":
          classes.push(this.errorStatusClass);
          break;
        default:
          classes.push(this.defaultStatusClass);
          break;
      }

      if (this.status && this.size) {
        switch (this.size) {
          case "xs":
            classes.push("pr-10");
            break;
          case "sm":
            classes.push("pr-12");
            break;
          case "base":
            classes.push("pr-12");
            break;
          case "lg":
            classes.push("pr-16");
            break;
          case "xl":
            classes.push("pr-16");
            break;
          default:
            classes.push("pr-10");
            break;
        }
      }

      return classes;
    },

    /**
     * The default classes for the input
     * icon的默认类
     * @return {Array}
     */
    iconCurrentClass() {
      let classes = [this.iconClass];
      switch (this.size) {
        case "xs":
          classes.push(this.xsIconSizeClass);
          break;
        case "sm":
          classes.push(this.smIconSizeClass);
          break;
        case "base":
          classes.push(this.baseIconSizeClass);
          break;
        case "lg":
          classes.push(this.lgIconSizeClass);
          break;
        case "xl":
          classes.push(this.xlIconSizeClass);
          break;
        default:
          classes.push(this.xsDefaultSizeClass);
          break;
      }
      switch (this.status) {
        case "success":
          classes.push(this.iconSuccessClass);
          break;
        case "warning":
          classes.push(this.iconWarningClass);
          break;
        case "error":
          classes.push(this.iconErrorClass);
          break;
        // default:
        //   classes.push("");
        //   break;
      }
      return classes;
    }
  },

  methods: {
    onClick(e) {
      this.$emit("click", e);
    },

    onBlur(e) {
      this.$emit("blur", e);
    },

    onFocus(e) {
      this.$emit("focus", e);
    },

    onInput(e) {
      this.$emit("input", e.target.value);
    },

    onChange(e) {
      if (this.currentValue !== e.target.value) {
        this.$emit("change", e.target.value);
      }
    },

    getAttributes() {
      return {
        id: this.id,
        type: this.type,
        autocomplete: this.autocomplete,
        autofocus: this.autofocus,
        disabled: this.disabled,
        max: this.max,
        maxlength: this.maxlength,
        min: this.min,
        minlength: this.minlength,
        multiple: this.multiple,
        name: this.name,
        pattern: this.pattern,
        placeholder: this.placeholder,
        readonly: this.readonly,
        required: this.required,
        event: ["focus", "blur", "input", "change"]
      };
    },

    getIconAttributes() {
      return {
        id: this.id,
        event: ["click"]
      };
    },

    getDivAttributes() {
      return {
        id: this.id,
        event: ["click"]
      };
    },

    /**
     * The component to render according to the props
     * 渲染Input组件
     * @return {String}
     */
    inputToRender(createElement) {
      return createElement(
        "input",
        {
          attrs: this.getAttributes(),
          class: this.currentClass,
          on: {
            blur: this.onBlur,
            focus: this.onFocus,
            input: this.onInput,
            change: this.onChange
          }
        },
        this.$slots.default
      );
    },

    /**
     * The component to render according to the props
     * 根据Input的状态渲染的Icon组件
     * @return {String}
     */
    iconToRender(createElement) {
      let [...newIconCurrentClass] = this.iconCurrentClass;
      newIconCurrentClass.push("n-icon-redact1 right-0");
      return createElement(
        "i",
        {
          attrs: this.getIconAttributes(),
          class: newIconCurrentClass,
          on: {
            click: this.onClick
          }
        },
        this.$slots.default
      );
    }
  },

  render: function(createElement) {
    return createElement(
      "div",
      {
        attrs: this.getDivAttributes(),
        class: this.divClass,
        on: {
          click: this.onClick
        }
      },
      [this.inputToRender(createElement), this.iconToRender(createElement)]
      // this.$slots.default
    );
  }
};
</script>
