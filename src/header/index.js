import NHeader from '../layout/src/header';

/* istanbul ignore next */
NHeader.install = function (Vue) {
  Vue.component(NHeader.name, NHeader);
};

export default NHeader;