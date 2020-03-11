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
            isDisabled: {
                type: Boolean,
                default : false
            },
            border: {
                type: Boolean,
                default : false
            },
            label: {
                type: [String, Number, Boolean]
            },
            value: {
                type: [String, Number, Boolean]
            }
        },

        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(val) {
                    // 改变 this.value的值
                    console.log(val);
                    this.$emit('input', val);
                }
            },
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
                    attrs: {
                        role: 'radio',
                    },
                    class: [
                        { 'is-disabled': this.isDisabled },
                        { 'is-bordered': this.border },
                    ],
                },
                [createElement(
                    "span",
                    {
                        class: [
                            'n-radio__input',
                        ],
                    },
                    [createElement(
                        "span",
                        {
                            class: [
                                'n-radio__inner',
                            ],
                        },

                    ),
                    createElement(
                        "input",
                        {
                            attrs: {
                                ref: "radio",
                                value: this.label,
                                type: 'radio',
                                checked : this.model === this.label,
                            },
                            class: [
                                'n-radio__original',
                            ],
                            on: {
                                input: (e)=>{
                                    this.model = e.target.value;
                                    console.log(e.target.value);
                                    console.log(this.model);
                                },
                            },
                        },

                    )]
                ),
                createElement(
                    "span",
                    {
                        class: [
                            'n-radio__label',
                        ],
                    },
                    [this.$slots.default ? this.$slots.default : this.label]
                )],
            )
        }

    }
</script>