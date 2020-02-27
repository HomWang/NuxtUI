import NCascaderItems from '../cascader/src/cascader-items';

/* istanbul ignore next */
NCascaderItems.install = function(Vue) {
  Vue.component(NCascaderItems.name, NCascaderItems);
};

export default NCascaderItems;
