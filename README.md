# Nuxt-UI

**NuxtUI**是一个由 [TailwindCss CSS](https://tailwindcss.com/docs/installation)开发的`Vue`组件，宗旨是根据您的应用程序的独特设计进行定制。

因为使用的是`TailwindCss CSS`，所以默认情况下使用的是它的类名，并且所有类名都是可配置的，从而使您可以完全自定义组件的外观。

完全可以通过只需要配置一次就可以设置主题类了。

如有建议的地方还请大家反应出来，我希望通过 QQ 群: <a target="_blank" href="//shang.qq.com/wpa/qunwpaidkey=29f4417f6627cb73eb304b3833698cfe28ea196858df935010a186ba84db2288"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="Vue/Nuxt.js" title="Vue/Nuxt.js"></a> 或 [Discordapp](https://discordapp.com/channels/473401852243869706/473511822893383691) 一起交流讨论

## 安装和使用

### 1.安装依赖项

```js
npm install nuxt-ui --save
```

或

```js
yarn add nuxt-ui
```

::: tip
如果您使用的是默认主题，您需要先安装[TailwindCSS](https://tailwindcss.com/docs/installation)

或直接下载`nuxt.js` 官方`@nuxtjs/tailwindcss`套件

```js
yarn add @nuxtjs/tailwindcss
```

:::

### 使用

#### 基础配置

::: tip
这里以 nuxt.js 中的使用例子
:::

步骤一：在`plugins`目录中创建`nuxt-ui.js`

```js
import Vue from "vue";
import NuxtUI from "nuxt-ui";
Vue.use(NuxtUI);
```

步骤二：`nuxt.config.js`配置

```js
{
  buildModules: ["@nuxtjs/tailwindcss"],
  plugins: [
    {
      src: "~plugins/nuxt-ui",
      ssr: false
    }
  ],
}
```

#### 自定义主题

::: tip
在这里您只需要设置覆盖的类即可:
[`plugins/themes/default.js`](https://github.com/516310460/NuxtUI/tree/master/plugins/themes/default.js)
:::

在`plugins`中添加您需要覆盖的主题文件，`plugins/themes/newButton.js`

```js
const NButton = {
  // baseClass: 'border block rounded inline-flex items-center justify-center',
  baseClass: "rounded-lg border block inline-flex items-center justify-center",
  // primaryClass: 'text-white bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600',
  primaryClass:
    "text-white bg-purple-500 border-purple-500 hover:bg-purple-600 hover:border-purple-600"
};

const NewTheme = {
  NButton
};

export default NewTheme;
```

## 贡献

您喜欢这个项目吗？欢迎任何帮助。（我不是讲英语的人，因此也欢迎对我的评论有任何评论）。
在提出拉动请求之前，请确保已阅读贡献指南...
由于项目创建之初，还未制定好如何贡献指南，指南制定中....

## 贡献者

- [Hom Wang](https://github.com/516310460)
- [所有贡献者](https://github.com/516310460/NuxtUI/graphs/contributors)

## LICENSE

[MIT](LICENSE)
