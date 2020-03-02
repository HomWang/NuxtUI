import htmlInputMethods from "./htmlInputMethods.js";
import handleClasses from "./handleClasses.js";
import commonAttributes from "./commonAttributes.js";
import hasMultioptions from "./hasMultioptions.js";
import handleStatus from "./handleStatus.js";
import selfInstall from "~/plugins/utils/selfInstall.js";

export default {
  mixins: [commonAttributes, handleClasses, htmlInputMethods, hasMultioptions, handleStatus],

  install(Vue, theme) {
    selfInstall(Vue, theme, this)
  },

  data() {
    return {
      HomWangName: 'WangHong'
    }
  },
  // components: {
  //   comButton,
  //   modal,
  //   comTable,
  //   comTitle,
  //   pagination
  // },
  // filters: {
  //   dbTypeShowTitle(t) {
  //     const dataBaseTypes = [
  //       '', 'DB2', 'Mysql', 'Oracle'
  //     ]
  //     return dataBaseTypes[t]
  //   }
  // },
  // methods: {
  //   goBack() {
  //     history.back()
  //   },
  //   goPath(name) {
  //     this.$router.push({
  //       name: name
  //     });
  //   },
  //   showMessage(msg, type = 'error') {
  //     this.$notify({
  //       message: msg,
  //       type: type
  //     })
  //   }
  // }
}
