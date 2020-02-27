import NCol from './src/col';

/* istanbul ignore next */
NCol.install = function (Vue) {
  Vue.component(NCol.name, NCol);
};

export default NCol;