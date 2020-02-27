import NTabs from './src/tabs';

/* istanbul ignore next */
NTabs.install = function (Vue) {
  Vue.component(NTabs.name, NTabs);
};

export default NTabs;