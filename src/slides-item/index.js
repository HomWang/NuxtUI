import NSlidesItem from '../slides/src/slides-item';

/* istanbul ignore next */
NSlidesItem.install = function (Vue) {
  Vue.component(NSlidesItem.name, NSlidesItem);
};

export default NSlidesItem;