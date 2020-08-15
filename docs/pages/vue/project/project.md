# Vue项目实战





### 1. 文件上次 - 详解





### 2. 项目搭建



你可以使用骨架类型，像下面这样:

```
$ npm init egg --type=simple
```



库： husky

```javascript
npm install --save-dev husky
```



commitizen

```
commitizen init cz-conventional-changelog --save-dev --save-exact
git add .
git cz
```



validate-commit-msg

文档：https://www.npmjs.com/package/validate-commit-msg



svg-captcha

生成验证码

```
npm install --save svg-captcha
```



使用代理

```
npm i @nuxtjs/proxy -D
```



MD5加密

密码明文加密

```bash
npm intall md5 --save
```



server:

jsonwebtoken	md5

egg-router-group

egg-mongoose

egg-validate

```bash
npm install jsonwebtoken md5 --save
npm install egg-router-group egg-mongoose egg-validate
```



发送邮件接口

nodemailer

```bash
npm install nodemailer --save
```

support services: http://nodemailer.com/smtp/well-known/

发送邮件需要注意的地方：

nodemailer文档：https://nodemailer.com/smtp/oauth2/

163参考：https://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac22dc0e9af8168582a

注意：pass是授权码，不是密码



文件上传

```
npm install --save fs-extra
```



严格判断文件格式：根据二进制判断

> gif：res === '47 49 46 38 39 61' || res === '47 49 46 38 37 61'
>
> png：res === '89 50 4E 47 0D 0A'
>
> jpg：(start === 'FF D8') && (tail === 'FF D9')





断点续传

计算md5

```
npm install spark-md5 --save // 增量计算
```

web-worker计算





















