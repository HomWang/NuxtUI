import NNav from './src/nav';

/* istanbul ignore next */
NNav.install = function (Vue) {
  Vue.component(NNav.name, NNav);
};

export default NNav;