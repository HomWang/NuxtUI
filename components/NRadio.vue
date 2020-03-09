<script>
    import NRadioTheme from "../plugins/themes/default/NRadio";

    const {
        baseClass,
        defaultSizeClass,
    } = NRadioTheme;

    export default {
        name: "NRadio",

        install(Vue, theme) {
            selfInstall(Vue, theme, this);
        },

        props: {
            baseClass: {
                type: [String, Object, Array],
                default: baseClass
            },
            defaultSizeClass: {
                type: [String, Object, Array],
                default: defaultSizeClass
            },
        },

        computed: {
            /**
             * The default classes for the radio
             * 单选框的默认类
             * @return {Array}
             */
            currentClass() {
                let classes = [
                    `${this.$options._componentTag}`,
                    this.baseClass
                ];

                return classes
            }
        },
        methods: {
            onBlur(e) {
                this.$emit("blur", e);
            },

            onFocus(e) {
                this.$emit("focus", e);
            },

            onClick(e) {
                this.$emit("click", e);
            },

            blur() {
                this.$el.blur();
            },

            focus() {
                this.$el.focus();
            },
        },

        render: function (createElement) {
            return createElement(
                "label",
                {
                    attr: {
                        role: 'radio',

                    },
                    class: this.currentClass,
                },
                this.$slots.default
            )
        }

    }
</script>