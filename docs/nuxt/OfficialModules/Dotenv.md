# 📦 Dotenv

## 介绍

该模块用于环境变量配置，用于将.env文件加载到上下文中使用。

## 特性

直接从您的.env文件的模块加载变量到您的nuxt.js应用程序`context`和`process.env`

## 使用

yarn 和 npm 安装:

```js
yarn add @nuxtjs/dotenv
OR
npm install @nuxtjs/dotenv
```

nuxt.config.js

```js
{
  modules: [
    // Simple usage
    '@nuxtjs/dotenv',

    // With options
    ['@nuxtjs/dotenv', { /* module options */ }],
 ]
}
```

## 用法

在项目根目录中创建.env文件后，只需运行您的常用文件`npm run dev`。.env文件中的变量将被添加到context（context.env）和process（process.env）中

`.env` 配置文件，示例:

```js
// 运行环境名称
APP_ENV=local
// 调试模式，开发阶段启用，上线状态禁用。
APP_DEBUG=true
// 敏感信息加密密钥。
APP_KEY=
// 项目根目录
APP_URL=http://localhost

// 缓存驱动，默认使用文件作为缓存。
CACHE_DRIVER=file
// 回话驱动，默认使用文件存储SESSION。
SESSION_DRIVER=file
// 队列驱动，默认使用同步模式。
QUEUE_DRIVER=sync

// Redis高性能key-value数据库，使用内存存储，用于数据持久化。
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

// 数据库配置项
DB_HOST=127.0.0.1//数据库主机名
DB_PORT=3306//数据库端口
DB_DATABASE=homestead//数据库名称
DB_USERNAME=homestead//数据库登录账户
DB_PASSWORD=secret//数据库登录密码
```

以上仅作为一些复杂的配置示例，您可以根据自己的业务需求来定。（个人认为最好前后分离）

## 选项

### only

如果希望限制上下文中可访问的内容，可以将`only`带有要允许键的数组传递给模块选项

```js
{
  modules: [
    ['@nuxtjs/dotenv', { only: ['some_key'] }],
  ]
}
```

### path

默认情况下，我们将从项目根目录加载`.env`文件。如果要更改我们可以找到.env文件的文件夹的路径，请使用该`path`选项。

```js
{ 
  modules ： [ 
    [ '@nuxtjs/dotenv'，{path ： '/path/to/my/global/env/' }]，
  ] 
}
```

请注意，这是`.env`文件所在文件夹的路径，而不是`.env`文件本身的路径（路径可以是绝对的或相对的）。

### systemvars

默认情况下为false，系统中的变量将被忽略。设置为true将允许您的系统设置变量起作用。

```js
{ 
  modules ： [ 
    [ '@nuxtjs/dotenv'，{systemvars ： true }]，
  ] 
}
```

### filename

当我们需要为不同的环境使用不同的配置文件时，我们可以覆盖文件名。

```js
{
  modules: [
    ['@nuxtjs/dotenv', { filename: '.env.prod' }],
  ]
}
```

### 在nuxt.config.js中使用.env文件

`dotenv-module`不会重载运行构建流程的环境变量。

如果此时需要使用.env文件中的变量，只需将`require('dotenv').config()`添加到`nuxt.config.js`：

```js
require('dotenv').config()

module.exports = {
    // your usual nuxt config.
}
```
由于该模块提供的`dotenv`库是依赖项，因此可以正常工作。如果决定在模块配置中忽略.env文件中的一些值，这里就不适用。

## 链接

[github](https://github.com/nuxt-community/dotenv-module)
