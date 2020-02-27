import NContent from '../layout/src/content';

/* istanbul ignore next */
NContent.install = function (Vue) {
  Vue.component(NContent.name, NContent);
};

export default NContent;