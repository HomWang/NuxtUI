# 案例研究一(响应处理)

看到过这个案例，我觉得非常的不错，在很多时候可能我们对代码的处理不太干净、复用、报错这些，在实际开发中或多或少都有一些瑕疵特此分享该[案例](https://blog.lichter.io/posts/refactoring-code-a-case-study-1-response-han)。

## 初始化代码

代码如下:

```js
const evaluateResponseOld = response => {
  let text = ''
  if (response.valid) {
    if (response.type === 'Confirmation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'You have been unsubscribed successfully'
      }
    }
  } else {
    text = 'The provided code is invalid'
  }
  return text
}
```

## 初始代码的问题

### `可读性低`

因此，正如您可能已经认识到的那样，代码不必要地复杂，因此具有很高的可读性。你总是要记住满足了哪个条件。此外，text变量是可变的，因此您还必须考虑其状态。在这种情况下，它只会设置一次，但想象一下更复杂的功能。

### `难以维持`

现在想象一下，必须处理一个额外的状态，因为API现在会响应另一个场景（例如Cancellation，Confirmation和Pending）。添加状态需要一些时间，而且你必须复制大量代码（参见response.used当前代码）。这导致我......

### `代码重复`

代码重复本身优于错误的抽象，但在这种情况下代码不必要地重复，因此更容易出错。想想你必须改变used到invalid现在。如果您错过了一个if语句，代码将无效。幸运的是，你的测试会告诉你（如果你有这样的......）。

## 迭代

那么......我们怎么能做得更好？我们将研究一些用于在清晰可读的代码段中转换此代码的技术。它只需要六次小迭代！

### 第一次迭代 - 删除临时变量

#### 动机

那么，我们为什么要从代码中删除临时变量（尽可能）？嗯，首先，它增加了可读性。当几乎所有变量都是不可变的（或者不存在变量）时，您不必考虑它们的状态！在我们的场景中，我们甚至可以完全省略text变量，因为函数将始终返回文本，并且不包括任何副作用。

代码如下:

```js
const stepOne = response => {
  if (response.valid) {
    if (response.type === 'Confirmation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'You have been unsubscribed successfully'
      }
    }
  } else {
    return 'The provided code is invalid'
  }
}
```

### 第二次迭代 - 反转保护if语句

#### 动机

保护if，因为名称可能暗示if更大的子块周围的条件。它们使用它们的条件来保护代码，这样它只会在if求值为true 时执行。一般来说没有坏事，但嵌套防护会导致可读性低和不必要的复杂性。相反，我们可以反转条件并插入早期返回。

代码如下:

```js
const stepOne = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  } else {
    if (response.type === 'Confirmation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        return 'This token has already been used'
      } else {
        return 'You have been unsubscribed successfully'
      }
    }
  }
}
```

### 第三次迭代 - 删除其他

#### 动机

好吧，这可能有点争议，但我通常认为else是代码可读性低。如果您使用早期返回并在每个嵌套块中返回，它们将不会给您任何值。但是，有些情况下else完全没问题。

通常我也会把它们进行拆分开提高可读性，但是为了让下一个迭代更加明显，我们将保持它们以表明条件是相互关联的。

代码如下:

```js
const stepThree = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.type === 'Confirmation') {
    if (response.used) {
      return 'This token has already been used'
    }
    return 'Thanks for your subscription'
  } else if (response.type === 'Cancellation') {
    if (response.used) {
      return 'This token has already been used'
    }
    return 'You have been unsubscribed successfully'
  }
}
```

### 第四次迭代 - 处理逻辑中的重复

#### 动机

现在我们应该关注"代码沉余"。由于代码更具可读性，我们可以查看并在代码分支中找到可能的重复项。

如果我们查看我们的转换代码，我们现在可以清楚地看到`response.used`条件独立于`response.type`。这意味着我们可以提取这个部分并向上移动一个范围，这使得条件成为另一个反向保护if。

代码如下:

```js
const stepFour = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (response.type === 'Confirmation') {
    return 'Thanks for your subscription'
  } else if (response.type === 'Cancellation') {
    return 'You have been unsubscribed successfully'
  }
}
```

### 第五次迭代 - 查找表

#### 动机

一个标准是我们应该能够轻松添加新的响应状态。为此，我们应该尽量减少我们需要的代码。目前，我们必须添加另一个if，另一个比较和一个return语句。似乎没那么多，但再次考虑更复杂的功能。

为了减少添加type（f.ex. Pending）和应该返回的文本时的更改，我们将控制流从if-else-if结构转换为查找表。如果您在条件中一次又一次地使用相同的比较方法（在我们的例子中为三等），这种方法很有效。

我们将创建一个lookup对象并用响应类型填充它，这些响应类型将作为键，并将相应的文本作为值填充，以便我们可以根据响应类型动态访问文本。要添加新类型/状态，我们只需要添加真正改变的内容：新类型和相关文本。

代码如下:

```js
const stepFive = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  const responseLookup = {
    Confirmation: 'Thanks for your subscription',
    Cancellation: 'You have been unsubscribed successfully'
  }

  if (responseLookup.hasOwnProperty(response.type)) {
    return responseLookup[response.type]
  }
}
```

您还可以使用Map来提高查找速度

```js
const stepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  const responseMap = new Map([
    ['Confirmation','Thanks for your subscription'],
    ['Cancellation','You have been unsubscribed successfully']
  ])

  if (responseMap.has(response.type)) {
    return responseMap.get(response.type)
  }
}
```

只要查找对象不通过该函数进行更改，将查找对象置于外部也是可行的。这使得你的函数不纯，因为它将依赖于外部对象而不仅仅取决于它的输入。

要解决这个问题，您可以同时使用两个参数（response和lookupObject），或者创建一个更高阶的函数，取lookupMap第一个，这将使您的函数可以轻松重用。一个高阶函数是再次返回功能的功能。实现看起来像这样：

```js
const responseMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const higherOrderStepFiveWithMap = lookupMap => response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }
}

const stepFiveWithMap = higherOrderStepFiveWithMap(responseMap)

// Now use stepFiveWithMap(yourResponseObject)
```

虽然我更喜欢这个版本，因为它具有可重用性，纯度和低耦合性，让我们坚持使用简单而不纯的Map版本：

```js
const lookupMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const simpleAndImpureStepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }
}
```

### 第六次迭代 - 无效状态

#### 动机

好的！代码看起来可读，没有重复，易于维护。但有一点缺失：处理无效状态。即使你认为这种情况永远不会发生，如果发生错误也不会造成错误。在最好的情况下，您的监控/报告工具会将其提取并告诉您。为无效状态编写测试也是值得的，特别是在用户输入方面！

```js
const lookupMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const simpleAndImpureStepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }

  throw new Error('Invalid state while evaluating response')

  /*
    we could also 'shorten' that a little with short-circuit:

    const invalid = () => { throw new Error('Invalid state while evaluating response') }

    return lookupMap.get(response.type) || invalid()
  */
}
```

## 结论

初始代码:

```js
const evaluateResponseOld = response => {
  let text = ''
  if (response.valid) {
    if (response.type === 'Confirmation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'Thanks for your subscription'
      }
    } else if (response.type === 'Cancellation') {
      if (response.used) {
        text = 'This token has already been used'
      } else {
        text = 'You have been unsubscribed successfully'
      }
    }
  } else {
    text = 'The provided code is invalid'
  }
  return text
}
```

代码重构:

```js
const lookupMap = new Map([
  ['Confirmation', 'Thanks for your subscription'],
  ['Cancellation', 'You have been unsubscribed successfully']
])

const simpleAndImpureStepFiveWithMap = response => {
  if (!response.valid) {
    return 'The provided code is invalid'
  }

  if (response.used) {
    return 'This token has already been used'
  }

  if (lookupMap.has(response.type)) {
    return lookupMap.get(response.type)
  }

  throw new Error('Invalid state while evaluating response')
}
```

简而言之使用的技术：

1、删除临时变量并尝试尽可能避免共享状态
2、反转保护if并使用早期抛出来提高代码可读性和减少复杂性/深度
3、尽可能减少else并把它剔出来，请删除其他
4、查找并处理剩余逻辑中的重复代码
5、尽可能使用查找表/查找对象
6、正确处理无效状态



