import NNavItem from '../nav/src/nav-item';

/* istanbul ignore next */
NNavItem.install = function (Vue) {
  Vue.component(NNavItem.name, NNavItem);
};

export default NNavItem;