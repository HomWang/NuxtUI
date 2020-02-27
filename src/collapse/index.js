import NCollapse from './src/collapse';

/* istanbul ignore next */
NCollapse.install = function(Vue) {
  Vue.component(NCollapse.name, NCollapse);
};

export default NCollapse;
