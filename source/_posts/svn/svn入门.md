---
title: svn入门
comments: false
aside: true
date: 2024-01-12 19:31:15
tags: svn
categories: 代码仓库
keywords: svn
description: 介绍了如何在服务器上使用命令创建仓库相关的教程
top_img: https://cdn.jsdelivr.net/npm/lqyspace-assets/post/svn/cropped-1920-1080-1330235.png
cover: https://cdn.jsdelivr.net/npm/lqyspace-assets/post/svn/20240112194936.png
top_group_index: 2
swiper_index: 2
---

{% tip info %} SVN安装 {%  endtip %}

# SVN安装

## 在windows下安装SVN

- 准备`svn`的安装文件

  下载地址：[https://sourceforge.net/projects/win32svn/](https://sourceforge.net/projects/win32svn/)

  ![image-20240112201304625](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401122013281.png)

  下载完成后，默认安装就行，或者安装在自己定义的盘符上。

- 查看目录结构

  ![image-20240112201726340](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401122017378.png)

- 把`svn`安装目录里的`bin`目录添加到`path`路径中，在命令行窗口中输入 `svnserve --help`，查看是否安装正常。

  ![image-20240112202059575](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401122021270.png)

## 在Ubuntu下安装SVN

接下来进入正题，我们的目的是在服务器上部署`SVN`服务器，接下来选择`Ubuntu`来安装`snv`。

首先查看系统中是否安装了`svn`，如果没有安装`svn`，命令将报告`svn`命令找不到的错误。

```bash
root@xiaoxiao:~# svn --version
The program 'svn' is currently not installed. You can install it by typing:
apt-get install subversion
```

我们可以使用`apt-get`命令进行安装：

```bash
sudo apt update -y
sudo apt install subversion
```

安装完成之后，执行`svn --version`命令：

```bash
root@xiaoxiao:~# svn --version
svn, version 1.8.13 (r1667537)
   compiled Sep  8 2015, 14:59:01 on x86_64-pc-linux-gnu
```



# SVN的基本操作

接下来的操作，全都是在`Ubuntu`系统中以命令行的方式进行。

## 创建版本库

```bash
# svnadmin create 文件夹目录
svnadmin create ~/svn/webapp
```

使用以上的方式创建版本库以后，你可以在你的文件夹目录下看到下面的配置文件：

![image-20231105215612255](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401122039469.png)

## 启动版本库

```bash
# svnserve -d -r 目录 --listen-port 端口号
# -d：守护模式，让这个进程可以在后台运行
# -r：版本库的根目录或者项目的根目录
# --listen-port：指定svn监听端口号，不加此参数，svn默认监听3690
svnserve -d -r ~/svn/webapp
```

由于`-r`配置方式的不一样，svn的启动有两种访问方式。

我们可以使用`svnserve -h` 来查看参数列表。

![image-20240112205324050](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401122053109.png)

接下来我们来查看一下`-r`的两种启动方式：

**方式一：**`-r`直接指定到版本库（简称为单库svnserve方式）

```bash
svnserve -d -r ~/svn/webapp
```

在这种情况下，一个`svnserve`只能为一个版本库工作。

那么此时`authz`配置文件中对版本库权限的配置可以这样写：

```bash
[groups]
admin=user1
dev=user2
[/]
@admin=rw
user2=r
```

`/`表示版本库的根目录，当然我们可以对版本库下的某一个文件或者文件夹进行单独的权限控制，比如：

```bash
[groups]
admin=user1
dev=user2
[/]
@admin=rw
user2=r
[/log]
@dev=rw
```

`/log`表示版本库的根目录下`log`文件夹，而`dev`组内的用户对这个文件夹具有`rw`的权限。

**方式二：**指定版本库的上级目录（简称为多库svnserve方式）

```bash
svnserve -d -r ~/svn
```

在这种情况下，一个`svnserve`可以为`svn`文件夹下的多个版本库工作。

authz配置文件中对版本库权限的配置可以这样写：

```bash
[groups]
admin=user1
dev=user2
[runoob:/]
@admin=rw
user2=r

[runoob01:/]
@admin=rw
user2=r
```

如果此时你还用`[/]`，则表示所有库的根目录，同理，`[/src]`表示所有库的根目录下的src目录。

所示访问的时候可使用类似这样的`URL：svn://127.0.0.1/webapp`，即可访问这个版本库。

## 删除版本库

删除版本库时要具有删除仓库的权限，其次要停止对仓库的所有活动（如提交、更新等）。

删除版本有两种方式：

- 使用`SVN`命令行删除仓库，例如：`svn delete svn://your-server/repos/your-repo`
- 如果仓库位于服务器上，请从服务器上删除仓库目录



# 配置多仓库与权限控制

## 配置多仓库

在实际的开发过程中，我们可能需要对多个仓库或者多个项目进行监管，那么我们如何进行监管呢？

通过`svnserve`进行仓库管理，但是监管指令只能进行单个文件夹，而不能同时监管多个仓库。

因此，我们可以通过监管版本库的上一级目录的方式来监管多个仓库，具体方式如下：

```bash
svnserve -d -r ~/svn
```

## 权限控制

首先需要开启权限功能。在每一个仓库中都有一个conf文件夹，里面有三个文件是一定需要配置的：

- authz：授权文件，告诉哪些用户具有哪些权限
- passwd：认证文件，标识当前`svn`系统中某个仓库具有哪些用户以及相应的密码
- svnserve.conf：服务配置文件，`svn`服务器的相关配置

对`authz`和`passwd`的更改可以立马生效了，但是对`svnserve.conf`配置需要重启svn服务才可以生效。

### 1、svnserve.conf

这个文件是服务进程的配置文件，我们逐行进行解释：

```bash
anon-access = none # 没有经过授权的用户具有的权限
auth-access = write # 经过授权的用户具有的权限
```

授权的权限有三种形式：`none`、`read`、`write`，其中`none`表示不具备任何权限，`read`表示只具有可读的权限，`write`表示具有可读可写的权限。

接下来就是告诉`svn`服务有哪些认证用户，即`passwd`，这个文件里保存着用户名和密码。

```bash
password-db = passwd
```

然后就是`authz`授权文件，这个文件告诉`svn`服务哪些用户具有哪些权限：

```bash
authz-db = authz
```

上述中的`passwd`和`authz`两个文件可以作为多个代码库共享使用，我们只要将他们放在公共目录下，比如说放在`~/svn`目录下，然后 每个代码库中的`svnserve.conf`文件中使用如下的语句：

```bash
passwd-db = ../../passwd
authz-db = ../../authz
```

这样就可以让多个代码库共享一个用户密码，目录控制配置，这在有效情况下是非常有用的。

接下来就是`realm`，它是指版本库的认证域，即在登录时提示的认证域名称。若两个版本库的认证域相同，建议使用相同的用户口令数据文件。

{%  note info flat %}

**说明**

版本库认证域

在使用svn客户端访问`svnserve`服务器时，若需要用户登录，则提示如下信息：

（如果此时realm的配置是：Hello, it's the IMCT-vue-Repository.）

![image-20240114163335040](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401141633106.png)

之后输入用户名和密码即可。

{%  endnote %}

下面给一个{% label 示例 pink %}：

```bash
[general]
anon-access = none
auth-access = write
password-db = ../../passwd
authz-db = ../../authz
realm = imct-repository
```

上述配置文件的设定是非授权用户不具备访问权限；授权用户可对版本库进行读写；用户口令的文件的相对位置在上两层目录文件夹下；权限配置文件的相对位置在上两层目录文件夹下；版本库的认证域为`imct-repository`。

### 2、passwd

用户口令文件是由`svnserve.conf`的配置项`password-db`指定，默认值为`conf`目录中的`passwd`，该文件仅有一个`[users]`配置段组成。

配置行格式如下：

```bash
<用户名> = <口令>
```

{%  label 注意： blue %}配置行中的口令是未经过任何处理的明文。

<br>

{% label 示例：pink %}

```bash
[users]
admin = admin
adminsuper = root
```

该配置文件中共配置了两个用户，分别是“admin”和“adminsuper”。其中“admin”的用户口令是“admin”；“adminsuper”用户口令是“root”。

### 3、authz

权限配置文件是由`svnserve.conf`的配置项`authz-db`指定，默认值为`conf`目录中的`authz`文件。该配置文件由一个`[groups]`和若干个版本库路径组成。

`[groups]`配置段中配置行格式如下：

```bash
<用户组> = <用户列表>
```

用户列表由若干个用户组或用户名构成，用户组和用户名之间用逗号`，`隔开，引用用户组的时候要在前面使用`@`。

`版本库路径`权限段的段名格式如下：

```bash
[<版本库名>:<路径>]
```

如版本库`imct-vue`路径下的`/log`，那么路径权限段的写法就是：`[imct-vue:/log]`。

可省略段名中的版本库名，若省略版本库名，则该版本库路径权限对所有版本库中相同路径的访问控制都有效。

如：段名为：`[/temp]`的版本库路径权限设置了所有引用该权限配置文件的版本库中目录为`/temp`的访问权限。

`版本库路径`权限段中配置行格式有如下三种格式：

```bash
<用户名> = <权限>
<用户组> = <权限>
* = <权限>
```

其中`*`表示其余任何用户；权限的范围为空，`r`和`rw`，分别表示对该版本库无任何权限，具有读权限，具有读写权限。

{%  label 注意： blue %}每行位置只能配置单个用户或单个用户组。

<br>

{% label 示例： pink %}

```bash
[groups]
admin_group = admin,adminsuper

[admintools:/]
@admin_group = rw
* =

[fxadmin:/home/adminsuper]
adminsuper = rw
* = r
```

 在上述配置文件中，定义了一个用户组"admin_group"，该用户组包含用户"admin"和"adminsuper"。然后定义了2个版本库路径权限段。其中，版本库"admintools"只有用户组"admin_group"可读写，其他用户无任何权限；版本库"fxadmin"中路径"/home/admin_group"只有用户"adminsuper"有读写权限，其他用户只有可读权限。

## 权限继承

我们知道`authz`的的配置项可以分为两种，分别是`[groups]`和`版本库路径`这两个配置段。

### authz用户分组

下面的用户分组仅供参考：

```bash
[groups]
# 任何想要查看所有文档的非本部门认识
imct_eve = everybody

# 教师分组
imct_tea = hu_tea, gao_tea, guo_tea

# 博士分组
imct_doc = m_doc, g_doc, z_doc

# 项目负责人
imct_pri = lqy, lgw, ljh, xxy

# 一般工作者
imct_admin = admin_coder, linda

# 撰写文档
imct_docs = linda
```

我们注意到，`linda`这个账号同时存在`“imct_admin”`和`“imct_docs”`这两个分组里，这就意味着`linda`将比`admin_coder`拥有更多的权限，因为`subversion`是允许我们这样的设置的。



### authz版本库路径

接着，我们对项目根目录做了限制，该目录只允许IMCT事业部的老师才能修改，其他的人只能眼巴巴的看着：

```bash
[IMCT:/]
@imct_tea = rw
* = r
```

- `[IMCT:/]`表示这个目录结构的相对根结点，或者说是`IMCT`项目的根目录。其中的`IMCT`字样，其实就是代码库的名称，即通过 `svnadmin create`命令创建出来的`IMCT`库。

- 这里的`@`表示一个组名，不是用户名。不过也可以改写成下面的格式，意义也一样：

  ```bash
  [IMCT:/]
  hu_tea = rw
  gao_tea = rw
  guo_tea = rw
  * = r
  ```

- `*`表示除了上面提到的那些人之外的其余所有人

- `* = r`则表示那些人只能读，不能写

接下来，如果我们想给`IMCT`事业部的一般工作人员开放日志目录的读写权限：

```bash
[IMCT:/diary]
@imct_admin = rw
@imct_pri = rw
* = 
```

这个子目录的设置就很有特色，因为从需求分析中我们可以知道，这个子目录的权限要比其父目录小，它不允许除指定之外的其他人访问。在这段设置中，我们需要注意以下几点：

- 由于子目录会继承父目录的权限，也就是说，`IMCT`事业部的老师也是具有对该目录的`rw`权限的
- 最后一行的`*=`不能被删除，由于在父目录里除了指定用户具有`rw`权限，其他的用户只能可读，由于子目录可以继承父目录的权限，因此除了子目录里面指定的用户具有`rw`外，其他的用户应该不具备访问权限，因此`*=`不能删除，否则其他的用户对这个子目录也具有可读权限。
- 这里之所以加上`imct_pri`这个分组，就是因为存在上述的解释。如果我们没有明确的给`imct_pri`指明可读写的权限，那么`imct_pri`这个分组的用户就只具有可读的权限。
- 如果众位看官中间，有谁玩过防火墙，可能会感觉上面的配置和防火墙很相似。不过这里有一点与防火墙不一样，那就是各个配置行之间并不存在`先后顺序`一说。也就是说，如果我们将本段配置的`*=`这一行挪到最前面，完全不影响配置的最终效果。

接下来，我们看另一个配置：

```bash
[IMCT:/ref]
@imct_docs = rw
* = r
```

这里主要的看点，就是`imct_docs`组里面包含了一个`linda`账号，她同时也在`admin_coder`这个分组里，也就是说，`linda`将具备对`/ref`和`/diary`的两个目录读写权限。



## authz配置的其他注意事项

### 父目录的`r`权限，对子目录`w`权限的影响

把这个问题单独提出来是因为在1.3.1及其以前的版本里面，有一个`bug`，即某个账号为了对某个子目录具备写权限，则必须在其父目录里面具备读权限。

因此现在使用1.3.2及其更高的版本，就方便了那些想在一个代码库里面存放多个相互独立的项目的管理员来分配权限了。

比如给老师们分配整个项目的管理权限，而`SVN`事业部只是其中一个部门，则我们可以这样做：

```bash
[diary:/]
@imct_tea = rw

[diary:/SVN]
@imct_admin = rw
@imct_pri = rw
```

这样对于所以`SVN`事业部的人员来说，就可以将`svn://192.168.0.1/diary/SVN`这个URL当做根目录进行日常的维护，而完全不用管它是不是子目录，并且当有少数人具有好奇心的人想试着`checkout`一个`svn://192.168.0.1/diary`的时候，马上就会得到一个警告“Access denied”。

### 默认权限

如果我们不对某个目录设置任何权限，会怎么样呢？

```bash
[diary:/]
@imct_doc = rw

# 改成
[diary:/]
```

这样就相当于什么都没有设置。在`svn`的版本号1.3.2及其以上，此时是禁止任何访问的。也就是说，如果你想要让某个人访问某个目录，你一定要显式地指明这一点。这个策略看起来是与防火墙的策略一致的。

### 只读`r`权限的副作用

如果我们对某个目录只设置的`* = r`权限，那么任何都只能对此目录可读，任何人都不允许改动，包括**删除**，**改名**和**新增**。

除非手动更改这个权限。

# 总结

- 在本文中，我们介绍了`svnserve`服务的配置方法，其中对`passwd`和`authz`的更改可以立马生效，并不用重新启动，但是对`svnserve.conf`的更改需要重新启动才可以生效。
- 需要强调的是本文介绍的配置文件只对`svnserve`服务有效，即客户端通过前缀为`svn://`或`svn+ssh://`的URL访问版本库有效，而通过`http://`、`https://`或`file://`的URL无效。

参考资料：

[SVN使用教程](https://www.rocschool.com/tutorial/rocschool-show-116.html)

[Subversion与版本控制（官方）](https://svnbook.red-bean.com/)

[Subversion版本控制（中文1.8）](https://svnbook.red-bean.com/zh/1.8/)

[https://www.jianshu.com/p/0fabc3645e50](https://www.jianshu.com/p/0fabc3645e50)

[https://blog.csdn.net/jyl_sh/article/details/109450077](https://blog.csdn.net/jyl_sh/article/details/109450077)
