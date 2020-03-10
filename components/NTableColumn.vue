<!-->
    table 列表
<!-->
<script>
export default {
  name: "NTableColumn",
  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },
  props: {
    lable: { type: String, default: "" },
    prop: { type: String, default: "" },
    row: {
      type: [Object, Array],
      default: () => {
        return [];
      }
    }
  },
  computed: {},
  methods: {},
  watch: {},
  render: function(createElement) {
    return createElement(
      "span",
      this.$vnode.data.scopedSlots
        ? this.$vnode.data.scopedSlots.default({ row: this.row })
        : this.row[this.prop]
    );
  }
};
</script>
