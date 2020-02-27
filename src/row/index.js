import NRow from './src/row';

/* istanbul ignore next */
NRow.install = function (Vue) {
  Vue.component(NRow.name, NRow);
};

export default NRow;