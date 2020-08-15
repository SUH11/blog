# git常见命令





1. 和仓库有关

   ```bash
   git remote -v
   git remote set-url origin git@xxx
   ```

   

2. 查看log

   ```bash
   git log --graph
   git log --graph --pretty=oneline --abbrev-commit
   
   git reflog # 用来记录你的每一次命令
   ```



3. reset

   ```bash
   git reset --hard commitid
   git reset --hard HEAD
   git reset --hard HEAD^ # 上个
   git reset --hard HEAD^^ # 上上个
   
   git reset HEAD readme.txt # 把add的了文件，重新变成 no add
   ```

