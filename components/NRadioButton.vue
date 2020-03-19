<script>
    import NRadioTheme from "../plugins/themes/default/NRadio";

    const {
        nRadioButton,
        nRadioButtonOriginRadio,
        nRadioButtonInner,
        nRadioLeftButton,
        nRadioRightButton
    } = NRadioTheme;

    export default {
        name: "NRadioButton",

        install(Vue, theme) {
            selfInstall(Vue, theme, this);
        },

        props: {
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
            radioGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options._componentTag !== 'n-radio-group') {
                        parent = parent.$parent;
                    } else {
                        return parent;
                    }
                }
                return false;
            },
            isChecked() {
                return this.radioGroup.value === this.label;
            },
        },

        mounted() {
            this.$nextTick(()=>{
                this.addBorder();
            });
        },

        methods: {
            addBorder() {
                if (!this.$el.previousElementSibling) {
                    let classArray = nRadioLeftButton.split(' ');
                    classArray.forEach((item) => {
                        this.$el.classList.add(item);
                    })
                }
                if (!this.$el.nextElementSibling) {
                    let classArray = nRadioRightButton.split(' ');
                    classArray.forEach((item) => {
                        this.$el.classList.add(item);
                    })
                }
            },
            dispatch(componentTag, eventName, params) {
                let parent = this.$parent || this.$root;
                let name = parent.$options._componentTag;

                while (parent && (!name || name !== componentTag)) {
                    parent = parent.$parent;

                    if (parent) {
                        name = parent.$options._componentTag;
                    }
                }
                if (parent) {
                    parent.$emit.apply(parent, [eventName].concat(params));
                }
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
                        nRadioButton,
                        { 'is-disabled': this.isDisabled },
                        { 'is-bordered': this.border },
                    ],
                },
                [
                    createElement(
                        "input",
                        {
                            attrs: {
                                ref: "radio",
                                value: this.label,
                                type: 'radio',
                            },
                            style : {
                                zIndex : -1
                            },
                            domProps : {
                                checked : this.isChecked,
                            },
                            class: [
                                nRadioButtonOriginRadio,
                                'n_radio_button__orig_radio'
                            ],
                            on: {
                                click: (e)=>{
                                    // radio click默认事件：使修改的状态生效
                                    this.dispatch('n-radio-group', 'input', e.target.value);
                                },
                                change: (e)=>{
                                    this.$nextTick(() => {
                                        this.dispatch('n-radio-group', 'handleChange', e.target.value);
                                    });
                                }
                            }
                        },
                    ),
                    createElement(
                        "span",
                        {
                            class: [
                                nRadioButtonInner,
                                'n_radio_button__inner'],
                        },
                        [this.$slots.default ? this.$slots.default : this.label]
                    )
                ],
            )
        }
    }
</script>