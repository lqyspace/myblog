var posts=["2024/01/17/algorithm/数位DP/","2024/01/14/svn/TortoiseSVN基本使用/","2024/01/16/svn/svn仓库目录详解/","2024/01/12/svn/svn入门/","2024/01/01/hexo/npm图床使用/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };