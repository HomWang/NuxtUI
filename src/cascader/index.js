import NCascader from './src/cascader';

/* istanbul ignore next */
NCascader.install = function(Vue) {
  Vue.component(NCascader.name, NCascader);
};

export default NCascader;
