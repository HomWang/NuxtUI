import Vue from "vue";

import Button from "./button/index.js";
import ButtonGroup from "./button-group/index.js";
import Cascader from "./cascader/index.js";
import CascaderItems from "./cascader-items/index.js";
import CollapseItem from "./collapse-item/index.js";
import Collapse from "./collapse/index.js";
import Col from "./col/index.js";
import Row from "./row/index.js";
import Content from "./content/index.js";
import Footer from "./footer/index.js";
import Header from "./header/index.js";
import Layout from "./layout/index.js";
import Sider from "./sider/index.js";
import Nav from "./nav/index.js";
import NavItem from "./nav-item/index.js";
import SubNav from "./sub-nav/index.js";
import SlidesItem from "./slides-item/index.js";
import Slides from "./slides/index.js";
import Tabs from "./tabs/index.js";
import TabsBody from "./tabs-body/index.js";
import TabsHead from "./tabs-head/index.js";
import TabsItem from "./tabs-item/index.js";
import TabsPane from "./tabs-pane/index.js";
// import Icon from "./icon/index.js";
import Input from "./input/index.js";
// import ClickOutside from './click-outside'
// import FormMixin from './form-mixin'
// import Validate from './validate'

const components = [
  Button,
  ButtonGroup,
  Cascader,
  CascaderItems,
  CollapseItem,
  Collapse,
  Col,
  Row,
  Content,
  Footer,
  Header,
  Layout,
  Sider,
  Nav,
  NavItem,
  SubNav,
  SlidesItem,
  Slides,
  Tabs,
  TabsBody,
  TabsHead,
  TabsItem,
  TabsPane,
  // Icon,
  Input
];

// 循环注册组建
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

install(Vue);

export default {
  version: "0.0.1",
  install,
  Button,
  ButtonGroup,
  Cascader,
  CascaderItems,
  CollapseItem,
  Collapse,
  Col,
  Row,
  Content,
  Footer,
  Header,
  Layout,
  Sider,
  Nav,
  NavItem,
  SubNav,
  SlidesItem,
  Slides,
  Tabs,
  TabsBody,
  TabsHead,
  TabsItem,
  TabsPane,
  // Icon,
  Input
};