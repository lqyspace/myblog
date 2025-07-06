---
title: npm图床使用
comments: false
aside: true
date: 2024-01-01 23:44:25
tags: [npm, hexo]
categories: 前端开发
keywords: npm图床
description: "这是一篇关于介绍npm如何注册以及npm和github如何搭配使用作为图床的使用教程。"
top_img: https://cdn.jsdelivr.net/npm/lqyspace-assets/post/npm/npm%E7%9A%84%E4%BD%BF%E7%94%A8/wallhaven-jxl31y_1920x1080.png
cover: https://cdn.jsdelivr.net/npm/lqyspace-assets/post/npm/npm%E7%9A%84%E4%BD%BF%E7%94%A8/20240103204301.png
top_group_index: 1
swiper_index: 1
---

{% tip info %}npm图床的使用{%endtip%}

### 大小限制

首先要注意`github`和`jsdelivr`都有大小限制：

- `github`图床仓库大小不能超过1G。因为`github`原则上是反对仓库图床化的，当仓库超过1G后会有人工审核仓库内容，如果发现被用来做图床，轻则删库重则封号。需注意。
- `jsDelivr`加速的单文件大小为50M。这也就限制了单张图片大小上限。
- `jsDelivr+npm`有100MB包大小限制。
- `npm`饿了么节点没有大小限制。

### <center>npm图床的使用</center>

{%folding cyan open, 点击查看npm图床的使用 %}

1.首先需要注册一个npm账号，访问[npm的官方网址](https://www.npmjs.com/)。

![image-20240102173233266](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/PicBed/202401021732350.png)



2.完成邮箱验证，注册完成后进入账号管理界面：`头像`->`Account`，然后在里面按照步骤验证你的邮箱。

3.`git clone`你之前创建的图床仓库或者新建一个图床仓库然后在本地合适的位置 `clone`下来。

```bash
git clone git@github.com:[username]/[AssetsRepo].git
#或者
git clone https://github.com/[username]/[AssetsRepo].git
```

4.在 `clone` 下来的[AssetsRepo]文件夹内打开终端，输入以下指令切回原生源

```bash
npm config set registry https://registry.npmjs.org
```

**注意**：由于使用国内镜像会影响发布模块，这时需要换回npm官网的镜像。

同时这里普及几种npm使用国内加速的方法：

- 修改成腾讯云镜像

  ```bash
  npm config set registry http://mirrors.cloud.tencent.com/npm/
  ```

- 修改成淘宝镜像

  ```bash
  npm config set registry https://registry.npmmirror.com
  ```

- 修改成华为云镜像

  ```bash
  npm config set registry https://mirrors.huaweicloud.com/repository/npm/
  ```

- 通过淘宝定制的cnpm安装

  ```bash
  # 安装cnpm
  npm install -g cnpm --registry=https://registry.npmmirror.com
  # 使用cnpm
  cnpm install xxx
  ```

可以使用以下命令查看已经配置的镜像：

```bash
npm config get registry
```

5.添加本地npm用户设置

```bash
# 仅第一次使用需要添加用户，之后会提示你输入你的npm账号密码以及注册邮箱
npm adduser
# 非第一次使用直接登录即可，之后会提示你输入你的npm账号密码以及注册邮箱
npm login
```

6.运行npm初始化指令，把整个图床仓库打包，按照指示进行配置，注意需要事先确认你的包名没有和别人已经发布的包重复，可以在npm官网搜索相应的包名，搜不到就说明还没有被占用。

```bash
npm init
```

![image-20240102220535088](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/PicBed/202401022205301.png)

最后会输出一段package.json，请求确认，输入yes即可。

7.然后输入发布指令，我们就可以把包发布到npm上。

```bash
npm publish
```

8.jsdelivr+npm的图片引用和jsdelivr+github很相似，例如我在 `【AssetsRepo】`出库里存放了 `/img/avatar.jpg`

```bash
# jsDelivr+github链接
https://cdn.jsdelivr.net/gh/[GithubUserName]/[AssetsRepo]/img/avatar.jpg
# jsDelivr+npm链接
https://cdn.jsdelivr.net/npm/[NpmPackageName]/img/avatar.jpg
# 或者
https://cdn.jsdelivr.net/npm/[NpmPackageName@version]/img/avatar.jpg
```

{% note success %}可以看到npm只需要提供报名，也可以访问图名，这也是一开始为什么要求报名不重复的原因。{% endnote %}



jsDelivr+Npm依然有100MB的包大小限制，但是NPM有丰富的国内节点。可以挑选一个使用。个人推荐知乎。没有大小限制，而且也很稳定。

```bash
#【jsd出品，网宿国内节点】
https://cdn.jsdelivr.net/npm/:package@:version/:file
#【unpkg 自建】
https://cdn.cbd.int/:package@:version/:file
```

当然你也可以使用 [unpkg](https://unpkg.com/) 自建。（UNPKG是一个内容源自npm的全球快速CDN。它部署在cloudflare上，在大陆地区访问到的是香港节点，所以速度也很不错）

```bash
https://unpkg.com/:package@:version/:file
```

{% endfolding %}

### <center>npm搭配github action使用</center>

{% folding green open, npm搭配github action 使用 %}

1、如果每次都要在本地进行 `npm publish` 的话，npm的提交是整个包一起上传的，不存在增量更新，耗时不说，而且还往往需要架梯子才能正常上传。所以我们可以把它交给`github action`来完成。

2、在 [npm官网](https://www.npmjs.com/)->头像->Access Tokens->Generate New Tokens，勾选Classic Token选项。由于 `Tokens`只会显示一次，因此你需要提前复制保存下来，之后如果忘记了就只能重新配置了。

![image-20240103150139438](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/PicBed/202401031501523.png)

下面命名的时候尽量都有意义，比如这个令牌用于github action，因此命名为blog-npm-git，下面勾选Automation。

![image-20240103150926596](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/PicBed/202401031509686.png)

3、在github的`[AssetsRepo]`仓库设置里添加一个名为 `NPM_TOEKN`的`secrets`，把获取的`NPM`的`Access Tokens`输入进去。

![image-20240103151357314](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/PicBed/202401031513449.png)

4、在本地的 `[AssetsRepo]` 文件夹下新建 `[AssetsRepo]/.github/workflows/autopublish.yml`

```yaml
name: Node.js Package
# 监测图床分支，2020年10月后github新建仓库默认分支改为main，记得更改
on:
  push:
    branches:
      - master

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: "16.x"
          registry-url: https://registry.npmjs.org/
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

5、在本地的`[AssetsRepo]`文件夹下打开终端，运行以下指令，上传新增内容至github，即可触发部署。

```bash
# 将更改提交
git add .
git commit -m "npm publish"
# 更新package版本号
npm version patch
# 推送至github触发action
git push
```

{% note warning flat %}

此处的四行指令顺序严格。

每次更新npm图床都需要先改`[AssetsRepo]\package.json`里的`version`，也就是版本号。

而 `npm version patch` 即为更新`package.json`里的版本号的指令，效果是末尾版本号+1，例如`0.0.1=>0.0.2`、`1.1.3=>1.1.4`。免去了打开`package.json`在修改版本号的麻烦。（大版本号还是需要自己手动更改的）

更新npm图床务必要记得更新`package.json`里的版本号。

{% endnote %}

{% endfolding %}
