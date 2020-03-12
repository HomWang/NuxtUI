<script>
    import NRadioTheme from "../plugins/themes/default/NRadio";

    const {
        n_radio_group
    } = NRadioTheme;

    export default {
        name: "NRadioGroup",

        install(Vue, theme) {
            selfInstall(Vue, theme, this);
        },

        props: {
            value: {
                type: [String, Number, Boolean]
            }
        },

        created() {
            this.$on('handleChange', value => {
                this.$emit('change', value);
            });
        },

        methods: {

        },

        render: function (createElement) {
            return createElement(
                "div",
                {
                    attrs: {
                        role: 'radioGroup',
                    },
                    style : {
                        fontSize : 0
                    },
                    class: [n_radio_group],
                },
                [this.$slots.default],
            )
        }

    }
</script>