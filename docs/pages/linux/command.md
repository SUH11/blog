## 一些常见的命令



进程相关

```bash
# 查看端口占用情况
lsof -i:8080
# 杀死某个进程
kill -9 pid
# 查看某个进程
ps -ef | grep nginx
```



pm2

```bash
# 列出所有进程
pm2 list
pm2 ls
# 查看进程资源消耗
pm2 monit
```

