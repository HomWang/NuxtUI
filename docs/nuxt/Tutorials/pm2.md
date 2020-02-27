# pm2 零停机部署

## 介绍

该教程感谢[Curtis Belt](https://github.com/CurtisBelt)，这是一个非常容易理解的[Demo](https://github.com/CurtisBelt/pm2-nuxt-blue-green-deploy)

Ubuntu 测试成功

Linux  测试成功

## 使用

### 安装

- Nuxt (版本号: 2.3.4)
- Bash (版本号: 4.4.23)
- Yarn (版本号: 1.12.3)
- PM2  (版本号: 3.2.2)

pm2 全局安装:

```js
yarn global add pm2
OR
npm install pm2 -g
```

### 项目结构

```js
-| src/
----| current/ #最终的项目文件目录
----| deployments/
------| blue/
------| current/
-| install.sh
-| start.sh
-| deploy.sh
-| stop.sh
```

### 脚本文件

install.sh

```shell
# blue（项目）和green（项目）的依赖以及打包
cd src/deployments/blue
yarn install
yarn build

cd ../green
yarn install
yarn build
```

start.sh

```shell
# 创建/"current"目录并启动PM2
# 安装npm包和build nuxt ＃初始化blue(项目)部署，然后启动PM2
rm -rf src/current || true
ln -s $PWD/src/deployments/blue $PWD/src/current
pm2 start src/current/ecosystem.config.json
```

deploy.sh

```shell
#部署下一个颜色（项目）并重新加载PM2 
CURRENT_COLOR=$( basename $(readlink src/current) )
NEXT_COLOR=$( [ "$CURRENT_COLOR" == 'blue' ] && echo 'green' || echo 'blue' )

echo "Current deployment is $CURRENT_COLOR"
echo "Deploying $NEXT_COLOR"

# ------------------------------------------------------------------
# 对于真正的部署，此时您将更新项目
# "PWD/src/deployments/$NEXT_COLOR"中的文件，可能通过git pull。
# ------------------------------------------------------------------

# Prepare the next symlink as src/deployments/preparing-current
ln -s $PWD/src/deployments/$NEXT_COLOR $PWD/src/deployments/preparing-current

# Then atomically move it on top of (replacing) src/current
mv -Tf $PWD/src/deployments/preparing-current $PWD/src/current

# Change the working directory to the PARENT directory of your "current" symlink.
cd src/
PM2_CONCURRENT_ACTIONS=1 pm2 reload current/ecosystem.config.json

pm2 status
```

stop.sh

```shell
#停止PM2并删除"current"目录
pm2 delete blue-green-deploy
rm -R src/current
```

### 执行说明

```shell
bash install.sh  ＃blue（项目）和green（项目）的依赖以及打包
bash start.sh    ＃安装npm包和build nuxt ＃初始化blue(项目)部署，然后启动PM2 
bash deploy.sh   ＃部署下一个颜色（项目）并重新加载PM2  
bash stop.sh     ＃停止PM2并删除"current"目录
```

在运行`start.sh`，您应该看到blue(项目)部署：

![blue](../../.vuepress/public/img/blue.png)

然后在运行`deploy.sh`，您将看到green(项目)部署：

![green](../../.vuepress/public/img/green.png)

## 链接

[github](https://github.com/CurtisBelt/pm2-nuxt-blue-green-deploy)
