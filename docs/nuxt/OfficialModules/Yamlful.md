# 📦 Yamlful

## 介绍

在Nuxt.js项目中解耦您的API调用

> 基于YAML的HTTP/HTTPS客户端代码生成模块

## 示例

yamlful是一个用于从YAML 生成HTTP客户端代码的实用程序：

```yaml
sample:
  - method: get
    get: /resource/:id/subresource/:subId
  - method: create
    post: /resource/:id/subresource
  - method: update
    put: /resource/:id/subresource/:subId
  - method: remove
    delete: myresource/
```

它使用简单模式来确定函数参数和HTTP参数，因此，使用`PUT`或`POST`的方法会获得 `payload` ，而其他方法则不会，同时保留每个YAML定义属性中的URL参数。

上面的YAML文件可用于生成如下代码：

```js
const sample = {
  get: (id, subId, params = {}) => {
    return client.get(`/resource/${id}/subresource/${subId}`, { params })
  },
  create: (id, payload, params = {}) {
    return client.post(`/resource/${id}/subresource`, payload, { params })
  },
  update: (id, subId, payload, params = {}) {
    return client.put(`/resource/${id}/subresource/${subId}`, payload, { params })
  },
  remove: (id, params = {}) => {
    return client.delete(`myresource/${id}`, { params })
  }
}
```

## 动机

用于公开HTTP API客户端方法的 `JavaScript` 在大多数情况下非常简单。

但是，当您拥有包含许多不同资源庞大的API时，更简化的YAML配置可以在处理不断变化时更轻松地进行维护。通过在将JavaScrit方法连接到JSON HTTP API时识别这些关键的简单模式，yamlful诞生了。

## 使用

捆绑在此存储库中的[Nuxt.js](https://nuxtjs.org/)模块(`yamlful-nuxt`)，用`yamlful`生成类似的代码，将自身集成到[@nuxtjs/axios](/nuxt/OfficialModules/Axios.html)并将API方法暴露给Vue页面。

yarn 和 npm 安装:

```js
yarn add yamlful-nuxt --save
OR
npm install yamlful-nuxt --save
```

nuxt.config.js

```js
export  default {
    //感谢Pooya Parsa提供了Nuxt Axios模块
    //注意yamlin 自动引用了@nuxtjs/axios
    axios: {
        //感谢Ben Howdle提供的API测试服务 
        baseURL: 'https://reqres.in/'
    },
    //默认情况下，yamlful将在Nuxt的srcDir
    modules: ['yamlful-nuxt'],
    //也可以自定义目录来区分你的yml，这样能够让你快速的找到该yml文件
    modules: [['yamlful-nuxt', { srcDir: './resources' }]]
}
```

注意: 如果你使用了`yamlful-nuxt`模块，那么你就不需要再次引用`nuxt-axios`模块了，因为作者已经将它引用了，你无需再次引用（因为你再次引用的时候会出错）

pages/index.vue

```js
export default {
  async asyncData ({ $api }) {
    // $api available in SSR context
    const response = await $api.users.get(1)
    return {
      user: response.data
    }
  },
  data: () => ({
    user: {}
  }),
  methods: {
    async loadTwo() {
      // this.$api available in the client context
      const response = await this.$api.users.get(2)
      this.user = response.data
    }
  }
}
```

### 原始方法

Nuxt.js模块还允许您在YAML中内联JavaScript以定义原始方法:

输入：

```yaml
- method: custom
    raw: |
      (customParam) => {
      	client.get(`/customresource/${customParam}`)
      }
```

输出：

```js
custom: (customParam) => {
    client.get(`/customresource/${customParam}`)
}
```

注意，`client`它用于注入Nuxt的axios实例。

请参阅用于Nuxt模块的[API模板](https://github.com/galvez/yamlful/blob/master/packages/yamlful-nuxt/templates/api.js)。

## 其他框架

可以使用`yamlful`包的并导出函数来实现其他框架的模块和扩展，[示例](https://github.com/galvez/yamlful/blob/master/packages/yamlful-nuxt/index.js)。

## Demo

官方Demo [源码](https://github.com/galvez/yamlful/tree/master/nuxt-example)

实例Demo:

api.yml

```yaml
users:
  - method: getHelpCenterByIdPost
    post: /api/v1/bitbuy/otc/newbieHelp/listByLanguage
```

nuxt.config.js

```js
export default {
  axios: {
    baseURL: 'http://192.168.9.232/'
  },
  modules: ['yamlful-nuxt']
}
```

index.vue

```js
import qs from 'qs'
export default {
  async asyncData ({ $api }) {
    let obj = {
      pageNum: 1,
      pageSize: 10
    }
    obj = qs.stringify(obj)
    const response = await $api.users.getHelpCenterByIdPost(obj)
    return {
      user: response.data
    }
  },
  data: () => ({
    user: {}
  }),
  methods: {
    async loadTwo() {
      let obj = {
        pageNum: 1,
        pageSize: 10
      }
      obj = qs.stringify(obj)
      const response = await this.$api.users.getHelpCenterByIdPost(obj)
      this.user = response.data
    }
  }
}
```

## 链接

[github](https://github.com/galvez/yamlful)
