### nginx笔记



命令行参数

```bash
# 不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。
nginx -t 
nginx -v
nginx -V
```



控制信号

| TERM, INT | 快速关闭                                                 |
| --------- | -------------------------------------------------------- |
| QUIT      | 从容关闭                                                 |
| HUP       | 重载配置 用新的配置开始新的工作进程 从容关闭旧的工作进程 |
| USR1      | 重新打开日志文件                                         |
| USR2      | 平滑升级可执行程序。                                     |
| WINCH     | 从容关闭工作进程                                         |

```bash
# 启动
sudo /usr/local/nginx/nginx
# 查看nginx进程
ps -ef | grep nginx
# 结束进程
kill -QUIT nginx进程id
kill -TERM nginx进程id
kill -9 nginx进程id # 强制停止

```































