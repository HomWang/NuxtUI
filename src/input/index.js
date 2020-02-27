import NInput from './src/input';

/* istanbul ignore next */
NInput.install = function (Vue) {
  Vue.component(NInput.name, NInput);
};

export default NInput;