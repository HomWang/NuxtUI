<script>
    import NRadioTheme from "../plugins/themes/default/NRadio";

    const {
        n_radio,
        n_radio__input,
        n_radio__inner,
        n_radio__original,
        n_radio__label
    } = NRadioTheme;

    export default {
        name: "NRadio",

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
            isGroup() {
                let parent = this.$parent;
                while (parent) {
                    if (parent.$options._componentTag !== 'n-radio-group') {
                        parent = parent.$parent;
                    } else {
                        this._radioGroup = parent;
                        return true;
                    }
                }
                return false;
            },
        },

        methods: {
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
                        n_radio,
                        { 'is-disabled': this.isDisabled },
                        { 'is-bordered': this.border },
                    ],
                },
                [createElement(
                    "span",
                    {
                        class: [
                            'n_radio__input',
                            n_radio__input,
                            {'is-checked': (this.isGroup ? this._radioGroup.value : this.value) === this.label},
                        ],
                    },
                    [createElement(
                        "span",
                        {
                            class: [n_radio__inner,'n_radio__inner'],
                        },
                    ),
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
                                checked : (this.isGroup ? this._radioGroup.value : this.value) === this.label,
                            },
                            class: [n_radio__original],
                            on: {
                                click: (e)=>{
                                    // radio click默认事件：使修改的状态生效
                                    if (this.isGroup) {
                                        this.dispatch('n-radio-group', 'input', [e.target.value]);
                                    } else {
                                        this.$emit('input',e.target.value);
                                    }
                                },
                                change: (e)=>{
                                    this.$nextTick(() => {
                                        this.$emit('change', e.target.value);
                                        this.isGroup && this.dispatch('n-radio-group', 'input', [e.target.value]);
                                    });
                                }
                            },
                        },

                    )]
                ),
                createElement(
                    "span",
                    {
                        class: [n_radio__label,'n_radio__label'],
                    },
                    [this.$slots.default ? this.$slots.default : this.label]
                )],
            )
        }

    }
</script>