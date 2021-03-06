#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m '增加http内容'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:SUH11/SUH11.github.io.git master

cd -