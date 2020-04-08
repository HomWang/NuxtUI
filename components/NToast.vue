<script>
import NToastTheme from "../plugins/themes/default/NToast";

const { baseClass } = NToastTheme;
//构造组件的选项
export default {
  name: "NToast",
  props: {
    autoClose: {
      type: [Boolean, Number],
      default: 5,
      validator(value) {
        return value === false || typeof value === "number";
      }
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: "关闭",
          callback: undefined
        };
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: "top",
      validator(value) {
        return ["top", "bottom", "middle"].indexOf(value) >= 0;
      }
    }
  },
  mounted() {
    this.updateStyles();
    this.execAutoClose();
  },
  computed: {
    /**
     * The default classes for the main
     * toast的默认类
     * @return {Array}
     */
    currentClass() {
      let newSize = "";
      let classes = [`n-toast`, `position-${this.position}`, this.baseClass];

      return classes;
    }
  },
  methods: {
    updateStyles() {
      this.$nextTick(() => {
        this.$refs.line.style.height = `${
          this.$refs.toast.getBoundingClientRect().height
        }px`;
      });
    },
    execAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoClose * 1000);
      }
    },
    close() {
      this.$el.remove();
      this.$emit("close");
      this.$destroy();
    },
    onClickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === "function") {
        this.closeButton.callback(this); //this === toast实例
      }
    },
    /**
     * Raster attribute
     * Toast属性
     * @return {Object}
     */
    getAttributes() {
      return {
        id: this.id
      };
    }
  },
  render: function(createElement) {
    return this.$createElement(
      "div",
      {
        attrs: this.getAttributes(),
        class: this.currentClass
      },
      [
        this.$createElement(
          "div",
          {
            ref: "toast",
            class: "toast"
          },
          [
            this.$createElement(
              "div",
              {
                class: "message"
              },
              this.enableHtml || this.$slots.default[0]
            ),
            this.$createElement("div", {
              ref: "line",
              class: "line"
            }),
            this.closeButton
              ? this.$createElement(
                  "div",
                  {
                    class: "close",
                    on: {
                      click: this.onClickClose
                    }
                  },
                  this.closeButton ? this.closeButton.text : "关闭"
                )
              : ""
          ]
        )
      ]
    );
  }
};
</script>
