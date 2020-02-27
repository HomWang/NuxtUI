import NTabsItem from '../tabs/src/tabs-item';

/* istanbul ignore next */
NTabsItem.install = function (Vue) {
  Vue.component(NTabsItem.name, NTabsItem);
};

export default NTabsItem;