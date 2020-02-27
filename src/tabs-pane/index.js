import NTabsPane from '../tabs/src/tabs-pane';

/* istanbul ignore next */
NTabsPane.install = function (Vue) {
  Vue.component(NTabsPane.name, NTabsPane);
};

export default NTabsPane;