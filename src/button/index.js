import NButton from './src/button';

/* istanbul ignore next */
NButton.install = function(Vue) {
  Vue.component(NButton.name, NButton);
};

export default NButton;
