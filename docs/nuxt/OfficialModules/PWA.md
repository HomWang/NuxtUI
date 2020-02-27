# ⚡ PWA

[![npm](https://img.shields.io/npm/dt/@nuxtjs/pwa.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/pwa)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/pwa/latest.svg?style=flat-square)](https://www.npmjs.com/package/@nuxtjs/pwa)

渐进式Web应用程序（PWA）可靠，快速且引人入胜，尽管有许多事情可以将PWA从基线转变为示例性体验。 ([了解更多](https://developers.google.com/web/progressive-web-apps))

> 使用Nuxt PWA，您可以使用经过严格测试，更新且稳定的PWA解决方案和零配置来增强当前或下一个Nuxt项目！

## 模块

- `Workbox` - 注册一个离线缓存Service worker。
- `Manifest` - 自动生成 `manifest.json` 文件。
- `Meta` - 自动将搜索引擎友好性元数据和清单的整合。
- `Icon` - 自动生成不同大小的应用程序图标。
- `OneSignal` - 使用OneSignal免费后台推送通知。

## 使用

1. yarn 和 npm 安装:

```js
yarn add @nuxtjs/pwa
OR
npm install @nuxtjs/pwa
```

1. 编辑 `nuxt.config.js` 文件并添加pwa模块:

```js
{
    modules: [
        '@nuxtjs/pwa',
    ],
}
```

1.确保 `static` 目录存在并可选择创建 `static/icon.png`。（建议png >= `512x512px`） 

2.创建或添加到：`.gitignore`

```copy
sw.*
```

PWA模块是一系列较小的模块，开箱即用。要禁用每个子模块，可以将选项的名称作为键传递。

例如，禁用图标模块：`false`

```js
modules: [
    ['@nuxtjs/pwa', { icon: false }],
],
```

## 📦 Workbox

Workbox是Progressive Web Apps的JavaScript库集合。([了解更多](https://developers.google.com/web/tools/workbox))。此模块使用工作箱添加完全脱机支持。Workbox模块仅在生产版本上启用。

你可以将 `workbox` 配置在 `nuxt.config.js` 

```js
workbox: {
 // Workbox options
}
```

### 选项

**dev** - 使用 `dev` 来构建 `Workbox` 服务。

**swURL** - 如果是出于其它原因需要注册另外一个服务，可以使用此选项。

**importScripts** (Array) - 要在服务脚本中导入的其他脚本。（可以放在 `/assets/` 目录中）

**offlineAssets** (String) - 要预处理的资产列表，以防您需要预处理的其他额外文件（`_nuxt/*etc`）或者您希望确保您使用`offlinePage`的资产。 (例子: ['/offline.png'])

**offlinePage** (String) - 允许将所有脱机请求路由到指定路径。 (例子: `/offline.html`)

**注意：** 启用脱机页面将禁用 `/.*` 缓存，并将所有脱机请求路由到指定路径。与 `offlineAssets` 中指定的资产一样，仍然对多个资产进行预处理。

**cachingExtensions** (String) - 在 `workbox.precaching.*` 的自动生成调用下面，加载指定文件路径的内容并将其插入Service worker脚本。您可以添加任意数量的额外调用到这个文件中

**routingExtensions** (String) - 在自动生成的对 `workbox.routing.*`的调用下面，加载指定文件路径的内容并将其插入到Service worker脚本中。您可以向该文件添加任意数量的额外调用。

**config** (Object) - 使用 `workbox.setConfig()` 将自定义配置设置为工作箱。例如，设置 `{modulePathPrefix: '/._party/workbox/'}` 以使用本地工作箱文件而不是 google CDN。

有关所有可用选项的列表，请参见 [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build)

### 添加自定义运行时缓存项 (For CDN)

默认情况下，dist `(/_nuxt/)` 中的资源将用CacheFirst缓存，对相同域的其他请求将用NetworkFirst策略缓存。此外，所有JS和CSS webpack发布的资源都将被预处理

如果您有一个定制的CDN，并且需要缓存它的请求，只需要使用 `runtimeCaching`:

nuxt.config.js
```js
workbox: {
      runtimeCaching: [
      {
        // Should be a regex string. Compiles into new RegExp('https://my-cdn.com/.*')
        urlPattern: 'https://my-cdn.com/.*',
        // Defaults to `networkFirst` if omitted
        handler: 'cacheFirst',
        // Defaults to `GET` if omitted
        method: 'GET'
      }
    ]
}
```

#### 添加自定义缓存 [StrategyOption](https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies)
```js
workbox: {
   runtimeCaching: [
     {
       urlPattern: 'https://my-cdn.com/posts/.*',
       strategyOptions: {
         cacheName: 'our-cache',
         cacheExpiration: {
           maxEntries: 10,
           maxAgeSeconds: 300
         }
       }
     }
   ]
}
```

### 添加自定义服务

创建 `static/custom-sw.js` 文件:

```js
console.log('Custom service worker!')
```

添加 `importScripts` 选项到 `nuxt.config.js`:

```js
workbox: {
  importScripts: [
      'custom-sw.js'
  ],
}
```

## 📦 Meta

可以很容易地将通用的Meta标签添加到项目中，并且不需要进行任何配置。

您可以选择使用 `nuxt.config.js` 的 `manifest` 或 `meta` 部分覆盖meta：

```js
{
  meta: {
    // ...
  }
}
```

### 选项

**charset**
- Default: `utf-8`

```js
meta: [
  { charset: 'utf-8' },
],
```

**viewport**
- Default: `width=device-width, initial-scale=1`
- Meta: `viewport`

```js
meta: [
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
],
```
| 属性                    | 例子                                                                               | 描述                                                      |
|------------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `width`                | width=320,width=device-width                                                       | 定义viewport的宽度(单位是像素)。device-width代表适应设备宽度。 |
| `height`               | height=480,height=device-height                                                    | 定义viewport的高度(单位是像素)。device-height代表适应设备高度。|
| `user-scalable`        | user-scalable=yes                                                                  | yes或者no来指定是否允许用户手动缩放 (不建议使用no)             |
| `initial-scale`        | initial-scale=1.0                                                                  | 初始缩放比例                                                |
| `minimum-scale`        | minimum-scale=1.0                                                                  | 允许用户缩放到的最小比例，范围（0.25~10.0）。                  |
| `maximum-scale`        | maximum-scale=1.0                                                                  | 允许用户放大到的最大比例，范围（0.25~10.0）。                  |

**mobileApp**
- Default: `true` （网站开启对 web app 程序的支持）
- Meta: `mobile-web-app-capable`

```js
meta: [
  { name: 'mobile-web-app-capable', content: 'true' },
],
```

**mobileAppIOS**
- Default: `false`
- Meta: `apple-mobile-web-app-capable`

```js
meta: [
  { name: 'apple-mobile-web-app-capable', content: 'false' },
],
```

在使用 `mobileAppIOS` 选项之前，请阅读以下资源：

- [支持的Mate标签](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)
- [问题与解决](https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb)

**appleStatusBarStyle**
- Default: `default`

**favicon**
- Default: `true` (to use options.icons)
- Meta: `shortcut icon` + `apple-touch-icon`

**name**
- Default: *npm_package_name*
- Meta: `title`

**author**
- Default: *npm_package_author_name*
- Meta: `author`

**description**
- Default: *npm_package_description*
- Meta: `description`

**theme_color**
- Default: options.loading.color
- Meta: `theme-color`

**lang**
- Default: `en`
- Meta: `lang`

**ogType**
- Default: `website`
- Meta: `og:type`

```js
meta: [
  { property: 'og:type', content: 'article' },
],
```

**ogSiteName**
- Default: same as options.name
- Meta: `og:site_name`

```js
meta: [
  { property: 'og:site_name', content: 'Site Name' },
],
```

**ogTitle**
- Default: same as options.name
- Meta: `og:title`

```js
meta: [
  { property: 'og:title', content: 'Article Title' },
],
```

**ogDescription**
- Default: same as options.description
- Meta: `og:description`

```js
meta: [
  { property: 'og:description', content: '文章描述' },
],
```

**ogHost**
Specify the domain that the site is hosted. Required for ogImage.
- Default: `undefined`
- Meta: `N/A`

**ogImage**
- Default: `true`
- Meta: `og:image` and sub-tags

```js
meta: [
  { property: 'og:image', content: 'http://opgg-static.akamaized.net/images/logo/2015/reverse.rectangle.png' },
],
```

可以接受这些类型:

- Boolean: the icons from the `icon` module are used.
- String: the path is used.
- Object:
  * `path`: specify the path.
  * `width`, `height`: specify the dimensions, respectively.
  * `type`: specify the MIME type.

**ogUrl**
- Default: ogHost (if defined)
- Meta: `og:url`


**twitterCard**
- Default: `undefined`
- Meta: `twitter:card`

**twitterSite**
- Default: `undefined`
- Meta: `twitter:site`

**twitterCreator**
- Default: `undefined`
- Meta: `twitter:creator`

**nativeUI**
- Default: `false`

通过设置 `meta.nativeUI` 为 `true` (默认值为 `false`) `viewport` 默认值为 `width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui` 并且 `mobileAppIOS` 如果未显式设置为 `false` 它适合于原生的移动应用程序

## 📦 Manifest

Manifest 添加配置详情请参考 [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

您可以将选项传递到 `nuxt.config.js` 中的 `manifest` 部分，以覆盖默认值

```js
manifest: {
  name: 'My Awesome App',
  lang: 'fa'
}
```

## 📦 Icon

该模块使用 [jimp](https://github.com/oliver-moran/jimp) 自动生成不同大小的应用程序图标和favicon，并用 `manifest` 模块使用的生成资产的路径进行填充`manifest.icons[]`。

您可以将选项传递到 `nuxt.config.js` 中的 `icon` 部分以覆盖默认设置。

```js
icon: {
 // Icon options
}
```
### options

**iconSrc**
- Default: `[srcDir]/static/icon.png`

**sizes**
- Default: `[16, 120, 144, 152, 192, 384, 512]`

默认会生成的数组

**accessibleIcons**
- Default: true

通过 `ctx` 或 `Vue` 实例访问图标

实例：`ctx.$icon(512)` 将返回大小为 `512px` 图标的url。当没有给定大小的图标可用时，将返回空字符串（例如，当大小不在 `sizes` 数组中时）。

**iconProperty**
- Default: `$icon`

可访问图标的属性名称。

## 📦 OneSignal

OneSignal 是免费的, 面向网站和移动应用的高容量和可靠的推送通知服务。 由于OneSignal需要注册自己的Service worker，因此设置和使用此模块可以根据自己的业务需求来实施

首先添加依赖项，因为默认情况下在使用PWA模块时没有安装依赖项:

```bash
yarn add @nuxtjs/onesignal # OR npm i @nuxtjs/onesignal
```

将 `@nuxtjs/pwa` 和 `@nuxtjs/onesignal` 添加到 `nuxt.config.js` modules 模块种:

```js
modules: [
  '@nuxtjs/onesignal',
  '@nuxtjs/pwa',
],

// Options
oneSignal: {
  init: {
    appId: 'YOUR_APP_ID',
    allowLocalhostAsSecureOrigin: true,
    welcomeNotification: {
        disable: true
    }
  }
}
```

有关所有 `init` 选项，请参阅下面的参考资料。

### Async Functions
此模块将 `oneSignal` 在调用时为 `$OneSignal`。
请注意，由于异步加载OneSignal SDK脚本时，每个动作都应该被推入到 `$OneSignal` 堆栈中。

```js
// Inside page components
this.$OneSignal.push(() => {
    this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
    if (isEnabled) {
      console.log('Push notifications are enabled!')
    } else {
      console.log('Push notifications are not enabled yet.')
    }
  })
})

// Using window and array form
window.$OneSignal.push(['addListenerForNotificationOpened', (data) => {
  console.log('Received NotificationOpened:', data )}
]);
```

### 更改 OneSignal SDK 脚本的URL

默认情况下，这些模块附带最新的SDK。

可以通过使用 `cdn:true` 或使用 `OneSignalSDK`将其更改为自定义值来使用。

```js
oneSignal: {
  // Use CDN
  cdn: true,

  // Use any custom URL
  OneSignalSDK: 'https://cdn.onesignal.com/sdks/OneSignalSDK.js'
}
```

### 参考

- [Web Push SDK Reference](https://documentation.onesignal.com/docs/web-push-sdk) - 可用选项和API调用
- [Customize Permission Messages](https://documentation.onesignal.com/docs/customize-permission-messages) - 网络推送示例
- [Thanks for Subscribing Notifications](https://documentation.onesignal.com/docs/welcome-notifications) - 设置欢迎通知
- [Product overview](https://documentation.onesignal.com/docs/product-overview) - 更多关于OneSignal的信息
- [Web Push SDK Setup](https://documentation.onesignal.com/docs/web-push-sdk-setup-https) - 设置指南，以便深入阅读这些模块的功能（快速入门）


## 链接

* [Github](https://github.com/nuxt-community/pwa-module)
