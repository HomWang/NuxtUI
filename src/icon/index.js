import NIcon from './src/icon';

/* istanbul ignore next */
NIcon.install = function (Vue) {
  Vue.component(NIcon.name, NIcon);
};

export default NIcon;