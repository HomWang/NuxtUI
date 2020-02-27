import NSubNav from '../nav/src/sub-nav';

/* istanbul ignore next */
NSubNav.install = function (Vue) {
  Vue.component(NSubNav.name, NSubNav);
};

export default NSubNav;