# ⚡ Apollo

- 在Nuxt.js中使用 [vue-apollo](https://github.com/Akryum/vue-apollo)
- 使用方法和 [vue-cli-plugin-apollo](https://github.com/Akryum/vue-cli-plugin-apollo)相同

## 使用

yarn 和 npm 安装:

```js
yarn add @nuxtjs/apollo
＃如果您使用*.gql或*.graphql文件，请先将graphql-tag添加到您的依赖项 
yarn add graphql-tag
OR
npm install --save @nuxtjs/apollo
＃如果您使用*.gql或*.graphql文件，请先将graphql-tag添加到您的依赖项 
npm install --save graphql-tag
```

将 `@nuxtjs/apollo` 添加到 `nuxt.config.js` 中的 `modules` 配置下:

- clientConfigs: `Object` 传递给ApolloClient的配置
  - default: `Object`
  > 备选
  - default: `Path` // 使用这个可以更好地控制选项
  - otherClient: `Object` (可选)

```js
{
  // Add apollo module
  modules: ['@nuxtjs/apollo'],

  // Give apollo module options
  apollo: {
    tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    tokenExpires: 10, // optional, default: 7 (days)
    includeNodeModules: true, // optional, default: false (包括node_modules文件夹中的graphql-tag)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // optional
    errorHandler (error) {
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
    // required
    clientConfigs: {
      default: {
        // required  
        httpEndpoint: 'http://localhost:4000',
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: 'ws://localhost:4000', // optional
        // LocalStorage token
        tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false // Optional
      },
      test: {
        httpEndpoint: 'http://localhost:5000',
        wsEndpoint: 'ws://localhost:5000',
        tokenName: 'apollo-token'
      },
      // 备选：用户配置路径，返回完全相同的配置选项
      test2: '~/plugins/my-alternative-apollo-config.js'
    }
  }
}
```

// plugins/my-alternative-apollo-config.js

```js
export default function(context){
  return {
    httpEndpoint: 'http://localhost:4000/graphql-alt',
    getAuth:() => 'Bearer my-static-token' // 使用此方法覆盖函数
  }
}
```

## 选项

您可以（在简单的设置中）添加一个如上所述的对象。如果需要覆盖缓存或默认的 `getAuth()` 函数，则使用配置文件的路径，该路径返回客户端配置选项。

clientConfigs `Option`:必选

设置apollo客户端，您在[这里](https://github.com/Akryum/vue-cli-plugin-apollo/blob/master/graphql-client/src/index.js#L15)找到所有的可用选项

查看官方 [vue-apollo-cli](https://github.com/Akryum/vue-cli-plugin-apollo)，其中提供了相关用法

clientConfigs.default `Object`: 必选

clientConfigs. `Object|Path`: 可选

tokenName `String`: 可选, default: 'apollo-token'

在身份验证的情况下将设置的cookie的令牌名称。还可以在每个 `clientConfigs` 中提供 `tokenName` 选项以覆盖默认值。当发出每个请求时，这个cookie中任何东西的值都将在以 `authenticationType` 的指定下，在HTTP header的"Authorization"中发送。

authenticationType `String`: 可选, default: 'Bearer'

设置任何授权请求的身份验证类型。如果GraphQL API需要的身份验证类型不是默认值 `Bearer`，则修改它。然后，所有请求在HTTP header的"Authorization："（例如: `Authorization：Bearer abc123`）中发送。

如果您的后端需要"Authorization："格式的Authorization标头，没有任何前缀，那么您应该将此值设置为空字符串。

includeNodeModules `Boolean`：可选，default：false

如果您使用`node_module`文件夹内的`*.gql`文件，您可以启用`graphql-tag/loader`为您解析文件。

## 用法

`vue-apollo` 设置完成后，您的项目已成功启用。查看[官方示例](https://github.com/nuxt/nuxt.js/tree/dev/examples/vue-apollo)和[vue-apollo](https://github.com/Akryum/vue-apollo)如何在应用程序代码中使用vue-apollo

## 认证

您有以下可用的身份验证方法：
```js
//设置您的 graphql-token
this.$apolloHelpers.onLogin(token /* 如果不是默认值，则可以作为第二个参数传入客户端，并且可以在第三个参数上设置自定义 token 过期 */)
//未设置您的 graphql-token
this.$apolloHelpers.onLogout(/* 如果不是默认值，则可以作为第二个参数传入客户端 */)
//获取当前的 token（我们建议从cookie或本地存储中获取token）
this.$apolloHelpers.getToken(/* 如果不是'apollo-token'，则可以提供命名的tokenName。 */)
```

看看[完整的例子](https://github.com/nuxt-community/apollo-module/tree/master/test/fixture)

对于永久授权 token，您可以通过 `getAuth` 函数来进行个性化配置：

```js
apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://graphql.datocms.com',
        getAuth: () => 'Bearer your_token_string'
      },
    }
},
```

user login

```js
methods:{
  async onSubmit () {
    const credentials = this.credentials
    try {
        const res = await this.$apollo.mutate({
            mutation: authenticateUserGql,
            variables: credentials
        }).then(({data}) => data && data.authenticateUser)
        await this.$apolloHelpers.onLogin(res.token)
    } catch (e) {
        console.error(e)
    }
  },
}
```

user logout

```js
methods:{
  async onLogout () {
    await this.$apolloHelpers.onLogout()
  },
}
```

getToken

```js
// middleware/isAuth.js
  export default function ({app, error}) {
    const hasToken = !!app.$apolloHelpers.getToken()
    if (!hasToken) {
        error({errorCode:503, message:'You are not allowed to see this'})
    }
}
```

apolloProvider默认访问客户端的示例

Vuex actions

```js
export default {
  actions: {
    foo (store, payload) {
      let client = this.app.apolloProvider.defaultClient
    }
  }
}
```

asyncData/fetch 该方法只能用于 `page` 和 `component` 

```js
export default {
  asyncData (context) {
    let client = context.app.apolloProvider.defaultClient
  }
}
```

nuxtServerInit

```js
export default {
  nuxtServerInit (store, context) {
    let client = context.app.apolloProvider.defaultClient
  }
}
```

访问客户端或在组件内部调用 `mutate` 和 `query` 方法

```js
export default {
  methods:{
    foo(){
      // receive the associated Apollo client 
      const client = this.$apollo.getClient()

      // most likely you would call mutations like following:
      this.$apollo.mutate({mutation, variables})
      
      // but you could also call queries like this:
      this.$apollo.query({query, variables})
        .then(({ data }) => {
          // do what you want with data
        })
    }
  }
}
```

获得客户端后，您可以访问其方法和属性。请参阅[API参考](https://akryum.github.io/vue-apollo/api/dollar-apollo.html)

组件的智能查询

```js
export  default { 
  apollo: { 
    foo: { 
      query: fooGql,
       variables(){
         return { 
          myVar: this.myVar 
        } 
      } 
    } 
  } 
}
```

有关智能查询的更多信息，请参阅[vue-apollo文档](https://akryum.github.io/vue-apollo/guide/apollo/queries.html)

在node_modules上添加GQL文件识别

```js
apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    },
    includeNodeModules: true
}
```

## 升级

升级指南apollo-module v3 => v4

此模块的第4版将使您保持零配置。这意味着我们使用 `vue-cli-plugin-apollo` 提供的最佳方法，并且使用相同的配置行为。这意味着您不需要连接自己的配置，只需传递即可

按照以下方式编辑配置：

```js
// nuxt.config.js
apollo:{
 clientConfigs:{
  default:{
    httpEndpoint: YOUR_ENDPOINT,
    wsEndpoint: YOUR_WS_ENDPOINT
  }
 }
}
```

## 故障排除

使用*.gql文件

要使用*gql | graphql文件，您需要向项目添加以下依赖项：

```js
yarn add graphql-tag
OR
npm install graphql-tag
```

代理

CORS错误通常通过代理解决。如果您在客户端控制台中看到Cross-Origin-Request错误，请查看设置代理。查看[proxy-module](https://github.com/nuxt-community/proxy-module)，以便快速直接地进行设置。

ctx.req.session - req未定义

这只是一个占位符。您需要将其替换为您选择存储令牌的任何存储机制。这是使用本地存储的[示例](https：//github.com/Akryum/vue-apollo/issues/144)

## 贡献和连线设置

在根文件夹中的.env文件中设置所需的字段

```js
// .env
HTTP_ENDPOINT=https://your-endpoint
WS_ENDPOINT=wss://your-endpoint
```

在index.vue中，登录时要求gql必须启用 `mutation` (该mutation返回有效的token)：

```js
mutation authenticateUser($email:String!,$password:String!){
    authenticateUser(email: $email, password: $password) {
        token
        id
    }
}
```

如果您的gql后端已经准备好，那么开始运行nuxt，如下所示

```js
# npm install
# npm run dev
```
