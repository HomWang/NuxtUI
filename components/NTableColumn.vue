<!-->
    table 列表
<!-->
<script>
    export default {
        name:'NTableColumn',
        install (Vue, theme) {
            selfInstall(Vue, theme, this);
        },
        props:{
        },
        computed:{
        },
        methods:{
        },
        watch:{},
        render:function(createElement){
                return createElement(
                    'span',this.$slots.default
                )
        }
    }
</script>