<script>
import NTableColumn from "./NTableColumn"; //引入tablecolumn
import defaultClass from "../plugins/themes/default/NTable"; //引入table样式
const NTABLECOLUMN = "NTableColumn"; //tag:vue-component-15-NTableColumn
const TAGNTABLECOLUMN = "n-table-column"; //tag:n-table-column
const TAGP = "p";
const TAGTABLE = "table";
const TAGTHEAD = "thead";
const TAGTBODY = "tbody";
const TAGDIV = "div";
const TAGTR = "tr";
const TAGTD = "td";
const TAGTH = "th";
const EVENTCLICKROW = "click-row";
const EVENTCLICKCOLUMN = "click-column";
const EVENTCLICKHEADER = "click-header";

/**
 *
 */
export default {
  name: "NTable",
  /**
   * 注册
   */
  install(Vue, theme) {
    selfInstall(Vue, theme, this);
  },
  components: { NTableColumn },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }, //数据
    height: {
      type: String,
      default: () => {
        return "200px";
      }
    }, //高度
    maxHeight: {
      type: String,
      default: () => {
        return "200px";
      }
    }, //最高 高度
    headerColor: { type: String, default: defaultClass.headerColor },
    hoverColor: { type: String, default: defaultClass.hoverColor }, //选中颜色
    stripeColor: { type: String, default: defaultClass.stripeColor }, //条纹颜色
    stripe: { type: Boolean, default: false }, //是否条纹
    border: { type: Boolean, default: false }, //是否border
    size: { type: String, default: "medium" }, //medium / small / mini
    fit: { type: Boolean, default: true }, //是否填充
    showHeader: { type: Boolean, default: true } //是否展示header
  },
  computed: {
    /**
     * 获取table样式
     */
    getTableClass() {
      let className = "";
      if (this.fit) {
        className += " " + defaultClass.widthFull;
      }
      if (this.border) {
        className += " " + defaultClass.border2 + " " + defaultClass.border;
      }
      // className += " " + this.getSize;
      className += " " + defaultClass.baseTableClass;

      return className;
    },
    /**
     * 获取 size
     */
    getSize() {
      let result = "";
      switch (this.size) {
        case "medium":
          result = defaultClass.mediumClass;
          break;
        case "small":
          result = defaultClass.smallClass;
          break;
        case "mini":
          result = defaultClass.miniClass;
          break;
      }
      return result;
    },
    /**
     * 获取header样式
     */
    getHeaderClass() {
      let className = "";
      if (this.border) {
        className += " " + defaultClass.border;
      }
      className += " " + this.getSize;
      className += " " + this.headerColor;
      className += " " + defaultClass.baseHeaderClass;
      return className;
    },
    /**
     * 获取body样式
     */
    getBodyTdClass() {
      let className = "";
      if (this.border) {
        className += " " + defaultClass.border;
      }
      className += " " + this.getSize;
      className += " " + defaultClass.baseBodyClass;
      return className;
    },
    /**
     * 获取footer样式
     */
    getFooterClass() {
      return defaultClass.mediumClass;
    }
  },
  methods: {
    /**
     * row 点击
     */
    onClickRow(row) {
      this.$emit(EVENTCLICKROW, row);
    },
    /**
     * td 点击
     */
    onClickColumn(e) {
      this.$emit(EVENTCLICKCOLUMN, e);
    },
    /**
     * header 点击
     */
    onClickHeader(e) {
      let data = this.getColumnData(e.componentOptions.propsData.prop);
      this.$emit(EVENTCLICKHEADER, e, data);
    },
    /**
     * 获取body样式
     */
    getBodyTrClass(i) {
      let className = "";
      if (this.stripe && i % 2) {
        className += " " + this.stripeColor;
      }
      return className;
    },
    /**
     * 创建头部
     */
    createHead(createElement) {
      let NTableColumnList = this.getNTableColumn();
      let renderThList = [];
      NTableColumnList.map(item => {
        let lable = this.getHeaderLable(item); //获取 template slot label
        renderThList.push(
          createElement(
            TAGTH,
            {
              attrs: { class: this.getHeaderClass },
              on: {
                click: () => {
                  this.onClickHeader(item);
                }
              }
            },
            lable ? lable.children : item.componentOptions.propsData.lable
          )
        );
      });
      return createElement(TAGTHEAD, [createElement(TAGTR, [renderThList])]);
    },
    /**
     * 获取头部自定义lable
     */
    getHeaderLable(item) {
      let i = 0;
      let result = null;
      if (!item.componentOptions.children) {
        return result;
      }
      while (i < item.componentOptions.children.length) {
        if (item.componentOptions.children[i]) {
          result = item.componentOptions.children[i];
          break;
        }
      }
      return result;
    },
    /**
     * 创建body
     */
    createBody(createElement) {
      let NTableColumnList = this.getNTableColumn();
      let i = 0;
      let renderTrList = [];
      while (i < this.data.length) {
        let row = this.getRowData(this.data[i]);
        renderTrList.push(
          createElement(
            TAGTR,
            {
              attrs: {
                class: this.getBodyTrClass(i)
              },
              on: {
                click: () => {
                  this.onClickRow(row);
                },
                mouseenter: e => {
                  e.target.classList.add(this.hoverColor);
                },
                mouseleave: e => {
                  e.target.classList.remove(this.hoverColor);
                }
              }
            },
            [
              NTableColumnList.map(item => {
                let data = item.data;
                data.attrs = Object.assign(
                  data.attrs,
                  row,
                  item.componentOptions.propsData
                );
                return createElement(
                  TAGTD,
                  {
                    attrs: {
                      class: this.getBodyTdClass
                    },
                    on: {
                      click: () => {
                        this.onClickColumn(row);
                      }
                    }
                  },
                  [createElement(TAGNTABLECOLUMN, data)]
                );
              })
            ]
          )
        );
        i++;
      }
      return createElement(TAGTBODY, [renderTrList]);
    },
    /**
     * 创建Footer
     */
    createFooter(createElement) {
      if (this.$slots.footer) {
        return createElement(
          TAGP,
          { attrs: { class: this.getFooterClass } },
          this.$slots.footer
        );
      } else {
        return "";
      }
    },
    /**
     * 创建列表
     */
    createTable(createElement) {
      return createElement(
        TAGTABLE,
        {
          attrs: {
            class: this.getTableClass
          }
        },
        [
          this.showHeader ? this.createHead(createElement) : "",
          this.createBody(createElement)
        ]
      );
    },
    /**
     * 封装
     */
    getRowData(row) {
      return { row: row };
    },
    /**
     * 获取有效column
     */
    getNTableColumn() {
      return this.$slots.default.filter(item => {
        if (item.tag ? item.tag.indexOf(NTABLECOLUMN) : false) {
          return item;
        }
      });
    },
    /**
     * 获取列数据
     */
    getColumnData(prop) {
      let result = [];
      this.data.map(item => {
        result.push(item[prop]);
      });
      return result;
    }
  },
  watch: {},
  render: function(createElement) {
    return createElement(TAGDIV, [
      this.createTable(createElement),
      this.createFooter(createElement)
    ]);
  }
};
</script>
