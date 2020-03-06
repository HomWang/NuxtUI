import merge from "lodash/merge";
import DefaultTheme from "./plugins/themes/default.js";

import NButton from "./components/NButton";
import NIcon from "./components/NIcon";
import NGrid from "./components/NGrid";
import NFlex from "./components/NFlex";
import NInput from "./components/NInput"
import NContainer from "./components/NContainer"
import NHeader from "./components/NHeader"
import NAside from "./components/NAside"
import NMain from "./components/NMain"
import NFooter from "./components/NFooter"

const components = {
  NButton,
  NIcon,
  NGrid,
  NFlex,
  NInput,
  NContainer,
  NHeader,
  NAside,
  NMain,
  NFooter
};

/**
 * Will extend the component with the merged classes added in the settings
 * 将使用在设置中添加的合并类扩展组件
 */
function extendComponent(Vue, CurrentTheme, componentName) {
  const themeSettings = CurrentTheme[componentName];
  const themeDefaultSettings = DefaultTheme[componentName];

  const newSettings = merge(themeDefaultSettings, themeSettings);

  let {
    props
  } = components[componentName];

  Object.keys(newSettings).forEach(key => {
    const prop = {
      default: () => newSettings[key]
    };
    props[key] = prop;
  });

  return Vue.extend({
    ...components[componentName],
    ...{
      props
    }
  });
}

export default {
  install(Vue, args = {}) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    const CurrentTheme = {
      ...DefaultTheme,
      ...(args.theme || {})
    };

    const componentsToRegister = args.components || Object.keys(components);

    componentsToRegister.forEach(componentName => {
      Vue.component(
        componentName,
        extendComponent(Vue, CurrentTheme, componentName)
      );
    });
  }
};
