import NSlides from './src/slides';

/* istanbul ignore next */
NSlides.install = function (Vue) {
  Vue.component(NSlides.name, NSlides);
};

export default NSlides;