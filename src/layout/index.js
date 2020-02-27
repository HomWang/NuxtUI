import NLayout from './src/layout';

/* istanbul ignore next */
NLayout.install = function (Vue) {
  Vue.component(NLayout.name, NLayout);
};

export default NLayout;