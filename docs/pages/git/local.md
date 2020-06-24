# git 不同用户怎么切换



在一台电脑上，设置了`git config --global user.name xxx` ，但是有部分是工作用的username，有部分是学习用的username，这时候怎么切换呢？



#### 法1:命令行修改

```bash
# blog 为例
cd blog
git config --list
# start
credential.helper=osxkeychain
user.name=xxx
user.email=xxx
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
remote.origin.url=git@github.com:SUH11/blog.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.master.remote=origin
branch.master.merge=refs/heads/master
# end
git config --local user.name abc
git config --local user.email xxx
# 即可
```



#### 法2:修改.git/config文件

```bash
cd blog
vim .git/config
# start
[core]
        repositoryformatversion = 0
        filemode = true
        bare = false
        logallrefupdates = true
        ignorecase = true
        precomposeunicode = true
[remote "origin"]
        url = git@github.com:SUH11/blog.git
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
# ------以下内容是新加的
[user]
        name = abc
        email = xxx@qq.com
        
        
# end
```



即可。



















\





