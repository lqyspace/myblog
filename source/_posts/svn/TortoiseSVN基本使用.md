---
title: TortoiseSVN基本使用
comments: false
aside: true
date: 2024-01-14 23:24:59
tags: svn
categories: 代码仓库
keywords: TortoiseSVN
description: 介绍了TortoiseSVN的基本使用技巧
top_img: https://cdn.jsdelivr.net/npm/lqyspace-assets/post/svn/cropped-1920-1080-742320.png
cover: https://cdn.jsdelivr.net/npm/lqyspace-assets/post/svn/20240114233756.png
top_group_index: 3
swiper_index: 3
---

{% tip info %} TortoiseSVN基本使用技巧 {%  endtip %}

# 安装SVN客户端

`TortoiseSVN`是`Subversion`版本控制系统的一个免费开源的客户端，可以超越时间的管理文件和目录。

**下载地址**：

{%  link TortoiseSVN客户端, TortoiseSVN下载官方网站, https://tortoisesvn.net/downloads.html %}

**安装教程**：

{%  link 菜鸟SVN安装教程, 这是TortoiseSVN的安装教程，你值得拥有, https://www.runoob.com/svn/tortoisesvn-intro.html %}

{% note warning no-icon %}安装了以后一定要重启计算机，否则`SVN`的图标无法显示。{% endnote %}

# 使用TortoiseSVN连接SVN服务器

1、首先在**你的项目目录**（这个目录你可以自定义，你需要把代码放在哪儿你就建在哪儿）鼠标右键--->TortoiseSVN--->版本库浏览器--->输入浏览器`SVN`服务器地址

![image-20231105234425604](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311052344501.png)

{%  note primary flat %}也就是checkout检出{%  endnote %}

`svn://服务器地址`--->imct项目代码仓库，然后在`SVN`服务器地址上鼠标右键，单击**检出(checkout)**。

![image-20231105234538891](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311052345966.png)

显示隐层文件，既可以看到如下：

![image-20231105234628454](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311052346478.png)

说明客户端与服务端建立了联系，检出成功。

# SVN详解

## 回顾SVN三大指令

### 检出操作（checkout）

- 连接`svn`到服务器端
- 更新服务器端数据到本地
- `checkout`只在第一次连接时操作一次，以后如果进行更新操作请使用`update`（更新操作）

### 提交操作（commit）

- 提交本地数据到服务器端

- 在本地工作区进行了新建或修改操作，只需要在本地工作区的空白区域右键，然后单击`SVN提交`

  ![image-20231105235606541](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311052356598.png)

  ![image-20231105235705781](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311052357845.png)

  如显示如下的界面，说明提交成功！

  ![image-20231105235836128](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311052358184.png)

  以上的过程一般是由项目经理完成的，那么如果公司来了一个程序员李四，那么他需要哪些操作呢？

  ![image-20231111183739661](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111837735.png)

  在上面的lisi（这个文件夹是你的工作目录，可以自定义）的文件夹区域内右键--->TortoiseSVN--->版本库浏览器--->输入浏览器SVN服务器地址。

  然后在下面的页面中右键检出，然后单击确定即可。

  ![image-20231111183944154](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111839281.png)

  ![image-20231111183957647](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111839752.png)

  ![image-20231111184045148](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111840257.png)

  接下来你就可以看到你的文件夹下有来自仓库的代码文件。

  **小结：**

  - 检出操作，效果如下：

    ![image-20231111184152657](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111841733.png)

  - 创建或者修改目标文件，比如，这里我新建了一个admin.php文件并提交。

    ![image-20231111184329159](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111843221.png)

  - 提交操作完成

    ![image-20231111184413620](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111844677.png)

    {% label 谨记 pink %}：以上的指令通常是在模块开发完成后上传。

### 更新操作（update）

在我们进行代码开发的同时，有可能仓库中已有其他的开发者提交的代码，此时我们通常进行更新操作（update）。

![image-20231111184640536](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111846618.png)

{%  note info flat %}

**建议**

在**进行开发工作前**及**模块提交前**进行代码更新操作。

{% endnote %}



## SVN图标集介绍

### 图标集

![image-20231111185042448](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111850515.png)

1）常规图标：![image-20231111185239743](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111852784.png)

含义：当客户端文件与服务器端文件完全同步时，系统显示以上图标。

2）冲突图标：![image-20231111185343119](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111853173.png)

含义：当客户端提交的文件与服务器端数据有冲突，系统会显示以上图标。

3）删除图标：![image-20231111185425340](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111854380.png)

含义：当服务器端数据已删除，那么客户端该文件将显示该图标

4）增加图标：![image-20231111185612259](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111856339.png)

含义：当我们编写的文件已添加到提交队列，那么系统将自动显示以上图标

5）无版本控制图标：![image-20231111185708777](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111857816.png)

含义：当我们编写的文件没有提交到上传队列时，系统将自动提示以上图标

6）修改图标：![image-20231111185806707](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111858745.png)

含义：当客户端文件有修改但未提交，此时将自动显示该图标

7）只读图标：![image-20231111185918503](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111859542.png)

含义：当客户端文件以只读形式存在时，将自动显示该图标

8）锁定图标：![image-20231111190007611](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111900341.png)

含义：当服务端数据已锁定，那么客户端文件将自动显示锁定图标

9）忽略图标：![image-20231111190110344](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111901381.png)

含义：客户端文件已忽略，不需要进行提交上传，那么将显示以上图标



### 忽略功能

有些文件不希望上传到svn服务器，应该将该文件或该类型的文件添加至忽略列表。

1）忽略某个指定的文件

![image-20231111190540962](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111905060.png)

2）忽略某个类型的文件

![image-20231111190725850](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111907959.png)



## SVN版本回退

### 版本回退

有些时候，软件的运行可能使开发者或者是用着不满意，这时我们需要把当前版本回退到以前的某一个版本。

![image-20231111191416547](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111914651.png)

在传统的存储机制里，每更新一个版本，代码的存储是**全量存储**，即代码存储量就会越来越大。

而`SVN`的存储机制采用的是**增量存储** ，即每一次版本更新保存的都是改动过的部分，仓储存储的是整个开发周期中代码的总量。

### 版本回退功能

在项目空白处鼠标右键，采用如下图所示操作：

![image-20231111192050708](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111920246.png)

根据版本日志进行回退：

![image-20231111192233476](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111922547.png)

根据日志信息选择要回退的状态，效果如下：

![image-20231111192352993](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111923112.png)



## SVN版本冲突

### 版本冲突

在实际的开发中，如果两个人同时修改了某个文件就可能会产生版本冲突。

### 模拟版本冲突

![image-20231111195550125](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111955225.png)

![image-20231111195844201](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311111958284.png)

### 解决之道

1）合理分配项目开发时间

2）合理分配项目开发模块

3）通过SVN解决版本冲突问题

1. 在提交本地修改之前，首先更新服务器端数据到本地

   ![image-20231111200120950](https://fastly.jsdelivr.net/gh/lqyspace/mypic@master/img1/202401151620590.png)

   ![image-20231111201118374](https://raw.githubusercontent.com/lqyspace/mypic/master/PicBed/202311112011420.png)

2. 如果发生冲突，删除除index.php以外的其他三个文件

3. 修改整合index.php冲突文件

   1. 右键TortoiseSVN——>解决冲突
   2. 重新SVN提交

{% label 注意 pink %}：这里对解决**版本冲突说明**的并不是很详细，如果发生版本冲突可参考下面的解决方法：

[SVN冲突的几种情况以及相应的解决方法](https://blog.csdn.net/Ha1f_Awake/article/details/125186251)

或者自行百度。

## 学习文档

[TortoiseMerge-1.14.5-zh_CN](https://cdn.jsdelivr.net/npm/lqyspace-assets/doc/svn/TortoiseMerge-1.14.5-zh_CN.pdf)

[TortoiseSVN-1.14.5-zh_CN使用手册](https://cdn.jsdelivr.net/npm/lqyspace-assets/doc/svn/TortoiseSVN-1.14.5-zh_CN.pdf)

[svn-book英文版](https://cdn.jsdelivr.net/npm/lqyspace-assets/doc/svn/svn-book_en.pdf)

[svn-book中文版](https://cdn.jsdelivr.net/npm/lqyspace-assets/doc/svn/svn-book_zh.pdf)
